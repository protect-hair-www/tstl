/*
 * @Author: hzheyuan
 * @Date: 2022-03-11 15:30:24
 * @LastEditTime: 2022-04-10 19:11:44
 * @LastEditors: kalai
 * @Description:
 * @FilePath: /tstl/src/utils/obj.ts
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

/**
 * @description: check the obj is iterable
 * @param {*} obj
 * @return {boolean}
 */
export function isIterable(obj) {
  if (obj == null) { return false }
  return typeof obj[Symbol.iterator] === 'function';
}