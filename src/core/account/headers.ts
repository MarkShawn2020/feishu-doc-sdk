export interface IHeadersBase extends Record<string, string>{
  /**
   * necessary
   */
  cookie: string

  /**
   * necessary
   */
  'x-csrftoken': string

  /**
   * necessary, can be the domain of doc
   */
  referer: string
}

export type IHeadersListDocs = IHeadersBase

export interface IHeadersAddDoc extends IHeadersBase {
  /**
   * the boundary can be arbitrary, it's agreed by Internet Protocol
   */
  "content-type": `multipart/form-data; boundary=----WebKitFormBoundaryYI6bB8rQx1FsItMR`,
}

export const createHeadersAddDocFromBase = (headersBase: IHeadersBase): IHeadersAddDoc => ({
  ...headersBase,
  "content-type": `multipart/form-data; boundary=----WebKitFormBoundaryYI6bB8rQx1FsItMR`,
})

export interface IHeadersDelDoc extends IHeadersBase {
  "content-type": "application/json"
}

export const createHeadersDelDocFromBase = (headersBase: IHeadersBase): IHeadersDelDoc => ({
  ...headersBase,
  "content-type": "application/json"
})
