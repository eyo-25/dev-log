import { NotionAPI } from "notion-client"
import { normalizeRecordMap } from "src/libs/utils/notion/normalizeRecordMap"

export const getRecordMap = async (pageId: string) => {
  const api = new NotionAPI()
  const recordMap = await api.getPage(pageId)
  return normalizeRecordMap(recordMap)
}
