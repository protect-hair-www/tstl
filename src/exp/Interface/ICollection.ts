/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:00:16
 * @LastEditTime: 2022-04-08 17:43:25
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: \tstl\src\exp\Interface\ICollection.ts
 */
import type { IteratorTypes, ListIteratorTypes } from '../Iterators/type'
export interface ICollection<E> extends Iterable<E> {
    add(e: E): boolean
    add(index: number, e: E): boolean
    addAll(elements: Iterable<E>): boolean

    clear(): void
    contains(e: E): boolean
    // containsAll(eles: Iterable<E>)

    equals(e: E): boolean
    hashCode(): number
    isEmpty(): boolean

    iterator(): IteratorTypes<E>

    remove(): E
    remove(e: E): boolean
    remove(index: number): E
    removeIf(): boolean
    removeAll(c: ICollection<E>): boolean

    // retainAll(c: ICollection<E>): boolean
    size(): number

    // spliterator()
    // toArray(): E[]
}