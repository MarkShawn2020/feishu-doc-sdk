const { headersDelDoc, spaceInfo, headersBase} = require("../../config");
const {listDocs} = require("./listDocs");

async function deleteDoc(url, headers, docInfo) {
  let body = JSON.stringify({ ...docInfo, auto_delete_mode: 0 });
  return await (
    await fetch(url, {
      headers,
      body,
      method: "POST",
    })
  ).json();
}

async function deleteDocOfToken(wiki_token) {
  console.log(`deleting file of token: ${wiki_token}`);
  const docInfo = {
    space_id: spaceInfo.space_id,
    synergy_uuid: spaceInfo.synergy_uuid,
    wiki_token,
  };
  return await deleteDoc(spaceInfo.urlDelDoc, headersDelDoc, docInfo);
}

async function deleteDocsOfName(fn) {
  const filteredDocs = await listDocs(headersBase, fn, true);
  console.log(`found ${filteredDocs.length} matched docs`);
  for (const doc of filteredDocs) {
    // console.log({ doc });
    console.log(await deleteDocOfToken(doc.wiki_token));
  }
}

module.exports = {
  deleteDoc,
  deleteDocOfToken,
  deleteDocsOfName,
};

if (require.main === module) {
  const docInfo = {
    space_id: spaceInfo.space_id,
    synergy_uuid: spaceInfo.synergy_uuid,
    wiki_token: "wikcnAj7hsoJNmMoqTlNugcOOeg",
  };

  deleteDoc(docDelUrl, headersDelDoc, docInfo);
}
