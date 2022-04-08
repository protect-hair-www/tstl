/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:24:07
 * @LastEditTime: 2022-04-08 17:46:32
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: \tstl\src\exp\Interface\IList.ts
 */
import { ICollection } from './ICollection'
export interface IList<E> extends Omit<ICollection<E>, 'add' | 'addAll'> {
    add(e: E): boolean
    add(index: number, e: E): void
    addAll(elements: Iterable<E>): boolean
    addAll(index: number, elements: Iterable<E>): boolean

    copyOf(c: ICollection<E>): boolean

    get(index: number): E
    indexOf(element: E): number
    lastIndexOf(elemet: E): number

    of(el: E): IList<E> 

    set(index: number, element: E): E
    subList(fromIndex: number, toIndex: number): IList<E>
}