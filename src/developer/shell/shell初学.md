---
title: shell初学
order: 1 #目录顺序？
date: 2024-08-07
permalink: /developer/shell/begin.html
---


终端，外表看起来就只是一个窗口，上面可以键入字符，当你输入特定字符的时候它会打印出一些反馈。这个字符一般就是[Shell 命令](https://www.runoob.com/linux/linux-shell.html)。
MacOS 现在默认的 shell 解释器是 [Zsh](https://www.duidaima.com/Group/Topic/OtherTools/17940);
Linux 上的一般默认为 [Bash](https://zh.wikipedia.org/wiki/Bash);
Windows 下默认为 [PowerShell](https://zh.wikipedia.org/wiki/PowerShell);

::: tip 相关阅读

[安装并开始设置 Windows 终端](https://learn.microsoft.com/zh-cn/windows/terminal/install)

[macOS 终端使用手册](https://support.apple.com/zh-cn/guide/terminal/welcome/mac)

[80 个常用 shell 命令及简单用法](https://blog.csdn.net/WQY867047910/article/details/134788517)

:::

## 资料
(https://itsfoss.com/view-file-contents/)
(https://linux.cn/article-16104-1.html)
[Bash编程脚本入门](https://linux.cn/article-16120-1.html)
<!-- more -->
## 常用命令
```bash
#查看主目录中的目录
ls

#更改目录
cd #某目录目录(文件夹)
```



## 基础技巧
[19个基础技巧](https://itsfoss.com/basic-terminal-tips-ubuntu/#8-getting-help)

```bash
# 寻求帮助
command_name -h
command_name -help
```
**Ctrl+C 用于停止命令或进程**
Ctrl+Shift+C,Ctrl+Shift+V用于复制粘贴

**一次运行多个命令**
| 命令 | 用法 | 运行顺序 |
| --------- | ---- | ---- |
| `;` | 命令1;命令2 | 首先运行命令1,然后运行命令2 |
| `&&` | 命令 1 和 & 命令2 | 仅当命令1成功结束时才运行命令2 |
| ... | ... | ... |

 `||`  →  命令1||命令2 &#x2192; 仅当命令1失败时才运行命令2 

**清理终端**
```bash
clear
#或者Ctrl+L终端快捷键
```
**目录**
- .（单点）表示当前目录
- ..（两个点）表示父目录，将您置于当前目录之上一个目录
- ~ 表示主目录
- -表示上一个目录
```bash

```

