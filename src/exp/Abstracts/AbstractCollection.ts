/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:09:58
 * @LastEditTime: 2022-04-08 18:13:43
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: \tstl\src\exp\Abstracts\AbstractCollection.ts
 */
import { ICollection } from '../Interface/ICollection'
import type { IteratorTypes, ListIteratorTypes } from '../Iterators/type'

export abstract class AbstractCollection<E> implements ICollection<E> {
    public abstract size(): number;
    public abstract iterator(): IteratorTypes<E>;

    public isEmpty(): boolean {
        return this.size() === 0
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

    abstract add(e: E):boolean
    abstract add(index: number, e: E):boolean

    abstract remove(): E;
    abstract remove(e: E): boolean;
    abstract remove(index: number): E;
    abstract removeIf(): boolean;

    abstract clear();

    addAll(eles: Iterable<E>): boolean {
        let modified = false
        for(let val of eles) {
            if(this.add(val)) modified = true
        }
        return modified
    }

    // abstract addAll(index: number, elements: Iterable<E>): boolean
    abstract removeAll(): boolean;
    abstract hashCode(): number;
    abstract equals(e: E): boolean;
    [Symbol.iterator]
}