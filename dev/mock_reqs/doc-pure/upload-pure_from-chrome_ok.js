fetch("https://internal-api-drive-stream.feishu.cn/space/api/box/stream/upload/all/?name=test-pure-md.md&size=33&checksum=2846231082&mount_node_token=wikcnhKiTGCVdgWqMmfJn7y1Xqh&mount_point=wiki&push_open_history_record=0&ext%5Bextra%5D=&size_checker=true", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundarysm259V2HSdyce8Ni",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-command": "space.api.box.stream.upload.all",
    "x-csrftoken": "b3df94bc90756e88b55358d1a0743f4b2db8aa2f-1660577290",
    "x-request-id": "6kjV0gQqB9xJbYgAa9GtM6ST2oSSb6nM",
    "x-tt-logid": "02166237234694700000000000000000000ffff53c7d230d8c5f7",
    "cookie": "__tea__ug__uid=7726921644210065470; passport_web_did=7119081216476790812; QXV0aHpDb250ZXh0=de828c7a154c4b459fff162ff71af910; locale=zh-CN; trust_browser_id=6921f6f6-4f03-4ab5-90b5-f58437f33f61; session=XN0YXJ0-876g4fd4-2b84-43ef-bb31-71faf553fa83-WVuZA; session_list=XN0YXJ0-876g4fd4-2b84-43ef-bb31-71faf553fa83-WVuZA; is_anonymous_session=; lang=zh; _csrf_token=b3df94bc90756e88b55358d1a0743f4b2db8aa2f-1660577290; MONITOR_WEB_ID=7085189359086878748; help_center_session=23855b8b-32c5-4c9b-839b-b47e88279b8c; _uuid_hera_ab_path_1=7135719079014301697; Hm_lvt_e78c0cb1b97ef970304b53d2097845fd=1661414067,1661915601,1661934055; _ga=GA1.2.2019101383.1661414068; _ga_VPYRHN104D=GS1.1.1661934055.4.1.1661935687.0.0.0; swp_csrf_token=8e0eda53-3a32-4177-88ef-866fdef5b210; t_beda37=8f77b966dd598b7975672a7eaeecaf3b908466ebcbd4f339cc4bee00031d2190",
    "Referer": "https://arpara2021.feishu.cn/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "------WebKitFormBoundarysm259V2HSdyce8Ni\nContent-Disposition: form-data; name=\"file\"; filename=\"test-pure-md.md\"\nContent-Type: text/markdown\n\n# test\n\n- only english\n- no code\n\n------WebKitFormBoundarysm259V2HSdyce8Ni--\n",
  "method": "POST"
}).then(res => res.json())
  .then(console.log)