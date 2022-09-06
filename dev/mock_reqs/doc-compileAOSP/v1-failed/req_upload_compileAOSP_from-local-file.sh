#!/usr/bin/env bash
# ref: https://stackoverflow.com/a/6409028/9422455
curl -i \
  -H "Content-Type: text/markdown" \
  -H "Host: internal-api-drive-stream.feishu.cn" \
  -H "sec-ch-ua: \"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"" \
  -H "DNT: 1" \
  -H "X-TT-LOGID: 02166236122486300000000000000000000ffff3a65a882c7968d" \
  -H "sec-ch-ua-mobile: ?0" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36" -H "Content-Type: multipart/form-data; boundary=----WebKitFormBoundary8gOXf8R1qwQ2O3OQ" \
  -H "Accept: application/json, text/plain, */*" \
  -H "X-Command: space.api.box.stream.upload.all" \
  -H "X-CSRFToken: b3df94bc90756e88b55358d1a0743f4b2db8aa2f-1660577290" \
  -H "X-Request-Id: mciSmix1RTj1SizJ6WtxEOvSkieK1vBX" \
  -H "sec-ch-ua-platform: \"macOS\"" \
  -H "Origin: https://arpara2021.feishu.cn" \
  -H "Sec-Fetch-Site: same-site" \
  -H "Sec-Fetch-Mode: cors" \
  -H "Sec-Fetch-Dest: empty" \
  -H "Referer: https://arpara2021.feishu.cn/" \
  -H "Accept-Language: zh-CN,zh;q=0.9" \
  -H "Cookie: __tea__ug__uid=7726921644210065470; passport_web_did=7119081216476790812; QXV0aHpDb250ZXh0=de828c7a154c4b459fff162ff71af910; locale=zh-CN; trust_browser_id=6921f6f6-4f03-4ab5-90b5-f58437f33f61; session=XN0YXJ0-876g4fd4-2b84-43ef-bb31-71faf553fa83-WVuZA; session_list=XN0YXJ0-876g4fd4-2b84-43ef-bb31-71faf553fa83-WVuZA; is_anonymous_session=; lang=zh; _csrf_token=b3df94bc90756e88b55358d1a0743f4b2db8aa2f-1660577290; MONITOR_WEB_ID=7085189359086878748; help_center_session=23855b8b-32c5-4c9b-839b-b47e88279b8c; _uuid_hera_ab_path_1=7135719079014301697; Hm_lvt_e78c0cb1b97ef970304b53d2097845fd=1661414067,1661915601,1661934055; _ga=GA1.2.2019101383.1661414068; _ga_VPYRHN104D=GS1.1.1661934055.4.1.1661935687.0.0.0; swp_csrf_token=ed52d383-f0e2-4fc5-84a8-f3922a4e8eed; t_beda37=1d34f15176d573fd9e152f34d72d61d7ee6b31666474683b77b76bdefd1f100c" \
  --data-binary "@/Users/mark/my-learning/my-website/my-documents/my-private-documents/arpara/docs/AF1020/compile/index.md" \
  --compressed "https://internal-api-drive-stream.feishu.cn/space/api/box/stream/upload/all/?name=index.md&size=3141&checksum=424657017&mount_node_token=wikcnhKiTGCVdgWqMmfJn7y1Xqh&mount_point=wiki&push_open_history_record=0&ext%5Bextra%5D=&size_checker=true"
