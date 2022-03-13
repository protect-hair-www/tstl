/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 17:37:19
 * @LastEditTime: 2022-03-13 18:07:49
 * @LastEditors: hzheyuan
 * @Description: compares
 * @FilePath: /tstl/src/fanctor/relational.ts
 */
export type CompFunType = (a, b) => boolean
export const less: CompFunType = <T>(a: T, b: T): boolean => a < b
export const greater: CompFunType = <T>(a: T, b: T): boolean => a > b
export const no_equal: CompFunType = <T>(a: T, b: T): boolean => a !== b
export const greater_equal: CompFunType = <T>(a: T, b: T): boolean => a >= b
export const less_equal: CompFunType = <T>(a: T, b: T): boolean => a <= b
