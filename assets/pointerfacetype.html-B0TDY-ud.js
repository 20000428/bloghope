import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as l,a as e,f as i,o as s}from"./app-B99pLi-m.js";const n="/assets/image-26-ZGxAMlpo.png",r="/assets/image-23-CoTMEcLb.png",o="/assets/image-34-hdSQ2M0I.png",p="/assets/image-24-BXKGeA7x.png",c="/assets/image-25-BOTMkV3S.png",g="/assets/image-33-dVgsXAoe.png",m="/assets/image-28-YgNPHXBl.png",d="/assets/image-29-CiVhzq7k.png",S="/assets/image-35-DG_zc0v_.png",P="/assets/image-31-DF_NagMp.png",_="/assets/image-32-CuFBSNnz.png",h="/assets/image-36-DQT1oWX8.png",u="/assets/image-38-B__UM091.png",y="/assets/image-37-EyQr2NBo.png",A="/assets/image-39-D9ouKC7j.png",C={},b=e("h1",{id:"po接口类型",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#po接口类型"},[e("span",null,"PO接口类型")])],-1),O=e("p",null,"记录一下自己碰到过的PO接口类型及怎样配置与传输顺序。在其他东西已经由basis配置好的情况下。",-1),f=i('<h2 id="外部系统调用sap-rfc" tabindex="-1"><a class="header-anchor" href="#外部系统调用sap-rfc"><span>外部系统调用SAP-RFC</span></a></h2><ul><li>先在SAP写好RFC接口</li><li>PO-ESR(一般正式PO都是传输) <ul><li>在对应的软件组件里导入SAP的函数模块</li><li>我是一个命名空间一个接口，在软件组件下面创建命名空间</li><li>在命名空间下面分别创建SI(RFC Message),MM-REQ,MM-RES,OM(SI外部系统-&gt;SAP;MM;SAP函数接口)</li></ul></li><li>PO-ID(通道的参数有些需要正式和测试环境不同，可以修改或者传输) <ul><li>Business Compponent下外部系统CC-SOAP通道，Business System下SAP CC SOAP 接收通道(需要不同的接口创建人可以创建多个CC因为是使用账号验证的账号)</li><li>创建IC</li></ul></li><li>根据IC的WSDL，去测试软件SOAPUI测试(POSTMAN也可以比较麻烦，POST需要里面的地址)</li><li>编写开发说明书</li><li>传输时要先传SAP的函数请求，再传输PO-ESR导入的函数和其他的SI,MM,OM,然后是PO-ID:CC,IC<br><img src="'+n+'" alt="alt text" title="图片来源：https://blog.csdn.net/qq_44826887/article/details/134922069" loading="lazy"><br><img src="'+r+'" alt="alt text" loading="lazy"><br><img src="'+o+'" alt="alt text" loading="lazy"><br><img src="'+p+'" alt="alt text" loading="lazy"><br><img src="'+c+'" alt="alt text" loading="lazy"></li></ul><h2 id="sap调用外部系统-代理" tabindex="-1"><a class="header-anchor" href="#sap调用外部系统-代理"><span>SAP调用外部系统-代理</span></a></h2><ul><li><p>PO-ESR</p><ul><li>由外部系统提供WSDL(ED),ED导入PO</li><li>创建外部系统SI-IN，和SAP的SI-OUT(RFC Message使用上述ED里的方法)</li><li>分别创建MM-REQ,MM-RES,OM(SAP的SI-OUT;MM;外部系统SI-IN)</li></ul></li><li><p>PO-ID</p><ul><li>创建Business System下SAP CC:CC_SAP_PROXY_SEND</li><li>创建Business Compponent下外部系统 CC:CC_外部系统_SOAP_RECV</li><li>创建IC</li></ul></li><li><p>SAP</p><ul><li>在SAP事务代码SPROXY里ESR浏览器的SAP的SI-OUT生成代理</li><li>在函数模块或者增强里调用代理</li></ul></li><li><p>传输时要先传PO，再传输SAP</p><p><img src="'+g+'" alt="alt text" title="图片来源：https://blog.csdn.net/qq_44826887/article/details/135170299" loading="lazy"><br><img src="'+m+'" alt="alt text" loading="lazy"><br><img src="'+d+'" alt="alt text" loading="lazy"><br><img src="'+S+'" alt="alt text" loading="lazy"><br><img src="'+P+'" alt="alt text" loading="lazy"><br><img src="'+_+'" alt="alt text" loading="lazy"></p></li></ul><h2 id="外部系统调用sap-jdbc数据库处理" tabindex="-1"><a class="header-anchor" href="#外部系统调用sap-jdbc数据库处理"><span>外部系统调用SAP-JDBC数据库处理</span></a></h2><p>直接处理数据库，设置定时任务处理数据库数据库-&gt;SAP，再更新数据库数据</p><ul><li>PO-ESR <ul><li>根据交互字段创建Data Types</li><li>导入Data Types生成Message Types</li><li>创建外部系统SI-OUT，和SAP的SI-IN(使用上述Message Type)</li><li>分别创建MM-REQ,MM-RES(使用上述Message Type),OM(外部系统SI-OUT;MM;SAP的SI-IN)</li></ul></li><li>PO-ID <ul><li>创建Business System下SAP CC:CC_SAP_PROXY_RECV</li><li>创建Business Compponent下外部系统 CC:CC_外部系统_JDBC_SEND</li><li>创建IC</li></ul></li><li>SAP <ul><li>在SAP事务代码SPROXY里ESR浏览器的SAP的SI-IN生成代理</li><li>在函数模块或者增强里调用代理</li></ul></li><li>传输时要先传PO，再传输SAP<br><img src="'+h+'" alt="alt text" loading="lazy"><br><img src="'+u+'" alt="alt text" loading="lazy"><br><img src="'+y+'" alt="alt text" loading="lazy"><br><img src="'+A+'" alt="alt text" loading="lazy"></li></ul><h2 id="外部系统调用sap-aglie" tabindex="-1"><a class="header-anchor" href="#外部系统调用sap-aglie"><span>外部系统调用SAP-aglie</span></a></h2><p>其他和外部系统调用SAP-RFC差不多,用RFC作为接收的改用自己用ED(XML文档)生成的SAP_SI-IN,MM也用ED里的</p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献"><span>参考文献</span></a></h2><p><a href="https://blog.csdn.net/qq_44826887/article/details/134922069" target="_blank" rel="noopener noreferrer">PO 发布外围系统REST-＞SAP RFC同步接口-Seele_1018</a><br><a href="https://blog.csdn.net/qq_44826887/article/details/135170299" target="_blank" rel="noopener noreferrer">PO 发布SAP SProxy-＞外围系统 WebService-Seele_1018</a></p>',11);function M(x,I){return s(),a("div",null,[b,O,l(" more "),f])}const T=t(C,[["render",M],["__file","pointerfacetype.html.vue"]]),D=JSON.parse('{"path":"/sap/abap/pointerfacetype.html","title":"PO接口类型","lang":"zh-CN","frontmatter":{"order":17,"date":"2024-11-14T00:00:00.000Z","pageInfo":["Author","PageView"],"category":["SAP"],"tag":["ABAP","PO"],"permalink":"/sap/abap/pointerfacetype.html","description":"记录一下自己碰到过的PO接口类型及怎样配置与传输顺序。在其他东西已经由basis配置好的情况下。","head":[["meta",{"property":"og:url","content":"https://blog.ysf.cc/sap/abap/pointerfacetype.html"}],["meta",{"property":"og:site_name","content":"LeafinWind"}],["meta",{"property":"og:title","content":"PO接口类型"}],["meta",{"property":"og:description","content":"记录一下自己碰到过的PO接口类型及怎样配置与传输顺序。在其他东西已经由basis配置好的情况下。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-03T06:39:46.000Z"}],["meta",{"property":"article:author","content":"叶随风"}],["meta",{"property":"article:tag","content":"ABAP"}],["meta",{"property":"article:tag","content":"PO"}],["meta",{"property":"article:published_time","content":"2024-11-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-03T06:39:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PO接口类型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-11-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-03T06:39:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"叶随风\\",\\"email\\":\\"504077806@qq.com\\"}]}"],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://blog.ysf.cc/atom.xml","title":"LeafinWind Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://blog.ysf.cc/feed.json","title":"LeafinWind JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://blog.ysf.cc/rss.xml","title":"LeafinWind RSS Feed"}]]},"headers":[{"level":2,"title":"外部系统调用SAP-RFC","slug":"外部系统调用sap-rfc","link":"#外部系统调用sap-rfc","children":[]},{"level":2,"title":"SAP调用外部系统-代理","slug":"sap调用外部系统-代理","link":"#sap调用外部系统-代理","children":[]},{"level":2,"title":"外部系统调用SAP-JDBC数据库处理","slug":"外部系统调用sap-jdbc数据库处理","link":"#外部系统调用sap-jdbc数据库处理","children":[]},{"level":2,"title":"外部系统调用SAP-aglie","slug":"外部系统调用sap-aglie","link":"#外部系统调用sap-aglie","children":[]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]}],"git":{"createdTime":1731894750000,"updatedTime":1733207986000,"contributors":[{"name":"xuuub66","email":"504077806@qq.com","commits":2}]},"readingTime":{"minutes":2.68,"words":803},"filePathRelative":"sap/ABAP/17.PO接口类型.md","localizedDate":"2024年11月14日","excerpt":"\\n<p>记录一下自己碰到过的PO接口类型及怎样配置与传输顺序。在其他东西已经由basis配置好的情况下。</p>\\n","autoDesc":true}');export{T as comp,D as data};