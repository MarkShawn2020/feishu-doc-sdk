/**
 * possible errors: the actual size is inconsistent with the parameter declaration size
 * @param fp
 * @returns {number}
 */
import * as fs from "fs";

export const getFileSize = (fp) => {
  return fs.readFileSync(fp, {encoding: 'binary'}).length;
};
