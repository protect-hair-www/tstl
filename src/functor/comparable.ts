/*
 * @Author: hzheyuan
 * @Date: 2022-03-20 11:21:40
 * @LastEditTime: 2022-03-20 11:22:48
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/functor/comparable.ts
 */

export interface Comparable<T> {
    equals(t: T): boolean;
    less(t: T): boolean;
}