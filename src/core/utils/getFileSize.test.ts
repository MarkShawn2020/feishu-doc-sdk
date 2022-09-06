const {getFileSize} = require("./getFileSize");
test('get fileSize', () => {
  expect(getFileSize('/Users/mark/my-learning/my-website/my-documents/my-private-documents/arpara/public/techs/android-framework/quli/compile.md'))
    .toBe(4011)

  expect(getFileSize('/Users/mark/my-learning/my-website/my-documents/my-private-documents/arpara/public/techs/android-framework/quli/compile.md.bak'))
    .toBe(3897)
})