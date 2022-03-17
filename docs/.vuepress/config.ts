/*
 * @Author: hzheyuan
 * @Date: 2022-03-17 14:43:46
 * @LastEditTime: 2022-03-17 16:23:00
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\docs\.vuepress\config.ts
 */
module.exports = {
  // 站点配置
  lang: 'zh-CN',
  title: 'TSTL(Typescript STL)',
  description: 'TSTL: Add C++ STL to Javascript',

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    // logo: 'https://vuejs.org/images/logo.png',
    // navbar: [
    //   {
    //     text: 'Foo',
    //     link: '/guide/index.md',
    //   },
    //   '/guid/index.md',
    // ],
  },
  head: [['link', { rel: 'icon', href: 'https://vuejs.org/images/logo.png' }]],
}