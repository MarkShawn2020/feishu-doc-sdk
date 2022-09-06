export interface ResBase {
  code: number
  msg: string
  data: object
}

export interface IResSuccessBase extends ResBase {
  code: 0
  msg: 'Success'
}