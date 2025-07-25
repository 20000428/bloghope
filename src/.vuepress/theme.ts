import { blog, hopeTheme } from 'vuepress-theme-hope';
import { enNavbar, zhNavbar } from './navbar/index.js';
import { enSidebar, zhSidebar } from './sidebar/index.js';
import { getDirname, path } from 'vuepress/utils';
// import { BlogPassword } from '../../__private/password.js'; //加密博客

const __dirname = getDirname(import.meta.url);

// const footerICP_HTML = `
// <a class="footer-icp" href="https://beian.miit.gov.cn" target="_blank">
//   <img src="//file.mo7.cc/static/img/beian.png">
//   陕ICP备2022011574号
// </a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="footer-about" href="/about/website.html">关于本站</a>
// `;//页脚的默认内容

// 没有备案呢
// const footerICP_HTML = `
// <a class="footer-icp" href="https://beian.miit.gov.cn" target="_blank">
//   <img src="//file.mo7.cc/static/img/beian.png">
//   陕ICP备2022011574号
// </a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="footer-about" href="/about/website.html ">关于本站</a>
// `;//页脚的默认内容
const footerICP_HTML = `
<a class="footer-icp" href="https://beian.miit.gov.cn" target="_blank">

</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="footer-about" href="/about/website.html ">关于本站</a>
`;//页脚的默认内容



