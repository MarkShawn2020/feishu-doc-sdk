import _ = require("lodash");
import {spaceInfo} from "../../config";

export async function listDocs(headers, filterName = undefined, onlyToken = false) {
  const parentToken = spaceInfo.docToken_QVR;
  const res = await (
    await fetch(
      spaceInfo.urlListDocs +
      `?space_id=${spaceInfo.space_id}` +
      `&wiki_token=${parentToken}` +
      "&expand_shortcut=true" +
      "&exclude_fields=5",
      {
        headers,
        body: null,
        method: "GET",
      }
    )
  ).json();
  let data = res.data[parentToken];
  if (filterName !== undefined) {
    data = data.filter((item) => new RegExp(filterName).test(item.title));
  }
  if (onlyToken) {
    data = data.map((item) => _.pick(item, ["title", "wiki_token"]));
  }
  // console.debug(JSON.stringify(data, null, 2));
  return data;
}
