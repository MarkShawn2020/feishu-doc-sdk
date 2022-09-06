import * as path from "path";

export function getFileKey(filePath) {
  return path.basename(filePath);
}

