#!/bin/bash
#初始化推送master分支
git init
git add .
git commit -m "Init"
git remote add origin https://gitee.com/xxxxxxx/myblog-demo.git
git remote -v #查看当前关联的远程仓库，如果已经有了一个origin，那么你可以通过
#git remote rm origin来移除它
git push -u origin "master"
#之后更改可以用，强制推送到远程master分支
git push origin master --force


