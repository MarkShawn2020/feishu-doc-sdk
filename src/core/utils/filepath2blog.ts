/**
 * sample online url: https://www.markshawn.com/docs/@arpara/android-framework/quli/A01_compile
 * @param {string} fp
 * @returns {string | undefined}
 */
import * as path from "path";

const filepath2blog = (fp: string): string | undefined => {
  const fileType = '.md'
  const targetString = '@arpara'
  const prefixPart = 'https://www.markshawn.com/docs/'

  if (!fp.includes(targetString) || !fp.endsWith(fileType)) return

  const start = fp.indexOf(targetString)
  const suffixPart = fp.substring(start).replace(fileType, '')
  return prefixPart + suffixPart
}

/**
 * 专用于在飞书文档内生成博客链接，并自动镶嵌到文档抬头（但不会同步在目标博客内）
 * @param {string} fp
 * @param fn
 * @returns {string | undefined}
 */
export const createBlogRef = (fp: string, fn?: string): string => {
  const blogPath = filepath2blog(fp)
  if (!blogPath) return ''

  if (!fn) {
    fn = path.basename(fp)
  }
  return `\n> For better reading experience, refer to [blog: ${fn}](${blogPath}).\n`
}