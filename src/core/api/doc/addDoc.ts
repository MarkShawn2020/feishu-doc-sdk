import * as path from "path";
import * as fs from "fs";

import axios from "axios";

import {IResSuccessBase} from "../base";
import {getFileSize} from "../../utils/getFileSize";
import {getChecksumFromFile} from "../../algo/getChecksum";
import {IHeadersAddDoc} from "../../account/headers";

const FormData = require('form-data')

export function getUrl(filePath: string, fileKey: string | undefined, mountNodeToken: string) {
  let fileSize = getFileSize(filePath);
  let fileChecksum = getChecksumFromFile(filePath);
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
 *
 * todo: support other file formats (now only implemented markdown)
 * @returns {Promise<void>}
 */
export async function addDocFromFile(props: IReqAddDocFromFile): Promise<IResAddDoc> {
  // const fileContent = fs.readFileSync(filePath, {encoding: "ascii"}).toString('utf8'); // https://stackoverflow.com/a/7807717/9422455 // 没用，飞书还是现实乱码
  // const fileContent = fs.readFileSync(filePath, {encoding: "binary"}); // FAILED: the actual size is inconsistent with the parameter declaration size
  // const fileContent = fs.readFileSync(filePath, {encoding: "ascii"}); // FAILED: checksum Invalid
  const fileContent = fs.readFileSync(props.filePath, {encoding: "utf8"}); // YES, utf-8 yyds !
  const fileKey = props.fileKey || path.basename(props.filePath)

  const formData = new FormData();
  formData.append("file", fileContent, fileKey)
  const res = await (await axios.post(getUrl(props.filePath, fileKey, props.parentToken), formData, {
    headers: props.headersAddDoc,
  })).data;
  return res;
}
