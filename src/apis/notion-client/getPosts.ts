import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { normalizeRecordMap } from "src/libs/utils/notion/normalizeRecordMap"
import { TPosts } from "src/types"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

// TODO: react query를 사용해서 처음 불러온 뒤로는 해당데이터만 사용하도록 수정
export const getPosts = async () => {
  let id = CONFIG.notionConfig.pageId as string

  if (!id) {
    throw new Error(
      "Missing NOTION_PAGE_ID. Set the Notion page id in Vercel Environment Variables."
    )
  }

  const api = new NotionAPI()

  const response = normalizeRecordMap(await api.getPage(id))
  id = idToUuid(id)
  const collectionId = Object.keys(response.collection ?? {})[0]
  const collectionValue = response.collection?.[collectionId]?.value as any
  const collection = collectionValue?.value ?? collectionValue
  let block = response.block
  const schema = collection?.schema
  const rootBlock = block[id]?.value

  const blockValue = (rootBlock as any)?.value ?? rootBlock
  const rawMetadata = blockValue

  // Check Type
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    return []
  } else {
    if (!schema) {
      throw new Error(
        "Notion collection schema was not found. Check that NOTION_PAGE_ID points to a shared Notion database page."
      )
    }

    // Construct Data
    let pageIds = getAllPageIds(response)

    if (!pageIds.length && collectionId) {
      const collectionViewId =
        blockValue?.view_ids?.[0] ?? Object.keys(response.collection_view ?? {})[0]
      const collectionViewValue = response.collection_view?.[collectionViewId]
        ?.value as any
      const collectionView = collectionViewValue?.value ?? collectionViewValue

      if (collectionViewId && collectionView) {
        const collectionData: any = await api.getCollectionData(
          collectionId,
          collectionViewId,
          collectionView
        )
        const collectionRecordMap = normalizeRecordMap(
          collectionData.recordMap ?? {}
        )

        block = {
          ...block,
          ...(collectionRecordMap.block ?? {}),
        }
        pageIds =
          collectionData.result?.reducerResults?.collection_group_results
            ?.blockIds ?? []
      }
    }

    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i]
      const properties = (await getPageProperties(id, block, schema)) || null
      // Add fullwidth, createdtime to properties
      const pageBlockValue = (block[id].value as any)?.value ?? block[id].value
      properties.createdTime = new Date(
        pageBlockValue?.created_time
      ).toString()
      properties.fullWidth =
        (pageBlockValue?.format as any)?.page_full_width ?? false

      data.push(properties)
    }

    // Sort by date
    data.sort((a: any, b: any) => {
      const dateA: any = new Date(a?.date?.start_date || a.createdTime)
      const dateB: any = new Date(b?.date?.start_date || b.createdTime)
      return dateB - dateA
    })

    const posts = data as TPosts
    return posts
  }
}
