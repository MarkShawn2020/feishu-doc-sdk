import * as fs from "fs";

const fp = '/Users/mark/my-docusaurus/my-website/my-documents/docs/@arpara/android-framework/quli/A02_env.md'

const contentUtf8 = fs.readFileSync(fp, {encoding: 'utf-8'})
const contentUtf82ascii = String(Buffer.from(contentUtf8, 'utf-8').toString('ascii'))
const contentUtf82binary = String(Buffer.from(contentUtf8, 'utf-8').toString('binary'))
const contentBinary = fs.readFileSync(fp, {encoding: 'binary'})

console.log({
  content: {
    utf8: contentUtf8,
    binary: contentBinary,
    utf82ascii: contentUtf82ascii,
    utf82binary: contentUtf82binary
  },
  len: {
    utf8: contentUtf8.length,
    binary: contentBinary.length,
    utf82ascii: contentUtf82ascii.length,
    utf82binary: contentUtf82binary.length
  }
})

console.log(contentBinary === contentUtf82binary)