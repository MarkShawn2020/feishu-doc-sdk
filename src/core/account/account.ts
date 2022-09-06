import {
  createHeadersAddDocFromBase,
  createHeadersDelDocFromBase,
  IHeadersAddDoc,
  IHeadersBase,
  IHeadersDelDoc, IHeadersListDocs
} from "./headers";
import {ISpace} from "./space";
import {addDocFromFile} from "../api/doc/addDoc";
import {delDoc, delDocsOfRegexTitle, IDelDocPayload} from "../api/doc/delDoc";
import {IResListDocs, listDocs} from "../api/doc/listDocs";


export interface IAccount {
  host: string
  cookie: string
  'x-csrftoken': string
  space_id: string
  synergy_uuid: string
  mountNodeToken: string
}

export class Account {
  public headersBase: IHeadersBase
  public space: ISpace
  public readonly URL_BASE: string

  constructor(props: IAccount) {
    this.URL_BASE = props.host
    this.headersBase = {
      referer: this.URL_BASE,
      cookie: props.cookie,
      "x-csrftoken": props["x-csrftoken"]
    }
    this.space = {
      synergy_uuid: props.synergy_uuid,
      space_id: props.space_id,
      mountNodeToken: props.mountNodeToken
    }
  }

  public async apiListDocs(): Promise<IResListDocs> {
    return await listDocs({
      parentToken: this.space.mountNodeToken,
      headersListDocs: this.headersBase,
      space_id: this.space.space_id,
      urlListDocs: this.getUrlListDocs()
    })
  }

  public async apiAddDoc(filePath: string, fileKey: string | undefined = undefined) {
    return await addDocFromFile({
      filePath,
      fileKey,
      headersAddDoc: this.createHeadersAddDoc(),
      parentToken: this.space.mountNodeToken
    })
  }

  public async apiDelDocOfWikiToken(wiki_token: string) {
    return await delDoc({
      headers: this.createHeadersDelDoc(),
      url: this.getUrlDelDoc(),
      payload: {
        wiki_token,
        synergy_uuid: this.space.synergy_uuid,
        space_id: this.space.space_id
      }
    })
  }

  public async apiDelDocsOfRegexTitle(regexTitle: string) {
    return await delDocsOfRegexTitle({
      regexTitle,
      reqListDocs: {
        parentToken: this.space.mountNodeToken,
        space_id: this.space.space_id,
        urlListDocs: this.getUrlListDocs(),
        headersListDocs: this.createHeadersListDocs()
      },
      reqDelDoc: {
        headers: this.createHeadersDelDoc(),
        url: this.getUrlDelDoc(),
        payload: {
          wiki_token: '',  // would be overridden
          space_id: this.space.space_id,
          synergy_uuid: this.space.synergy_uuid,
        }
      }
    })
  }

  private createHeadersListDocs(): IHeadersListDocs {
    return this.headersBase as IHeadersListDocs
  }

  private createHeadersAddDoc(): IHeadersAddDoc {
    return createHeadersAddDocFromBase(this.headersBase)
  }

  private createHeadersDelDoc(): IHeadersDelDoc {
    return createHeadersDelDocFromBase(this.headersBase)
  }

  private getUrlListDocs(): string {
    return `${this.URL_BASE}/space/api/wiki/v2/tree/get_node_child/`
  }

  private getUrlAddDoc(wikitoken: string): string {
    return `${this.URL_BASE}/wiki/${wikitoken}`
  }

  private getUrlDelDoc(): string {
    return `${this.URL_BASE}/space/api/wiki/v2/tree/del_node/`
  }

  private createDelDocPayload(wiki_token: string): IDelDocPayload {
    return {
      wiki_token,
      synergy_uuid: this.space.synergy_uuid,
      space_id: this.space.space_id
    }
  }

}
