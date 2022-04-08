/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:39:35
 * @LastEditTime: 2022-04-08 18:11:51
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: \tstl\src\exp\Abstracts\AbstractList.ts
 */
import { AbstractCollection } from "./AbstractCollection"
import { IList } from '../Interface/IList'
import type { IteratorTypes, ListIteratorTypes } from '../Iterators/type'
import { ICollection } from "../Interface/ICollection"

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

    addAll(eles: Iterable<E>): boolean;
    addAll(index: number, eles: Iterable<E>): boolean;
    addAll(...args: any[]): boolean {
        return true        
    }

    indexOf(element: E): number {
        return 1        
    }

    lastIndexOf(elemet: E): number {
        return this.size()
    }

    public contains(e: E): boolean {
        const iter = this.iterator()
        while(iter.hasNext()) {
            if(e === iter.next().value) {
                return true
            }
        }
        return false;
    }

    public containsAll(eles: Iterable<E>) {
        for (const val of eles) {
            if(!this.contains(val)) return false
        }
        return true
    }

    // remove()
    // remove(index: number): E {
    //     throw new Error('UnsupportedOperationException'); 
    // }

    remove(): E;
    remove(e: E): boolean;
    remove(index: number): E;
    remove(index?: any): boolean | E {
        throw new Error('UnsupportedOperationException'); 
    }

    abstract iterator(): IteratorTypes<E>;
    abstract listIterator(index: number): ListIteratorTypes<E>;
    abstract copyOf(c: ICollection<E>): boolean;
    abstract subList(fromIndex: number, toIndex: number): IList<E>;
    abstract of(el: E): IList<E>;
}