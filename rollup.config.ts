/*
 * @Author: hzheyuan
 * @Date: 2022-03-17 09:55:21
 * @LastEditTime: 2022-03-17 15:19:48
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\rollup.config.ts
 */
import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
const path = require('path');

const mode = process.env.MODE;
const isProd = mode === 'prod';
const pkg = require('./package.json');

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      exports: 'named',
      format: 'cjs',
      sourcemap: !isProd
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: !isProd
    },
    {
      file: 'build/tstl.js',
      name: 'tstl',
      format: 'iife',
      sourcemap: !isProd
    },
  ],
  plugins: [
    // alias({
    //   entries: [
    //     { find: '@container', replacement: 'src/container/' },
    //     { find: '@algorithm', replacement: 'src/algorithm/' },
    //   ]
    // }),

    typescript({
      useTsconfigDeclarationDir: true,
      // tsconfigOverride: { compilerOptions: { sourceMap: true } }
    })
  ],
};
