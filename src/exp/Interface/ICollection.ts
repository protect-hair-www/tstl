/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:00:16
 * @LastEditTime: 2022-04-09 12:54:58
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/exp/Interface/ICollection.ts
 */
import type { IteratorTypes, ListIteratorTypes } from '../Iterators/type'
import { BaseIterator } from '../Iterators/IBaseIterator'
export interface ICollection<E> extends Iterable<E> {
    size(): number
    isEmpty(): boolean

    contains(e: E): boolean
    containsAll(eles: Iterable<E>)
    iterator(): BaseIterator<E>

    add(e: E): boolean
    add(index: number, e: E): boolean
    addAll(elements: Iterable<E>): boolean

    clear(): void

    equals(e: E): boolean
    hashCode(): number


    remove(): E
    remove(e: E): boolean
    remove(index: number): E
    removeIf(): boolean
    removeAll(c: ICollection<E>): boolean

    retainAll(c: ICollection<E>): boolean

    spliterator()
    toArray(): E[]
}