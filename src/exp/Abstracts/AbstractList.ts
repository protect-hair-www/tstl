/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:39:35
 * @LastEditTime: 2022-04-06 23:30:05
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/exp/Abstracts/AbstractList.ts
 */
import { AbstractCollection } from "./AbstractCollection"
import { IList } from '../Interface/IList'
import type { IteratorTypes, ListIteratorTypes } from '../Iterators/type'

export abstract class AbstractList<E> extends AbstractCollection<E> implements IList<E> {
    protected modCount: number = 0

    abstract get(index: number): E;
    abstract set(index: number, element: E): E;

    add(e: E): boolean;
    add(index: number, e: E): boolean;
    add(index: any, e?: any): boolean {
       this.add(this.size(), e) 
       return true
    }

    indexOf(element: E): number {
        return 1        
    }
    lastIndexOf(elemet: E): number {
        return this.size()
    }

    abstract iterator(): IteratorTypes<E>;
    abstract listIterator(index: number): ListIteratorTypes<E>;

    abstract subList(fromIndex: number, toIndex: number): IList<E>;
    abstract of(el: E): IList<E>;
}