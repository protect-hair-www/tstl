/*
 * @Author: hzheyuan
 * @Date: 2022-03-19 16:13:38
 * @LastEditTime: 2022-03-19 16:13:38
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/iterator/utils.ts
 */
type TypeName<T> = T extends string 
? 'string'
: T extends number
? 'number'
: T extends boolean
? 'boolean'
: T extends undefined
? 'undefined'
: T extends Function
? 'function'
: 'object'

