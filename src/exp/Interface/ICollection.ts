/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:00:16
 * @LastEditTime: 2022-04-06 10:45:27
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\src\exp\Interface\ICollection.ts
 */
import { Iterator }  from '../Iterators/Iterator'
export interface ICollection<E> extends Iterable<E> {
    size(): number
    isEmpty(): boolean
    contains(e: E): boolean
    iterator: Iterator<E>

    add(e: E): boolean
    add(index: number, e: E): boolean
    addAll(elements: Iterable<E>): boolean

    remove(index: number): boolean
    removeIf(): boolean
    removeAll(): boolean

    clear()
    hashCode(): number
    equals(e: E): boolean
}