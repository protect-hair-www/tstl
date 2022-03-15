/*
 * @Author: hzheyuan
 * @Date: 2022-03-11 15:30:24
 * @LastEditTime: 2022-03-11 15:31:33
 * @LastEditors: hzheyuan
 * @Description:
 * @FilePath: \tstl\src\utils\obj.ts
 */

/**
 * @description: return property of a object
 * @param {T} obj
 * @param {K} key
 * @return {*}
 */
export function getObjProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
