/**
 * ref: https://blog.csdn.net/LightUpHeaven/article/details/81240862
 * @param str
 * @returns {Uint8Array}
 */

function string2Uint8Array(str: string): Uint8Array {
  var arr = [];
  for (var i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }

  var tmpUint8Array = new Uint8Array(arr);
  return tmpUint8Array;
}

/**
 * source: https://sf3-scmcdn2-cn.feishucdn.com/ccm/pc/web/resource/bear/js/4106.2e2e5c13f1aadfbc6f64.js:formatted:7787
 * @param e
 * @returns {*}
 * @constructor
 */
function Ds(e: Uint8Array) {
  return (function (e) {
    e =
      "string" == typeof e
        ? (function (e: string) {
          for (
            var t = new Uint8Array(e.length), r = 0, n = e.length;
            r < n;
            r++
          )
            t[r] = 255 & e.charCodeAt(r);
          return t;
        })(e)
        : e;
    var t = new Uint32Array([1, 0, e.length, 0, 0, 65521, 5552, 0]),
      r = t[0],
      n = t[1],
      i = t[2],
      a = t[3],
      o = t[4],
      s = t[5],
      u = t[6];
    for (; i > 0;) {
      i -= o = i > u ? u : i;
      do {
        n += r += e[a++];
      } while (--o);
      (r %= s), (n %= s);
    }
    return ((n << 16) | r) >>> 0;
  })(new Uint8Array(e)).toString();
}

export function getChecksumFromString(s: string): string {
  return Ds(string2Uint8Array(s));
}


