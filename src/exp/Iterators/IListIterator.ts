/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 18:05:46
 * @LastEditTime: 2022-04-10 16:09:27
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/exp/Iterators/IListIterator.ts
 */
import { IBaseIterator } from './IBaseIterator'
export interface IListIterator<E> extends IBaseIterator<E> {
    hasPrevious(): boolean
    nextIndex(): number
    previousIndex(): number
    previous(): IteratorResult<E>
    remove(): void
    set(e: E): void
    add(e: E): void
}