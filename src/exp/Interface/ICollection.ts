/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:00:16
 * @LastEditTime: 2022-04-05 16:12:04
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/exp/Interface/ICollection.ts
 */
export interface ICollection<E> extends Iterable<E> {
    size(): number
    isEmpty(): boolean
    contains(e: E): boolean
    iterator: Iterator<E>
    add(e: E): boolean
    remove(index: number): boolean
    addAll(elements: Iterable<E>): boolean
    removeAll(): boolean
    removeIf(): boolean
    clear()
    hashCode(): number
    equals(e: E): boolean
}