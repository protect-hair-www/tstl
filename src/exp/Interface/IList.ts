/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:24:07
 * @LastEditTime: 2022-04-05 15:41:00
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/exp/Interface/IList.ts
 */
import { ICollection } from './ICollection'

export interface IList<E> extends ICollection<E>  {
    get(index: number): E
    set(index: number, element: E): E
    addAt(index: number, element: E): void
    indexOf(element: E): number
    lastIndexOf(elemet: E): number
    subList(fromIndex: number, toIndex: number): IList<E>
    of(el: E): IList<E> 
}