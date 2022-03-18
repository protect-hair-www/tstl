/*
 * @Author: hzheyuan
 * @Date: 2022-03-18 17:10:13
 * @LastEditTime: 2022-03-18 17:16:17
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\src\Iterator\comparable.ts
 */
export interface Comparable<T> {
    equals?(itr: T): boolean;
    lesss?(itr: T): boolean;
    greater?(itr: T): boolean;
}