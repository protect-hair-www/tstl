/*
 * @Author: hzheyuan
 * @Date: 2022-03-05 09:50:29
 * @LastEditTime: 2022-04-01 09:51:48
 * @LastEditors: hzheyuan
 * @Description:
 * @FilePath: \tstl\src\utils\index.ts
 */

// some helper functions
import { isPrimitive, createInstanceOf, getTypeOf } from './jstype'
import { copy } from './copy'
import { lg } from './math'
import { produce } from './proxy'

export { getTypeOf, isPrimitive, createInstanceOf, copy as jsCopy, lg, produce }
