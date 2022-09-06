import requests

url = "https://internal-api-drive-stream.feishu.cn/space/api/box/stream/upload/all/" \
      "?name=test-pure-md.md" \
      "&size=33" \
      "&checksum=2846231082" \
      "&mount_node_token=wikcnhKiTGCVdgWqMmfJn7y1Xqh" \
      "&mount_point=wiki" \
      "&push_open_history_record=0&ext%5Bextra%5D=" \
      "&size_checker=true"

headers = {
    'Host'              : 'internal-api-drive-stream.feishu.cn',
    'sec-ch-ua'         : '',
    'DNT'               : '1',
    'X-TT-LOGID'        : '02166236901477300000000000000000000ffffbcfbcafc565b2a',
    'sec-ch-ua-mobile'  : '?0',
    'User-Agent'        : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    'Content-Type'      : 'multipart/form-data; boundary=----WebKitFormBoundarysm259V2HSdyce8Ni',
    'Accept'            : 'application/json, text/plain, */*',
    'X-Command'         : 'space.api.box.stream.upload.all',
    'X-CSRFToken'       : 'b3df94bc90756e88b55358d1a0743f4b2db8aa2f-1660577290',
    'X-Request-Id'      : '1Bia34RNmOi4Hg2YIgH5KupEPRYwuvnW',
    'sec-ch-ua-platform': '',
    'Origin'            : 'https://arpara2021.feishu.cn',
    'Sec-Fetch-Site'    : 'same-site',
    'Sec-Fetch-Mode'    : 'cors',
    'Sec-Fetch-Dest'    : 'empty',
    'Referer'           : 'https://arpara2021.feishu.cn/',
    'Accept-Language'   : 'zh-CN,zh;q=0.9',
    'Cookie'            : '__tea__ug__uid=7726921644210065470; passport_web_did=7119081216476790812; QXV0aHpDb250ZXh0=de828c7a154c4b459fff162ff71af910; locale=zh-CN; trust_browser_id=6921f6f6-4f03-4ab5-90b5-f58437f33f61; session=XN0YXJ0-876g4fd4-2b84-43ef-bb31-71faf553fa83-WVuZA; session_list=XN0YXJ0-876g4fd4-2b84-43ef-bb31-71faf553fa83-WVuZA; is_anonymous_session=; lang=zh; _csrf_token=b3df94bc90756e88b55358d1a0743f4b2db8aa2f-1660577290; MONITOR_WEB_ID=7085189359086878748; help_center_session=23855b8b-32c5-4c9b-839b-b47e88279b8c; _uuid_hera_ab_path_1=7135719079014301697; Hm_lvt_e78c0cb1b97ef970304b53d2097845fd=1661414067,1661915601,1661934055; _ga=GA1.2.2019101383.1661414068; _ga_VPYRHN104D=GS1.1.1661934055.4.1.1661935687.0.0.0; swp_csrf_token=61c9a040-d6ba-4579-8f69-d65edd309e88; t_beda37=7539c08e598c0052349918149ab7f65364c10ca22d174e35990e563486b3c4de'
}

res = requests.post(
    url,
    files={'file': ('test-pure-md.md', open('test-pure-md.md', 'r'), 'text/markdown')},
    headers=headers,
)
# print(res.headers)
print(res.json())
