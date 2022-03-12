/*
 * @Author: hzheyuan
 * @Date: 2022-03-12 19:51:03
 * @LastEditTime: 2022-03-12 19:51:03
 * @LastEditors: hzheyuan
 * @Description: compare
 * @FilePath: /tstl/src/utils/compare.ts
 */

export type CompFunType = (a, b) => boolean
export const lessComp: CompFunType = <T>(a: T, b: T): boolean => a < b
export const greaterComp: CompFunType = <T>(a: T, b: T): boolean => a > b

