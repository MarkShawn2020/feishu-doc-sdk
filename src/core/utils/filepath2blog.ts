/**
 * sample online url: https://www.markshawn.com/docs/@arpara/android-framework/quli/A01_compile
 * @param {string} fp
 * @returns {string | undefined}
 */
import * as path from "path";
import * as fs from "fs";

const filepath2blog = (fp: string): string | undefined => {
  const fileType = '.md'
  const targetStringStart = '@arpara'
  const prefixPart = 'https://www.markshawn.com/docs/'

  if (!fp.includes(targetStringStart) || !fp.endsWith(fileType)) return

  const start = fp.indexOf(targetStringStart)
  const suffixPart = fp.substring(start).replace(fileType, '')
  return prefixPart + suffixPart
}

export const RE_FRONTMATTERS = /^---\n([^]*?)\n---\n([^]*)/m
export const RE_COMMENT = /^<!--.*?-->/gm
export const RE_TITLE = /^# (.*)/m


export const transBlog2Feishu = (fp: string): string => {
  let content = fs.readFileSync(fp, {encoding: 'utf-8'})

  // drop frontmatters
  if (RE_FRONTMATTERS.test(content)) {
    content = content.match(RE_FRONTMATTERS)![2]
  }

  // drop comments
  if (RE_COMMENT.test(content)) {
    content = content.replace(RE_COMMENT, '')
  }

  // add blog reference
  // 专用于在飞书文档内生成博客链接，并自动镶嵌到文档抬头（但不会同步在目标博客内）
  const blogPath = filepath2blog(fp)
  if (blogPath) {
    const reBlogTitle = content.match(RE_TITLE)
    const title = reBlogTitle ? reBlogTitle![1] : path.basename(fp)
    content = `\n> For better reading experience, refer to [blog: ${title}](${blogPath}).\n` + content
  }

  return content
}