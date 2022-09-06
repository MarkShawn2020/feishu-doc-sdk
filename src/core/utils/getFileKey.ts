const path = require("path");

function getFileKey(filePath) {
  return path.basename(filePath);
}

module.exports = {
  getFileKey,
};
