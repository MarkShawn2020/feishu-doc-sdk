# The FeiShu Doc SDK Based on HTTPS You Need !

## USAGE

### 1. config your account with these keys (which can be derived from F12 easily)

```json
# src/config/account.sample.json (customize your one named with `acccount.json`)
{
  "x-csrftoken": "xxx",
  "cookie": "xxx",
  "space_id": "xxx",
  "synergy_uuid": "xxx",
  "mountNodeToken": "xxx",
  "host": "xxx"
}
```

### 2. enjoy the SDK

#### 1. list docs under specific mounted-node

```shell
# normal, get full fields of raw response data
ts-node src/main.ts list

# only show token and titles (helpful for deletion)
ts-node src/main.ts list -t

# ambiguous search (helpful for deletion)
ts-node src/main.ts list -t -n "test*"
```

#### 2. add doc from local file path (only support markdown now)

```shell
# normal
ts-node src/main.ts add $YOUR-FILE.md

# add a prefix into file title in the sidebar
ts-node src/main.ts add $YOUR-FILE.md -p my-

# directly set title in the sidebar
ts-node src/main.ts add $YOUR-FILE.md -k MY_FILE.md

# directly set title in the sidebar with a prefix
ts-node src/main.ts add $YOUR-FILE.md -k FILE.md -p MY-
```

#### 3. delete doc(s) with `wiki_token` or ambiguous search

```shell
# delete all the docs with title containing `test` under mounted-node
ts-node src/main.ts del -r test

# delete specific doc of some wiki_token
ts-node src/main.ts del -t $THE-FILE-WIKI-TOKEN
```

#### 4. replace doc

```shell
ts-node src/main.ts replace $YOUR-FILE.md \
    -k THE-KEY-YOU-WANNA-SET \
    -p THE-PREFIX-YOU-WANNA-SET \
    -r THE-FILES-WITH-REGEX-TITLE-FOR-DELTE/REPLACE
```

## TIPS

1. The feishu only supports pool features of markdown, e.g. it doesn't support image, admonition yet.
2. The markdown file must ends with `.md`, otherwise can't be opened in feishu
3. The markdown file uploaded onto feishu cannot be modified, but you can delete and re-upload it using our SDK, i.e command of `replace`

## TODO

- [ ] implement the sync with github push CI
- [ ] support more formats of file
- [ ] enable download feishu doc into markdown
