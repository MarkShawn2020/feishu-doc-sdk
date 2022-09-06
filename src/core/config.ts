export const host = 'https://arpara2021.feishu.cn'

export const spaceInfo = {
  mountNodeToken: "wikcnhKiTGCVdgWqMmfJn7y1Xqh",
  space_id: "7063717144780898305",
  synergy_uuid: "1668563142042",
  urlDelDoc: `${host}/space/api/wiki/v2/tree/del_node/`,
  urlListDocs:
    `${host}/space/api/wiki/v2/tree/get_node_child/`,
  docToken_QVR: "wikcnhKiTGCVdgWqMmfJn7y1Xqh",
};

export const headersBase = {
  "x-csrftoken": "b3df94bc90756e88b55358d1a0743f4b2db8aa2f-1660577290",
  cookie:
    "__tea__ug__uid=7726921644210065470; passport_web_did=7119081216476790812; QXV0aHpDb250ZXh0=de828c7a154c4b459fff162ff71af910; locale=zh-CN; trust_browser_id=6921f6f6-4f03-4ab5-90b5-f58437f33f61; session=XN0YXJ0-876g4fd4-2b84-43ef-bb31-71faf553fa83-WVuZA; session_list=XN0YXJ0-876g4fd4-2b84-43ef-bb31-71faf553fa83-WVuZA; is_anonymous_session=; lang=zh; _csrf_token=b3df94bc90756e88b55358d1a0743f4b2db8aa2f-1660577290; MONITOR_WEB_ID=7085189359086878748; help_center_session=23855b8b-32c5-4c9b-839b-b47e88279b8c; _uuid_hera_ab_path_1=7135719079014301697; Hm_lvt_e78c0cb1b97ef970304b53d2097845fd=1661414067,1661915601,1661934055; _ga=GA1.2.2019101383.1661414068; _ga_VPYRHN104D=GS1.1.1661934055.4.1.1661935687.0.0.0; swp_csrf_token=8e0eda53-3a32-4177-88ef-866fdef5b210; t_beda37=8f77b966dd598b7975672a7eaeecaf3b908466ebcbd4f339cc4bee00031d2190",
  Referer: "https://arpara2021.feishu.cn/",
};

export const headersAddDoc = {
  ...headersBase,
  "content-type": `multipart/form-data; boundary=----WebKitFormBoundaryYI6bB8rQx1FsItMR`,
};

export const headersDelDoc = {
  ...headersBase,
  "content-type": "application/json",
};
