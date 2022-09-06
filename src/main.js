const {addMarkdownFromFilePath} = require("./core/api/doc/addMarkdown");
const {headersBase,} = require("./core/config");

const {Command} = require("commander");
const {listDocs} = require("./core/api/doc/listDocs");
const path = require("path");
const {deleteDocOfToken, deleteDocsOfName} = require("./core/api/doc/deleteDoc");

const program = new Command();

program
  .command("list")
  .option("-n, --filterName <string>", "filter docs by name (regex supported)")
  .option("-t, --onlyToken", "return only wiki_token of docs")
  .action(async (opts) => {
    console.log(await listDocs(headersBase, opts.filterName, opts.onlyToken));
  });

program
  .command("add")
  .argument("-f, --filePath <string>", "file path to upload")
  .option('-k, --fileKey <string>', "file key, i.e. file name to show in sidebar")
  .option('-p, --prefix <string>', "prefix for fileKey")
  .action(async (fp, opts) => {
    const targetKey = [opts.prefix, opts.fileKey || path.basename(fp)].join('')
    await addMarkdownFromFilePath(fp, targetKey)
  });

program
  .command("del")
  .option("-t, --token <string>", "delete file of specific token")
  .option("-m, --matchKeys <string>", "delete files of names (regex supported)")
  .action(async (opts) => {

    if (opts.wiki_token !== undefined && opts.matchKeys !== undefined) {
      throw new Error("mutex error");
    }
    if (opts.wiki_token) {
      await deleteDocOfToken(opts.wiki_token);
    }
    if (opts.matchKeys) {
      await deleteDocsOfName(opts.matchKeys)
    }
  });

program
  .command('replace')
  .argument("-f, --filePath <string>", "file path to upload")
  .option('-k, --fileKey <string>', "file key, i.e. file name to show in sidebar")
  .option('-p, --prefix <string>', "prefix for fileKey")
  .option("-m, --matchKeys <string>", "delete files of names (regex supported)")
  .action(async (fp, opts) => {
    const targetKey = [opts.prefix, opts.fileKey || path.basename(fp)].join('')
    await deleteDocsOfName(opts.matchKeys || targetKey)
    await addMarkdownFromFilePath(fp, targetKey)
  })

program.parse(process.argv);
