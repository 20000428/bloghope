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
  // base: '/',
  base: '/bloghopedist/',
  temp: '.vscode/.vp-temp',
  cache: '.vscode/.vp-cache',

  locales: {
    '/': {
      lang: 'zh-CN',// 设置正在使用的语言
      title: '叶随风',
      description: '叶随风 - 简单快乐，理应如此。',
    },
    '/en/': {
      lang: 'en-US',
      title: 'LeafinWind',
      description: 'LeafinWind - Simple and happy, as it should be.',
    },
  },

  theme,
  // Enable it with pwa
  shouldPrefetch: false,
});
