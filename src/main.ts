#!/usr/local/bin/ts-node
import * as fs from "fs";
import * as path from "path";

import {Command} from "commander";
import * as _ from "lodash";

import {Account} from "./core/account/account";
import {IResListDocs, IResListDocsItem} from "./core/api/doc/listDocs";


const accountFilePath = path.resolve(__dirname, "config/account.json")
const account: Account = new Account(JSON.parse(fs.readFileSync(accountFilePath, {encoding: 'utf-8'})))

const program = new Command();

program
  .command("list")
  .option("-n, --regexTitle <string>", "filter docs by name (regex supported)")
  .option("-t, --onlyToken", "return only wiki_token of docs")
  // action doesn't return
  .action(async (opts) => {
    let res: IResListDocs = await account.apiListDocs()
    let docs: Pick<IResListDocsItem, "title" | "wiki_token">[] = res.data[account.space.mountNodeToken]
    if (opts.regexTitle) {
      docs = docs.filter(doc => new RegExp(opts.regexTitle).test(doc.title))
    }
    if (opts.onlyToken) {
      docs = docs.map(doc => _.pick(doc, ['title', 'wiki_token']))
    }
    console.log(docs)
  });

program
  .command("add")
  .argument("-f, --filePath <string>", "file path to upload")
  .option('-k, --fileKey <string>', "file key, i.e. file name to show in sidebar")
  .option('-p, --prefix <string>', "prefix for fileKey")
  .action(async (fp, opts) => {
    const targetKey = [opts.prefix, opts.fileKey || path.basename(fp)].join('')
    const res = await account.apiAddDoc(fp, targetKey)
    console.log(res.data)
  });

program
  .command("del")
  .option("-t, --token <string>", "delete file of specific token")
  .option("-r, --regexTitle <string>", "delete files of names (regex supported)")
  .action(async (opts) => {

    if (opts.wiki_token !== undefined && opts.matchKeys !== undefined) {
      throw new Error("mutex error");
    }
    if (opts.wiki_token) {
      const res = await account.apiDelDocOfWikiToken(opts.wiki_token);
      console.log(res.data)
    }
    if (opts.regexTitle) {
      const responses = await account.apiDelDocsOfRegexTitle(opts.regexTitle)
      console.log(responses.map(res => res.data))
    }
  });

program
  .command('replace')
  .argument("-f, --filePath <string>", "file path to upload")
  .option('-k, --fileKey <string>', "file key, i.e. file name to show in sidebar")
  .option('-p, --prefix <string>', "prefix for fileKey")
  .option("-r, --regexTitle <string>", "delete files of names (regex supported)")
  .action(async (fp, opts) => {
    const targetKey = [opts.prefix, opts.fileKey || path.basename(fp)].join('')
    await account.apiDelDocsOfRegexTitle(opts.regexTitle || targetKey)
    await account.apiAddDoc(fp, targetKey)
  })

program.parse(process.argv);
