export interface FormErrorInfo<Values = unknown> {
  values: Values
  errorFields: {
    name: (string | number)[]
    errors: string[]
  }[]
  outOfDate: boolean
}