export default hopeTheme({
  // pure: true,//纯净模式
  // logo: 'https://cdn.jsdelivr.net/gh/20000428/PictureBed/img/huge.png', // 设置网站左上角的图标
  hostname: 'https://blog.ysf.cc',
  author: {
    name: '叶随风',
    // url: 'https://mo7.cc',
    // email: 'mo7@mo7.cc',
    email: '504077806@qq.com',
  },
  darkmode: 'toggle',
  editLink: false,
  fullscreen: true,
  navbarAutoHide: 'always',
  pageInfo: [
    'Author',
    'Category',
    'Date',
    'Original',
    'Tag',
    'ReadingTime',
    'Word',
    'PageView',
    //..
  ],
  navbarLayout: {
    start: ['Brand'],
    center: [],
    end: ['Search', 'Links', 'Language', 'Outlook'],
  },

  // iconAssets: '//at.alicdn.com/t/c/font_3855310_agk3ojvaptw.css',
  iconAssets: '//at.alicdn.com/t/c/font_4631555_yqc168y1noc.css',  //图标 css 文件网络地址
  // logo: 'https://cdn.jsdelivr.net/gh/20000428/PictureBed//img/night.jpg',//左上角图标
  docsDir: 'src',
  blog: {
    name: '叶随风',
    // avatar: '//file.mo7.cc/static/lxh_gif/lxh_71.gif',
    avatar: 'https://cdn.jsdelivr.net/gh/20000428/PictureBed/img/huge.png',
    description: '专心致志做事，大气温和待人。',
    intro: 'https://blog.mo7.cc/about/me.html',
    medias: {
      // Email: 'mailto:mo7@mo7.cc',
      // GitHub: 'https://github.com/mo7cc',
      // Discord: 'https://discord.gg/8yXKxbSDDg',
      // Lark: 'https://www.larksuite.com/invitation/page/add_contact/?token=c8co337a-9dd7-4976-998f-5d2898o763r5&amp;unique_id=cgjGUk53Y2dh_FCZPuqY_A==',
      // WechatPay: 'https://file.mo7.cc/static/img/wx_proceeds.jpg',
      QQ: 'https://cdn.jsdelivr.net/gh/20000428/PictureBed//img/qq.jpg',
      Wechat: 'https://cdn.jsdelivr.net/gh/20000428/PictureBed//img/wx.jpg',
      // Zhihu: 'https://www.zhihu.com/people/meichangliang',
      BiliBili: 'https://space.bilibili.com/336654564',
      // Rss: 'https://blog.mo7.cc/atom.xml',
      CloudMusic: {
        link: 'https://music.163.com/#/my/m/music/playlist?id=2260977299',
        icon: 'http://p3.music.126.net/tBTNafgjNnTL1KlZMt7lVA==/18885211718935735.jpg'
    }
    },
  },

  footer: footerICP_HTML,
  locales: {
    '/': {
      navbar: zhNavbar,
      sidebar: zhSidebar,
      blog: {
        // name: '叶随风',
        description: '世间安得双全法',
        intro: '/about/me.html',
        timeline: '学无止境。',
      },
    },

    '/en/': {
      navbar: enNavbar,
      sidebar: enSidebar,
      blog: {
        name: 'LeafinWind',
        description: 'Simple and happy, as it should be.',
        intro: '/en/intro.html',
        timeline: 'Something wonderful is about to  happen.',
      },
    },
  },

  // 站点的加密功能
  encrypt: {
    config: {
      // '/en/demo/encrypt.html': [BlogPassword],
    },
  },

  // enable it to preview all changes in time
  hotReload: true,

  plugins: {
    blog: true,
    photoSwipe: false, // 这个插件难用的 一 B
    // watermark : true, //网站水印
  // 评论功能  
    comment: {
      provider: 'Waline',
      // serverURL: 'https://talk.mo7.cc',//评论地址
      // serverURL: 'https://waline-three-sooty.vercel.app',
      serverURL: 'https://comment.yesuifeng.cc/',
      noCopyright: true,
      reaction: true,
    },

  // 站点中使用的内置组件
    components: {
      // components: ['Badge', 'VPCard', 'BiliBili', 'PDF'],//内置组件
      // components: ['VPCard', 'Share'],//内置组件
      // components: ['VPCard','VidStack'],//内置组件
      components: ['VPCard'],//内置组件
    },

  // 版权功能禁用
    copyright: false,
  
  // 站点的订阅源（Feed）功能
    feed: {
      atom: true,
      json: true,
      rss: true,
      // image: '/pwa/72.png',
      // icon: '/pwa/512.png',
      image: '/pwa/huge.png',//讲道理这是干嘛的，我不知道
      icon: '/pwa/huge.png',//讲道理这是干嘛的，我不知道
    },

    searchPro: {
      // 索引全部内容
      indexContent: true,
      autoSuggestions: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter(page: any) {
            return page.frontmatter.category;
          },
          formatter: {
            '/': '分类：$content',
            '/en/': 'Category: $content',
          },
        },
        {
          getter(page: any) {
            return page.frontmatter.tag;
          },
          formatter: {
            '/': '标签：$content',
            '/en/': 'Tag: $content',
          },
        },
      ],
    },

    // Markdown 增强功能
    // These features are enabled for demo, only preserve features you need here
    mdEnhance: {
      // mermaid: true, // 启用 Mermaid.js 支持
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true, // 启用代码演示
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: {
        resolvePath: (file) => {
          if (file.startsWith('@src')) {
            return file.replace('@src', path.resolve(__dirname, '..'));
          }
          return file;
        },
      },
      mark: true,
      imgMark: true,
      stylize: [
        {
          matcher: 'Recommended',
          replacer: ({ tag }) => {
            if (tag === 'em')
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: 'Recommended',
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,
      breaks: true,
      linkify: true,
      alert: true,
      footnote: true,
      obsidianImgSize: true,
    },

    // install @vuepress/plugin-pwa and uncomment these if you want a PWA:
    // PWA（渐进式网页应用）是一种功能，它允许你的网站在支持的浏览器上提供类似原生应用的体验
    // 离线访问;提升性能;推送通知;添加到主屏幕
    pwa: {
      // update: 'force',//没什么用啊，不生效
      // update: 'hint',
      // https://theme-hope.vuejs.press/zh/guide/advanced/pwa.html#%E5%A4%A7%E5%B0%8F%E6%8E%A7%E5%88%B6
      // favicon: '/favicon.ico',//图标
      favicon: '/huge.ico',
      cacheHTML: true,
      cacheImage: true,
      appendBase: true,
      apple: {
        icon: '/pwa/huge.png',
        statusBarColor: 'black',
      },
      msTile: {
        image: '/pwa/huge.png',
        color: '#000',
      },
      manifest: {
        icons: [
          {
            src: '/pwa/huge.png',
            sizes: '512x512',
            purpose: 'maskable',
            type: 'image/png',
          },
          {
            src: '/pwa/huge.png',
            sizes: '192x192',
            purpose: 'maskable',
            type: 'image/png',
          },
          {
            src: '/pwa/huge.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa/huge.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
        shortcuts: [
          {
            name: '胡歌',
            short_name: '胡歌',
            url: '/',
            icons: [
              {
                src: '/pwa/huge.png',
                sizes: '192x192',
                purpose: 'maskable',
                type: 'image/png',
              },
            ],
          },
        ],
      },
    },

    //by yesuifeng 失败下载插件失败了
    // 'meting',
    // {
    //    // 这个 API 是不可用的，只是作为示例而已
    //    metingApi: 'https://meting.example.com/api/',
    //    meting: {
    //       server: 'netease',
    //       type: 'playlist',
    //       mid: '6838211960',
    //    }, // 不配置该项的话不会出现全局播放器
    //    aplayer: {
    //       lrcType: 3,
    //    },
    //    defaultCover: 'https://nyakku.moe/avatar.jpg',
    // },
  },
});
