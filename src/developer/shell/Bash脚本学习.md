---
title: bash脚本
order: 1 #目录顺序？
date: 2024-08-13
permalink: /developer/shell/bash.html
---


::: tip 相关阅读


:::

## 资料
[001-Bash脚本教程](https://wangdoc.com/bash/intro)
<!-- more -->
ctrl + u查看网站代码，查看网页前端代码F12
## 基本语法
[基本语法](https://wangdoc.com/bash/grammar)
### 参数
- -n
默认情况下，echo输出的文本末尾会有一个回车符。-n参数可以取消末尾的回车符，使得下一个提示符紧跟在输出内容的后面。
```bash
$ echo a;echo b
a
b

$ echo -n a;echo b
ab
```

- -e
-e参数会解释引号（双引号和单引号）里面的特殊字符（比如换行符\n）。如果不使用-e参数，即默认情况下，引号会让特殊字符变成普通字符，echo不解释它们，原样输出。
```bash
$ echo "Hello\nWorld"
Hello\nWorld

# 双引号的情况
$ echo -e "Hello\nWorld"
Hello
World

# 单引号的情况
$ echo -e 'Hello\nWorld'
Hello
World
```

### 快捷键
- `Ctrl + L`：清除屏幕并将当前行移到页面顶部。
- `Ctrl + C`：中止当前正在执行的命令。
- `Shift + PageUp`：向上滚动。
- `Shift + PageDown`：向下滚动。
- `Ctrl + U`：从光标位置删除到行首。
- `Ctrl + K`：从光标位置删除到行尾。
- `Ctrl + W`：删除光标位置前一个单词。
- `Ctrl + D`：关闭 Shell 会话。
- `↑，↓`：浏览已执行命令的历史记录。
- `Tab`: 自动补全代码。

## 模式扩展
这里内容很多，就不誊写了
[模式扩展](https://wangdoc.com/bash/expansion)

## 引号和转义
转义字符和here文档