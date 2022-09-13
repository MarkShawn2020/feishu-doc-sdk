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
export const RE_HEADING_1 = /^# (.*)/m
export const RE_FRONTMATTER_TITLE = /^title: (.*)/m
export const RE_ARPARA_END = /^<!-- ARPARA-END -->/gm


export const transBlog2Feishu = (fp: string): string => {
  let content = fs.readFileSync(fp, {encoding: 'utf-8'})
  let frontmatters = ''
  let title = ''

  // drop frontmatters
  if (RE_FRONTMATTERS.test(content)) {
    [, frontmatters, content] = content.match(RE_FRONTMATTERS)!
  }

  // drop arpara end before comments
  if (RE_ARPARA_END.test(content)) {
    content = content.split(RE_ARPARA_END)[0]
  }

  // drop comments
  if (RE_COMMENT.test(content)) {
    content = content.replace(RE_COMMENT, '')
  }

  if (RE_FRONTMATTER_TITLE.test(frontmatters)) {
    title = frontmatters.match(RE_FRONTMATTER_TITLE)![1]
  } else if (RE_HEADING_1.test(content)) {
    title = content.match(RE_HEADING_1)![1]
  } else {
    title = path.basename(fp)
  }

  // add blog reference
  // 专用于在飞书文档内生成博客链接，并自动镶嵌到文档抬头（但不会同步在目标博客内）
  const blogPath = filepath2blog(fp)
  if (blogPath) {
    content = `\n> // DO NOT EDIT THIS DOC, SINCE IT IS SYNCED PROGRAMMATICALLY. \n>\n>For better reading experience, refer to [blog: ${title}](${blogPath}).\n` + content
  }

  return content
}