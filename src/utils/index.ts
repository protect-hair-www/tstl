/*
 * @Author: hzheyuan
 * @Date: 2022-03-05 09:50:29
 * @LastEditTime: 2022-04-10 19:12:35
 * @LastEditors: kalai
 * @Description:
 * @FilePath: /tstl/src/utils/index.ts
 */

// some helper functions
import { isPrimitive, createInstanceOf, getTypeOf } from './jstype'
import { copy } from './copy'
import { lg } from './math'
import { immCreator  } from './immuation'
import { isIterable } from './obj'

export { getTypeOf, isPrimitive, createInstanceOf, copy as jsCopy, lg, immCreator, isIterable }
