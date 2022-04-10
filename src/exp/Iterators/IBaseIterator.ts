/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 18:14:22
 * @LastEditTime: 2022-04-10 16:09:15
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/exp/Iterators/IBaseIterator.ts
 */
export interface IBaseIterator<E> extends Iterator<E> {
    hasNext(): boolean
    remove(): void
}