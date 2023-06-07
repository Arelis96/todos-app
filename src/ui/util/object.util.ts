/* eslint-disable @typescript-eslint/no-explicit-any */
export const isObjectEmpty = (obj: any): boolean => {
  return Object.keys(obj as any).length === 0
}
