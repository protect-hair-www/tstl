/*
 * @Author: hzheyuan
 * @Date: 2022-03-05 09:50:29
 * @LastEditTime: 2022-04-02 17:54:17
 * @LastEditors: hzheyuan
 * @Description:
 * @FilePath: \tstl\src\utils\index.ts
 */

// some helper functions
import { isPrimitive, createInstanceOf, getTypeOf } from './jstype'
import { copy } from './copy'
import { lg } from './math'
import { immCreator  } from './immuation'

export { getTypeOf, isPrimitive, createInstanceOf, copy as jsCopy, lg, immCreator }
