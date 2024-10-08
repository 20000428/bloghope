import { defineUserConfig } from 'vuepress';
import theme from './theme.js';
import { getDirname, path } from 'vuepress/utils';
const __dirname = getDirname(import.meta.url);
const SrcPath = path.resolve(__dirname, '../');

export default defineUserConfig({
  alias: {
    '@components': path.resolve(__dirname, 'components'),
    '@src': SrcPath,
  },

  dest: 'dist',
  host: '0.0.0.0',
  port: 9451,
  base: '/',
  // base: '/bloghopedist/',
  // base: '/bloghope/',
  // base: '/gh-pages/',
  temp: '.vscode/.vp-temp',
  cache: '.vscode/.vp-cache',

  locales: {
    '/': {
      lang: 'zh-CN',// 设置正在使用的语言
      title: 'LeafinWind',
      description: '叶随风2 - 简单快乐1，理应如此。',
    },
    '/en/': {   //暂时不维护英语版本
      lang: 'en-US',
      title: 'LeafinWind',
      description: 'LeafinWind - Simple and happy, as it should be.',
    },
  },

  theme,
  // Enable it with pwa
  shouldPrefetch: false,
});
