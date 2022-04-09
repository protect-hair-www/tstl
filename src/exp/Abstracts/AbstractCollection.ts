/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:09:58
 * @LastEditTime: 2022-04-09 13:06:47
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/exp/Abstracts/AbstractCollection.ts
 */
import { ICollection } from '../Interface/ICollection'
import{ BaseIterator } from '../Iterators/IBaseIterator'

export abstract class AbstractCollection<E> implements ICollection<E> {
    public abstract size(): number;
    public abstract iterator(): BaseIterator<E>;

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

    toArray(): E[] {
        return []
    }

    abstract add(e: E):boolean
    abstract add(index: number, e: E):boolean

    addAll(eles: Iterable<E>): boolean {
        let modified = false
        for(let val of eles) {
            if(this.add(val)) modified = true
        }
        return modified
    }

    abstract remove(): E;
    abstract remove(e: E): boolean;
    abstract remove(index: number): E;
    abstract removeIf(): boolean;

    public removeAll(c: ICollection<E>): boolean {
        let modified = false
        let iter = this.iterator()
        while(iter.hasNext()) {
            if(c.contains(iter.next().value)) {
                iter.remove(); modified = true
            }
        }
        return modified
    }

    public clear() {
        let iter = this.iterator()
        while(iter.hasNext()) {
            iter.next()
            iter.remove()
        }
    }

    retainAll(c: ICollection<E>): boolean {
        let modified = false
        let iter = this.iterator()
        while(iter.hasNext()) {
            if(!c.contains(iter.next().value)) {
                iter.remove(); modified = true
            }
        }
        return modified
    }

    spliterator() {
        
    }

    abstract hashCode(): number;
    abstract equals(e: E): boolean;
    [Symbol.iterator]
}