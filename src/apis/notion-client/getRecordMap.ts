import { NotionAPI } from "notion-client"
import { normalizeRecordMap } from "src/libs/utils/notion/normalizeRecordMap"

const PAGE_CHUNK_LIMIT = 100
const MAX_EXTRA_CHUNKS = 1

const unique = (values: string[] = []) => {
  return [...new Set(values)]
}

const getEntryValue = (entry: any) => {
  return entry?.value?.value ?? entry?.value
}

const mergeRecordEntry = (baseEntry: any, extraEntry: any) => {
  if (!baseEntry) return extraEntry
  if (!extraEntry) return baseEntry

  const baseValue = getEntryValue(baseEntry)
  const extraValue = getEntryValue(extraEntry)

  if (!baseValue || !extraValue) {
    return extraEntry ?? baseEntry
  }

  const mergedValue = {
    ...baseValue,
    ...extraValue,
  }

  if (baseValue.content || extraValue.content) {
    mergedValue.content = unique([
      ...(baseValue.content ?? []),
      ...(extraValue.content ?? []),
    ])
  }

  if (baseEntry?.value?.value || extraEntry?.value?.value) {
    return {
      ...baseEntry,
      ...extraEntry,
      value: {
        ...(baseEntry.value ?? {}),
        ...(extraEntry.value ?? {}),
        value: mergedValue,
      },
    }
  }

  return {
    ...baseEntry,
    ...extraEntry,
    value: mergedValue,
  }
}

const mergeRecordMapTable = (baseTable: any = {}, extraTable: any = {}) => {
  const merged = { ...baseTable }

  for (const [id, extraEntry] of Object.entries(extraTable)) {
    merged[id] = mergeRecordEntry(merged[id], extraEntry)
  }

  return merged
}

const mergePlainTable = (baseTable: any = {}, extraTable: any = {}) => {
  return {
    ...baseTable,
    ...extraTable,
  }
}

const mergeRecordMaps = (baseRecordMap: any, extraRecordMap: any) => {
  return {
    ...baseRecordMap,
    ...extraRecordMap,
    block: mergeRecordMapTable(baseRecordMap.block, extraRecordMap.block),
    collection: mergeRecordMapTable(
      baseRecordMap.collection,
      extraRecordMap.collection
    ),
    collection_view: mergeRecordMapTable(
      baseRecordMap.collection_view,
      extraRecordMap.collection_view
    ),
    notion_user: mergeRecordMapTable(
      baseRecordMap.notion_user,
      extraRecordMap.notion_user
    ),
    collection_query: mergePlainTable(
      baseRecordMap.collection_query,
      extraRecordMap.collection_query
    ),
    signed_urls: mergePlainTable(
      baseRecordMap.signed_urls,
      extraRecordMap.signed_urls
    ),
    preview_images: mergePlainTable(
      baseRecordMap.preview_images,
      extraRecordMap.preview_images
    ),
  }
}

const getPageContentCount = (pageId: string, recordMap: any) => {
  const normalizedPageId = pageId.replace(/-/g, "")
  const pageBlock = Object.values(recordMap.block ?? {})
    .map(getEntryValue)
    .find((block: any) => {
      return (
        block?.type === "page" &&
        `${block.id ?? ""}`.replace(/-/g, "") === normalizedPageId
      )
    })

  return pageBlock?.content?.length ?? 0
}

const hasNewBlocks = (baseRecordMap: any, extraRecordMap: any) => {
  const baseBlockIds = new Set(Object.keys(baseRecordMap.block ?? {}))

  return Object.keys(extraRecordMap.block ?? {}).some(
    (blockId) => !baseBlockIds.has(blockId)
  )
}

const getMissingContentBlockIds = (recordMap: any) => {
  const missingBlockIds: string[] = []
  const blockMap = recordMap.block ?? {}

  for (const entry of Object.values(blockMap)) {
    const block = getEntryValue(entry)

    for (const blockId of block?.content ?? []) {
      if (!blockMap[blockId]) {
        missingBlockIds.push(blockId)
      }
    }
  }

  return unique(missingBlockIds)
}

const removeMissingContentBlockIds = (recordMap: any) => {
  const blockMap = recordMap.block ?? {}

  return {
    ...recordMap,
    block: Object.fromEntries(
      Object.entries(blockMap).map(([id, entry]) => {
        const block = getEntryValue(entry)

        if (!block?.content) {
          return [id, entry]
        }

        const nextContent = block.content.filter((blockId: string) => {
          return Boolean(blockMap[blockId])
        })

        return [
          id,
          mergeRecordEntry(entry, {
            value: {
              ...block,
              content: nextContent,
            },
          }),
        ]
      })
    ),
  }
}

const fillMissingBlocks = async (api: NotionAPI, recordMap: any) => {
  const missingBlockIds = getMissingContentBlockIds(recordMap)

  if (!missingBlockIds.length) {
    return recordMap
  }

  try {
    const missingBlocksRecordMap = await api.getBlocks(missingBlockIds)

    return mergeRecordMaps(recordMap, missingBlocksRecordMap.recordMap)
  } catch (error: any) {
    console.warn(
      "Notion missing blocks skipped",
      missingBlockIds,
      error?.message ?? error
    )

    return recordMap
  }
}

export const getRecordMap = async (pageId: string) => {
  const api = new NotionAPI()
  let recordMap = await api.getPage(pageId, {
    chunkLimit: PAGE_CHUNK_LIMIT,
    chunkNumber: 0,
  })

  if (getPageContentCount(pageId, recordMap) >= PAGE_CHUNK_LIMIT) {
    for (let chunkNumber = 1; chunkNumber <= MAX_EXTRA_CHUNKS; chunkNumber++) {
      try {
        const extraRecordMap = await api.getPage(pageId, {
          chunkLimit: PAGE_CHUNK_LIMIT,
          chunkNumber,
        })

        if (hasNewBlocks(recordMap, extraRecordMap)) {
          recordMap = mergeRecordMaps(recordMap, extraRecordMap)
        }
      } catch (error: any) {
        console.warn(
          "Notion extra page chunk skipped",
          pageId,
          error?.message ?? error
        )
      }
    }
  }

  recordMap = await fillMissingBlocks(api, recordMap)
  recordMap = removeMissingContentBlockIds(recordMap)

  return normalizeRecordMap(recordMap)
}
