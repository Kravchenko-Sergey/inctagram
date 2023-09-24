export type ErrorType = {
  statusCode: number
  messages: [
    {
      message: string
      field: string
    },
  ]
  error: string
}
export type RegisterError = {
  status: number
  data: ErrorType
}
