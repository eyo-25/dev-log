const normalizeRecordEntry = (id: string, entry: any) => {
  const value = entry?.value?.value ?? entry?.value

  if (!value) return entry

  return {
    ...entry,
    value: {
      ...value,
      id: value.id ?? id,
    },
  }
}

const normalizeRecordMapTable = (table: any) => {
  if (!table) return table

  return Object.fromEntries(
    Object.entries(table).map(([id, entry]) => [
      id,
      normalizeRecordEntry(id, entry),
    ])
  )
}

export const normalizeRecordMap = <T extends Record<string, any>>(recordMap: T) => {
  return {
    ...recordMap,
    block: normalizeRecordMapTable(recordMap.block),
    collection: normalizeRecordMapTable(recordMap.collection),
    collection_view: normalizeRecordMapTable(recordMap.collection_view),
    notion_user: normalizeRecordMapTable(recordMap.notion_user),
  }
}
