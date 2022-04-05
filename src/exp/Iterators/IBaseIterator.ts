/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 18:14:22
 * @LastEditTime: 2022-04-05 18:44:08
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/exp/Iterators/IBaseIterator.ts
 */
export interface BaseIterator<E> extends Iterator<E> {
    hasNext(): boolean
    remove(): void
}