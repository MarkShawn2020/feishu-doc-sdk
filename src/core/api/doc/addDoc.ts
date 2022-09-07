import * as path from "path";
import * as fs from "fs";

import axios from "axios";

import {IResSuccessBase} from "../base";
import {getChecksumFromString} from "../../algo/getChecksum";
import {IHeadersAddDoc} from "../../account/headers";
import {createBlogRef} from "../../utils/filepath2blog";

const FormData = require('form-data')

export interface IReqAddDocFromFile {
  filePath: string
  headersAddDoc: IHeadersAddDoc
  parentToken: string
  fileKey: string | undefined
}

/**
 * @see sample: {@link import('../../../../sample/sensitive/resAddDoc.json')}
 */
export interface IResAddDoc extends IResSuccessBase {
  "data": {
    "data_version": string,
    "extra": {
      "node_token": string // wiki_token
    },
    "file_token": string,
    "version": string
  }
}

/**
 * ref: https://stackoverflow.com/a/53247679/9422455
 * @param input
 * @returns {any}
 */
function stringToBinary(input: string): string {
  var characters = input.split('');

  return characters
    .map(function (char) {
      return char.charCodeAt(0).toString(2).padStart(8, '0')
    })
    .join(' '); // show with space for each byte
                // watch leading zero, which is missed in the former code
}

/**
 *
 * todo: support other file formats (now only implemented markdown)
 * @returns {Promise<void>}
 */
export async function addDocFromFile(props: IReqAddDocFromFile): Promise<IResAddDoc> {

  function getUrl(content: string, fileKey: string | undefined, mountNodeToken: string) {
    let fileSize = content.length;
    let fileChecksum = getChecksumFromString(content);
    // console.log({fileSize, fileChecksum})
    const url =
      "https://internal-api-drive-stream.feishu.cn/space/api/box/stream/upload/all/" +
      `?name=${fileKey}` +
      `&size=${fileSize}` +
      `&checksum=${fileChecksum}` +
      `&mount_node_token=${mountNodeToken}` +
      "&mount_point=wiki" +
      "&push_open_history_record=0" +
      "&ext%5Bextra%5D=" +
      "&size_checker=true";
    // console.log({filePath, fileKey, fileSize, fileChecksum, mountNodeToken, url});
    return url;
  }


  // const fileContent = fs.readFileSync(filePath, {encoding: "ascii"}).toString('utf8'); // https://stackoverflow.com/a/7807717/9422455 // 没用，飞书还是现实乱码
  // const fileContent = fs.readFileSync(filePath, {encoding: "binary"}); // FAILED: the actual size is inconsistent with the parameter declaration size
  // const fileContent = fs.readFileSync(filePath, {encoding: "ascii"}); // FAILED: checksum Invalid
  let fileContent = fs.readFileSync(props.filePath, {encoding: "utf8"}); // YES, utf-8 yyds !
  fileContent = createBlogRef(props.filePath) + fileContent
  const fileKey = props.fileKey || path.basename(props.filePath)

  const url = getUrl(Buffer.from(fileContent).toString('binary'), fileKey, props.parentToken)
  const formData = new FormData();
  formData.append("file", fileContent, fileKey)
  const res = await (await axios.post(url, formData, {
    headers: props.headersAddDoc,
  })).data
  return res
}
