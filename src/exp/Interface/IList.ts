/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:24:07
 * @LastEditTime: 2022-04-10 20:29:47
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/exp/Interface/IList.ts
 */
import { ICollection } from './ICollection'

export interface IUnmodifiable<E> {
    of(el: E): IList<E> 
    copyOf(c: ICollection<E>): boolean
}

export interface IList<E> extends ICollection<E> {
    add(e: E): boolean
    add(index: number, e: E): void

    addAll(elements: Iterable<E>): boolean
    addAll(index: number, elements: Iterable<E>): boolean

    get(index: number): E
    indexOf(element: E): number
    lastIndexOf(elemet: E): number

    remove(e: E): boolean
    remove(index: number): E 
    remove(filter: (e: E)=> boolean): boolean


    set(index: number, element: E): E
    subList(fromIndex: number, toIndex: number): IList<E>
} 