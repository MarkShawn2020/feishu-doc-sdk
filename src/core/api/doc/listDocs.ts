import {IResSuccessBase} from "../base";
import {IHeadersListDocs} from "../../account/headers";

/**
 * @see sample: {@link import('../../../../sample/sensitive/resListDocsItem.json')}
 */
export interface IResListDocsItem {
  has_child: boolean
  obj_token: string
  obj_type: number
  origin_is_external: boolean
  origin_space_id: string
  origin_url: string
  origin_wiki_token: string
  parent_wiki_token: string
  secret_key_delete: boolean
  sort_id: number
  space_id: string
  title: string
  url: string
  wiki_node_type: number
  wiki_token: string

}

export interface IResListDocs extends IResSuccessBase {
  data: Record<string, IResListDocsItem[]>
}

export interface IReqListDocs {
  parentToken: string
  space_id: string
  urlListDocs: string
  headersListDocs: IHeadersListDocs
}

export async function listDocs(props: IReqListDocs): Promise<IResListDocs> {
  const url = `${props.urlListDocs}?space_id=${props.space_id}&wiki_token=${props.parentToken}&expand_shortcut=true&exclude_fields=5`
  return await (
    await fetch(url,
      {
        headers: props.headersListDocs,
        body: null,
        method: "GET",
      }
    )
  ).json();
}
