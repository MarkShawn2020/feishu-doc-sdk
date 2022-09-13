import {RE_ARPARA_END, RE_COMMENT, RE_FRONTMATTERS, RE_HEADING_1} from "../src/core/utils/filepath2blog";

describe('test regex', function () {
  test('test frontmatters', () => {
    const s = '---\nfrontmatter line 1\nfrontmatter line 2\n---\nmain content area\n---\nextra content for robust\n\n'
    let reResult = s.match(RE_FRONTMATTERS)
    console.log({reResult})
    expect(reResult.length).toBe(3)
    expect(reResult[1]).toEqual('frontmatter line 1\nfrontmatter line 2')
    expect(reResult[2]).toEqual('main content area\n---\nextra content for robust\n\n')
  })


  test('test comment', () => {
    const testString1 = '<!-- line 1 -->\n<!-- truncate -->'
    expect(testString1.replace(RE_COMMENT, '')).toBe('\n')

    const testString2 = 'hhh\n<!-- truncate -->\nxxx'
    expect(RE_COMMENT.test(testString2)).toBe(true)
  })

  test('test match title', () => {
    const testString1 = 'start\n# title1\n# title2\n```txt\n# title3\n```\n# title4\nend'
    const testString2 = 'start\n```txt\n# title3\n```\n# title4\n# title1\n# title2\nend'
    expect(testString1.match(RE_HEADING_1)[1]).toBe('title1')
    expect(testString2.match(RE_HEADING_1)[1]).toBe('title3')
  })

  test('drop ARPARA-END', () => {
    const testString = 'lll\nhhh\n<!-- ARPARA-END -->\n111\n222'
    expect(testString.split(RE_ARPARA_END)[0]).toBe('lll\nhhh\n')
  })
});
