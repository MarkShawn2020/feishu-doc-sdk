curl -H "Host: internal-api-drive-stream.feishu.cn" -H "Pragma: no-cache" -H "Cache-Control: no-cache" -H "sec-ch-ua: \"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"" -H "DNT: 1" -H "X-TT-LOGID: 02166237269223300000000000000000000ffff53c7d2309319a8" -H "sec-ch-ua-mobile: ?0" -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36" -H "Content-Type: multipart/form-data; boundary=----WebKitFormBoundary4bWAz9NNcr0mVpBG" -H "Accept: application/json, text/plain, */*" -H "X-Command: space.api.box.stream.upload.all" -H "X-CSRFToken: b3df94bc90756e88b55358d1a0743f4b2db8aa2f-1660577290" -H "X-Request-Id: imdN8SUL8P16EMS1PuFm6E2ejsdq4ZjY" -H "sec-ch-ua-platform: \"macOS\"" -H "Origin: https://arpara2021.feishu.cn" -H "Sec-Fetch-Site: same-site" -H "Sec-Fetch-Mode: cors" -H "Sec-Fetch-Dest: empty" -H "Referer: https://arpara2021.feishu.cn/" -H "Accept-Language: zh-CN,zh;q=0.9" -H "Cookie: __tea__ug__uid=7726921644210065470; passport_web_did=7119081216476790812; QXV0aHpDb250ZXh0=de828c7a154c4b459fff162ff71af910; locale=zh-CN; trust_browser_id=6921f6f6-4f03-4ab5-90b5-f58437f33f61; session=XN0YXJ0-876g4fd4-2b84-43ef-bb31-71faf553fa83-WVuZA; session_list=XN0YXJ0-876g4fd4-2b84-43ef-bb31-71faf553fa83-WVuZA; is_anonymous_session=; lang=zh; _csrf_token=b3df94bc90756e88b55358d1a0743f4b2db8aa2f-1660577290; MONITOR_WEB_ID=7085189359086878748; help_center_session=23855b8b-32c5-4c9b-839b-b47e88279b8c; _uuid_hera_ab_path_1=7135719079014301697; Hm_lvt_e78c0cb1b97ef970304b53d2097845fd=1661414067,1661915601,1661934055; _ga=GA1.2.2019101383.1661414068; _ga_VPYRHN104D=GS1.1.1661934055.4.1.1661935687.0.0.0; swp_csrf_token=8e0eda53-3a32-4177-88ef-866fdef5b210; t_beda37=8f77b966dd598b7975672a7eaeecaf3b908466ebcbd4f339cc4bee00031d2190" --data-binary $'------WebKitFormBoundary4bWAz9NNcr0mVpBG
Content-Disposition: form-data; name=\"file\"; filename=\"compile.md\"
Content-Type: text/markdown

# compile AOSP

## AOSP build efficiency

### AOSP build time vs CPU core count (up to 56)

![picture 2](.imgs/index-1662120498285-f75b258a3a0a22bbd6aac59b6e7ed65c0018f70600680d9b209e138868b6458b.png)

ref:

- [AOSP build time vs CPU core count (up to 56)](https://groups.google.com/g/android-building/c/Q76dYAhwrkA)

## how to speed up AOSP building

### TODO: 1. using `CCACHE`

```sh
# solution 1
USE_CCACHE=true CCACHE_EXEC=/usr/bin/ccache COMMAND

# solution 2
# build/core/ccache.mk
```

see the discussion on whether to use `CCACHE`: https://groups.google.com/g/android-building/c/EI-w1WX-e90/m/wnaJ8IXfDQAJ
![picture 1](.imgs/index-1662103609140-177fa4e1be90623764fa295e3677ca085a9ff22be10a977a87581a9285e3a4d0.png)

refs:
- [android source - How to use ccache to speed up compiling of aosp? - Stack Overflow](https://stackoverflow.com/questions/59811821/how-to-use-ccache-to-speed-up-compiling-of-aosp)

- [android source - How to use ccache to speed up compiling of aosp? - Stack Overflow](https://stackoverflow.com/questions/59811821/how-to-use-ccache-to-speed-up-compiling-of-aosp)

- [ccache.mk - Android Code Search](https://cs.android.com/android/platform/superproject/+/android10-release:build/make/core/ccache.mk;l=17)

- [Android Q默认不使用ccache编译，以及修改方法_傻熙Ta爸的博客-CSDN博客](https://blog.csdn.net/zhangqi6627/article/details/107762572)

### TODO: 2. using `ramdisk` for `/tmp`

- [performance - Speeding up Android (AOSP) build time - Stack Overflow](https://stackoverflow.com/questions/25790732/speeding-up-android-aosp-build-time)

- [Speeding up AOSP Builds – System Temp Directory | Chris Piekarski](https://cpiekarski.com/2013/01/02/speeding-up-aosp-builds/)

- [Ubuntu using Ramdisk for better performance and fast response - Ubuntu Sharing](http://ubuntuguide.net/ubuntu-using-ramdisk-for-better-performance-and-fast-response)

- [How to Create and Use a Ramdisk on Ubuntu 18.04](https://linuxhint.com/ramdisk_ubuntu_1804/)

- [How to Check the Size of /TMP in Linux](https://linuxhint.com/check-size-tmp-linux/)

### TODO: 3. adding `swp`

- [Optimize the Usage of Swap to Speed up Response for Ubuntu - Ubuntu Sharing](http://ubuntuguide.net/optimize-the-usage-of-swap-to-speed-up-response-for-ubuntu)

### 4. increase threads as many as possible

```sh
# N is the max threads, e.g. 88 in our server
./build.sh dist -j N
```

## utilize AOSP building

### SSD不够

解决办法：

可以考虑将 `out` 软链接到外部机械盘。

注意要点：

1. 软链接时要用绝对路径

副作用：

可能最终会编译不过（进度80+时，-j88一个半小时后）。

相关记录：

`$CROOT/logs/build_09-02T12:29.log` 就是使用 out 软链接进行编译，最后报错的，当时out的对象是 `$MY-OUT-SLOW/out_0902_with_grp_failed//`（注意多了个`/`）。

接着重新链接到 `$MY-OUT-SLOW/out_0902_wo_extra_slash/`，继续编译，log文件为`$CROOT/logs/build_09-02T16:08.log`

参考：

- [Android高版本P/Q/R源码编译指南_IT先森的博客-CSDN博客_android p编译](https://blog.csdn.net/tkwxty/article/details/111684291)

------WebKitFormBoundary4bWAz9NNcr0mVpBG--
' --compressed "https://internal-api-drive-stream.feishu.cn/space/api/box/stream/upload/all/?name=compile.md&size=3141&checksum=424657017&mount_node_token=wikcnhKiTGCVdgWqMmfJn7y1Xqh&mount_point=wiki&push_open_history_record=0&ext%5Bextra%5D=&size_checker=true"