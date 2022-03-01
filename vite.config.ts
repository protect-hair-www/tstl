/*
 * @Author: hzheyuan
 * @Date: 2022-03-01 11:17:06
 * @LastEditTime: 2022-03-01 15:37:23
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })

// 如果测试使用https可以在这里配置
// 默认为http
let certConfig: any = {};
try {
  certConfig = require('./cert.config');
} catch (err) { }

export default defineConfig(({ mode, command }) => {
  if (mode === 'demo') {
    return {
      build: {
        entry: path.resolve(__dirname, 'demo/main.js'),
        outDir: path.resolve(__dirname, 'build'),
      },
      plugins: [vue()],
      define: {
        'import.meta.env.VERSION': JSON.stringify(process.env.npm_package_version),
      },
      resolve: {
        alias: {
           '@': path.resolve(__dirname, './src'),
        }
      },
      server: {
        // port: 443, // https默认端口
        port: 3000,
        host: 'local.163.com',
        https: certConfig.httpsEnabled ? certConfig : false
      }
    }
  } else {
    return {
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: 'nano',
          fileName: (format) => `tstl.${format}.js`
        },
        rollupOptions: {
          external: ['vue', '@vue'] // 确保外部化处理那些你不想打包进库的依赖
        }
      },
      plugins: [vue()],
      resolve: {
        alias: {
           '@': path.resolve(__dirname, './src'),
        }
      },
      define: {
        'import.meta.env.VERSION': JSON.stringify(process.env.npm_package_version),
      },
      server: {
        // port: 443, // https默认端口
        port: 3000,
        host: 'local.163.com',
        https: certConfig.httpsEnabled ? certConfig : false
      }
    }
  }
})
