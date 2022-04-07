/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 18:05:46
 * @LastEditTime: 2022-04-06 22:37:29
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/exp/Iterators/IListIterator.ts
 */
import { BaseIterator } from './IBaseIterator'
export interface IListIterator<E> extends BaseIterator<E> {
    hasPrevious(): boolean
    nextIndex(): number
    previousIndex(): number
    remove(): void
    set(e: E): void
    add(e: E): void
}