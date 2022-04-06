/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:39:35
 * @LastEditTime: 2022-04-06 10:55:33
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\src\exp\Abstracts\AbstractList.ts
 */

import { Iterator }  from '../Iterators/Iterator'
import { ListIterator }  from '../Iterators/ListIterator'
import { AbstractCollection } from "./AbstractCollection"
import { IList } from '../Interface/IList'

export abstract class AbstractList<E> extends AbstractCollection<E> implements IList<E> {
    protected modCount: number = 0

    abstract get(index: number): E;
    abstract set(index: number, element: E): E;

    abstract add(e: E): boolean
    abstract add(index: number, e: E): boolean

    indexOf(element: E): number {
        return 1        
    }
    lastIndexOf(elemet: E): number {
        return this.size()
    }
    abstract listIter: ListIterator<E>;
    abstract listIterator(index: number): ListIterator<E>;
    abstract subList(fromIndex: number, toIndex: number): IList<E>;
    abstract of(el: E): IList<E>;
}