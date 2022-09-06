const {getChecksumFromString, getChecksumFromFile} = require("./getChecksum");


test('test pure text', () => {
  expect(getChecksumFromString("# test1"))
    .toBe('134611509')
  expect(getChecksumFromFile('/Users/mark/my-learning/my-website/my-documents/my-private-documents/arpara/public/techs/android-framework/quli/compile.md'))
    .toBe('3513065572')
})