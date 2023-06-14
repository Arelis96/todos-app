export const getIdList = (arr: unknown[]) => {
  return arr.map((item) => (item as Record<string, unknown>)._id as string)
}
