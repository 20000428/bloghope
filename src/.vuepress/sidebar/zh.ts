import { sidebar } from 'vuepress-theme-hope';

const back_posts = {
  text: '返回总目录',
  icon: 'sort',
  link: '/posts/',
};

const back_developer = {
  text: '返回Developer',
  icon: 'developer',
  link: '/developer/',
};

const back_tutorial = {
  text: '返回教程',
  icon: 'bookone',
  link: '/tutorial/',
};

const back_tools = {
  text: '返回工具',
  icon: 'gongju',
  link: '/tools/',
};

const back_sap = {
  text: '返回sap',
  icon: '',
  link: '/sap/',
};

const back_abap = {
  text: '返回abap',
  icon: '',
  link: '/sap/abap/',
};

export const zhSidebar = sidebar({
  // 关于
  '/about/': [
    back_posts,
    {
      text: '关于',
      icon: 'info',
      link: '/about/',
      children: 'structure',
    },
  ],
    // go
    '/go/': [
      back_posts,
      {
        text: 'go',
        icon: 'go',
        link: '/go/',
        children: 'structure',
      },
    ],

        // shell
        '/shell/': [
          back_posts,
          {
            text: 'shell',
            icon: 'shell',
            link: '/shell/',
            children: 'structure',
          },
        ],
  // // 工具
  // '/tools/': [
  //   back_posts,
  //   {
  //     text: '工具',
  //     icon: 'gongju',
  //     link: '/tools/',
  //     children: 'structure',
  //   },
  // ],
  // '/tools/git/': [
  //   back_tools,
  //   {
  //     text: 'Git',
  //     icon: 'git',
  //     link: '/tools/git/',
  //     children: 'structure',
  //   },
  // ],
  // '/tools/vscode/': [
  //   back_tools,
  //   {
  //     text: 'Visual Studio Code',
  //     icon: 'vscode',
  //     link: '/tools/vscode/',
  //     children: 'structure',
  //   },
  // ],
  // // 小技巧
  // '/tips/': [
  //   back_posts,
  //   {
  //     text: '技巧',
  //     icon: 'tips',
  //     link: '/tips/',
  //     children: 'structure',
  //   },
  // ],
  // // 开发者
  // '/developer/': [
  //   back_posts,
  //   {
  //     text: '开发者',
  //     icon: 'developer',
  //     link: '/developer/',
  //     children: 'structure',
  //   },
  // ],
  // '/developer/basic/': [
  //   back_developer,
  //   {
  //     text: '基础',
  //     icon: 'basic',
  //     link: '/developer/basic/',
  //     children: 'structure',
  //   },
  // ],
  // '/developer/linux/': [
  //   back_developer,
  //   {
  //     text: 'Linux',
  //     icon: 'linux',
  //     link: '/developer/linux/',
  //     children: 'structure',
  //   },
  // ],

  // '/developer/front_end_web/': [
  //   back_developer,
  //   {
  //     text: 'Web前端',
  //     icon: 'HTML',
  //     link: '/developer/front_end_web/',
  //     children: 'structure',
  //   },
  // ],
  // '/developer/golang/': [
  //   back_developer,
  //   {
  //     text: 'Go',
  //     icon: 'goicon',
  //     link: '/developer/golang/',
  //     children: 'structure',
  //   },
  // ],
  // 开发者
  '/developer/': [
    back_posts,
    {
      text: '开发者',
      icon: 'developer',
      link: '/developer/',
      children: 'structure',
    },
  ],
   '/developer/shell/': [
    back_developer,
    {
      text: 'Shell',
      icon: 'shell',
      link: '/developer/shell/',
      children: 'structure',
    },
  ],
  '/developer/golang/': [
    back_developer,
    {
      text: 'Go',
      icon: 'goicon',
      link: '/developer/golang/',
      children: 'structure',
    },
  ],

  // // leetcode
  // '/leetcode/': [
  //   back_developer,
  //   {
  //     text: 'LeetCode',
  //     icon: 'leetcode',
  //     link: '/leetcode/',
  //     children: 'structure',
  //   },
  // ],

  // // 教程
  // '/tutorial/': [
  //   back_posts,
  //   {
  //     text: '教程',
  //     icon: 'bookone',
  //     link: '/tutorial/',
  //     children: 'structure',
  //   },
  // ],
  // '/tutorial/vuepress-hope/': [
  //   back_tutorial,
  //   {
  //     text: '本博客搭建指南',
  //     icon: 'boke',
  //     link: '/tutorial/vuepress-hope/',
  //     children: 'structure',
  //   },
  // ],
  // 收藏
  '/favorite/': [
    back_posts,
    // {
    //   text: '影视',
    //   icon: 'movie',
    //   link: '/favorite/movies/',
    //   prefix: 'movies/',
    //   children: 'structure',
    // },
    // {
    //   text: '音乐',
    //   icon: 'music',
    //   children: 'structure',
    //   prefix: 'music/',
    //   link: '/favorite/music/',
    // },
    // {
    //   text: '相册',
    //   icon: 'xiangce',
    //   children: 'structure',
    //   prefix: 'photos/',
    //   link: '/favorite/photos/',
    // },
    // {
    //   text: '随笔',
    //   icon: 'ganwu',
    //   children: 'structure',
    //   prefix: 'essays/',
    //   link: '/favorite/essays/',
    // },
    {
      text: '日程',
      icon: '',
      children: 'structure',
      prefix: 'schedule.html/',
      link: '/favorite/schedule.html',
    },
    {
      text: '博客',
      icon: 'blog',
      children: 'structure',
      prefix: 'blog/',
      link: '/favorite/blog/',
    },
    {
      text: '链接',
      icon: 'link',
      children: 'structure',
      prefix: 'links/',
      link: '/favorite/links/',
    },
  ],

  // sap
  '/sap/': [
    back_posts,
    {
      text: 'SAP',
      icon: '',
      link: '/sap/',
      // prefix: '/sap/abap/',
      children: 'structure',
    },
  ],


  '/informalessay/': [
    back_posts,
    {
      text: '随笔',
      icon: '',
      link: '/informalessay/',
      // prefix: '/sap/abap/',
      children: 'structure',
    },
  ],
    // // sap/abap
    // '/sap/abap/': [
    //   back_sap,
    //   {
    //     text: '知识学习',
    //     icon: '',
    //     link: '/sap/abap/study/',
    //     // prefix: 'abap/study/',
    //     children: 'structure',
    //   },
    // ],
    
  // 整体路由划分
  '/': [
    '',
    {
      text: '博文',
      icon: 'note',
      prefix: 'posts/',
      link: '/posts/',
      children: 'structure',
    },
    {
      text: '开发者',
      // icon: 'developer',
      prefix: 'developer/',
      link: '/developer/',
      children: 'structure',
    },
    {
      text: 'SAP',
      icon: '',
      prefix: 'sap/',
      link: '/sap/',
      children: 'structure',
    },

    {
      text: '随笔',
      icon: '',
      prefix: 'informalessay/',
      link: '/informalessay/',
      children: 'structure',
    },

    {
      text: '收藏',
      // icon: 'favoritea',
      prefix: 'favorite/',
      link: '/favorite/',
      children: 'structure',
    },

    // {
    //   text: '教程',
    //   icon: 'bookone',
    //   prefix: 'tutorial/',
    //   link: '/tutorial/',
    //   children: 'structure',
    // },

    // {
    //   text: '工具',
    //   icon: 'gongju',
    //   prefix: 'tools/',
    //   link: '/tools/',
    //   children: 'structure',
    // },

    // {
    //   text: '技巧分享',
    //   icon: 'tips',
    //   prefix: 'tips/',
    //   link: '/tips/',
    //   children: 'structure',
    // },

    // {
    //   text: 'LeetCode',
    //   icon: 'leetcode',
    //   prefix: 'leetcode/',
    //   link: '/leetcode/',
    //   children: 'structure',
    // },

    {
      text: '关于',
      // icon: 'info',
      prefix: 'about/',
      link: '/about/',
      children: 'structure',
    },
  ],
});
