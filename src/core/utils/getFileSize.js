const fs = require("fs");

/**
 * possible errors: the actual size is inconsistent with the parameter declaration size
 * @param fp
 * @returns {number}
 */
const getFileSize = (fp) => {
  return fs.readFileSync(fp, { encoding: 'binary'}).length;
  // return fs.readFileSync(fp, { encoding: "utf-8" }).length;
  // return fs.readFileSync(fp, { encoding: "ascii" }).length;
  // return fs.readFileSync(fp, { encoding: "binary" }).length;
};

module.exports = {
  getFileSize,
};
