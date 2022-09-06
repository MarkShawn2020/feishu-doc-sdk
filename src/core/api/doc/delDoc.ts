import {IReqListDocs, IResListDocsItem, listDocs} from "./listDocs";
import {IResSuccessBase} from "../base";
import {IHeadersDelDoc} from "../../account/headers";

export interface IDelDocPayload {
  space_id: string
  synergy_uuid: string
  wiki_token: string
}

export interface IReqDelDoc {
  url: string
  headers: IHeadersDelDoc
  payload: IDelDocPayload
}

/**
 * sample:
 * {"code":0,"msg":"Success","data":{"total":1}}
 */
export interface IResDelDoc extends IResSuccessBase {
  data: {
    total: number
  }
}

/**
 * url: https://internal-api-space.feishu.cn/space/api/wiki/v2/tree/del_node/
 * @param {IReqDelDoc} props
 * @returns {Promise}
 */
export async function delDoc(props: IReqDelDoc): Promise<IResDelDoc> {
  console.log(`deleting file of token: ${props.payload.wiki_token}`);
  let body = JSON.stringify({...props.payload, auto_delete_mode: 0});
  const delRes = await (
    await fetch(props.url, {
      headers: props.headers,
      body,
      method: "POST",
    })
  ).json();
  console.log(delRes)
  return delRes
}

/**
 * todo: batch delete
 * @param {string} searchFileKey
 * @param {IReqListDocs} reqListDocs
 * @param {IReqDelDoc} reqDelDoc
 * @returns {Promise<void>}
 */

export interface IReqDelDocsOfRegexTitle {
  regexTitle: string
  reqListDocs: IReqListDocs
  reqDelDoc: IReqDelDoc
}

export async function delDocsOfRegexTitle(props: IReqDelDocsOfRegexTitle): Promise<IResDelDoc[]> {
  const docs: IResListDocsItem[] = (await listDocs(props.reqListDocs)).data[props.reqListDocs.parentToken];
  const filteredDocs = docs.filter(doc => new RegExp(props.regexTitle).test(doc.title))
  console.log(`matched ${filteredDocs.length} docs`);
  let responses: IResDelDoc[] = []
  for (const doc of filteredDocs) {
    props.reqDelDoc.payload.wiki_token = doc.wiki_token
    responses.push(await delDoc(props.reqDelDoc))
  }
  return responses
}

