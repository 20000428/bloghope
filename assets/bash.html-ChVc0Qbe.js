import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,d as a,f as i,o as l}from"./app-B99pLi-m.js";const n={},t=i('<div class="hint-container tip"><p class="hint-container-title">相关阅读</p></div><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><p><a href="https://wangdoc.com/bash/intro" target="_blank" rel="noopener noreferrer">001-Bash脚本教程</a></p>',3),h=i(`<p>ctrl + u查看网站代码，查看网页前端代码F12</p><h2 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法"><span>基本语法</span></a></h2><p><a href="https://wangdoc.com/bash/grammar" target="_blank" rel="noopener noreferrer">基本语法</a></p><h3 id="参数" tabindex="-1"><a class="header-anchor" href="#参数"><span>参数</span></a></h3><ul><li>-n<br> 默认情况下，echo输出的文本末尾会有一个回车符。-n参数可以取消末尾的回车符，使得下一个提示符紧跟在输出内容的后面。</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> b</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">a</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">b</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> echo</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> b</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ab</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>-e<br> -e参数会解释引号（双引号和单引号）里面的特殊字符（比如换行符\\n）。如果不使用-e参数，即默认情况下，引号会让特殊字符变成普通字符，echo不解释它们，原样输出。</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Hello\\nWorld&quot;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Hello\\nWorld</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 双引号的情况</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> echo</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -e</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Hello\\nWorld&quot;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Hello</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">World</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 单引号的情况</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> echo</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -e</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;Hello\\nWorld&#39;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Hello</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">World</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="快捷键" tabindex="-1"><a class="header-anchor" href="#快捷键"><span>快捷键</span></a></h3><ul><li><code>Ctrl + L</code>：清除屏幕并将当前行移到页面顶部。</li><li><code>Ctrl + C</code>：中止当前正在执行的命令。</li><li><code>Shift + PageUp</code>：向上滚动。</li><li><code>Shift + PageDown</code>：向下滚动。</li><li><code>Ctrl + U</code>：从光标位置删除到行首。</li><li><code>Ctrl + K</code>：从光标位置删除到行尾。</li><li><code>Ctrl + W</code>：删除光标位置前一个单词。</li><li><code>Ctrl + D</code>：关闭 Shell 会话。</li><li><code>↑，↓</code>：浏览已执行命令的历史记录。</li><li><code>Tab</code>: 自动补全代码。</li></ul><h2 id="模式扩展" tabindex="-1"><a class="header-anchor" href="#模式扩展"><span>模式扩展</span></a></h2><p>这里内容很多，就不誊写了<br><a href="https://wangdoc.com/bash/expansion" target="_blank" rel="noopener noreferrer">模式扩展</a></p><h2 id="引号和转义" tabindex="-1"><a class="header-anchor" href="#引号和转义"><span>引号和转义</span></a></h2><p>转义字符和here文档</p>`,14);function r(p,d){return l(),e("div",null,[t,a(" more "),h])}const k=s(n,[["render",r],["__file","bash.html.vue"]]),m=JSON.parse('{"path":"/developer/shell/bash.html","title":"bash脚本","lang":"zh-CN","frontmatter":{"title":"bash脚本","order":1,"date":"2024-08-13T00:00:00.000Z","permalink":"/developer/shell/bash.html","description":"相关阅读 资料 001-Bash脚本教程","head":[["meta",{"property":"og:url","content":"https://blog.ysf.cc/developer/shell/bash.html"}],["meta",{"property":"og:site_name","content":"LeafinWind"}],["meta",{"property":"og:title","content":"bash脚本"}],["meta",{"property":"og:description","content":"相关阅读 资料 001-Bash脚本教程"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-08T05:30:58.000Z"}],["meta",{"property":"article:author","content":"叶随风"}],["meta",{"property":"article:published_time","content":"2024-08-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-08T05:30:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"bash脚本\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-08-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-11-08T05:30:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"叶随风\\",\\"email\\":\\"504077806@qq.com\\"}]}"],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://blog.ysf.cc/atom.xml","title":"LeafinWind Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://blog.ysf.cc/feed.json","title":"LeafinWind JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://blog.ysf.cc/rss.xml","title":"LeafinWind RSS Feed"}]]},"headers":[{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]},{"level":2,"title":"基本语法","slug":"基本语法","link":"#基本语法","children":[{"level":3,"title":"参数","slug":"参数","link":"#参数","children":[]},{"level":3,"title":"快捷键","slug":"快捷键","link":"#快捷键","children":[]}]},{"level":2,"title":"模式扩展","slug":"模式扩展","link":"#模式扩展","children":[]},{"level":2,"title":"引号和转义","slug":"引号和转义","link":"#引号和转义","children":[]}],"git":{"createdTime":1723529410000,"updatedTime":1731043858000,"contributors":[{"name":"xuuub66","email":"504077806@qq.com","commits":3}]},"readingTime":{"minutes":1.22,"words":365},"filePathRelative":"developer/shell/Bash脚本学习.md","localizedDate":"2024年8月13日","excerpt":"<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">相关阅读</p>\\n</div>\\n<h2>资料</h2>\\n<p><a href=\\"https://wangdoc.com/bash/intro\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">001-Bash脚本教程</a></p>\\n","autoDesc":true}');export{k as comp,m as data};