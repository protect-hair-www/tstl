/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:09:58
 * @LastEditTime: 2022-04-10 17:43:20
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/exp/Abstracts/AbstractCollection.ts
 */
import { ICollection } from '../Interface/ICollection'
import{ IBaseIterator } from '../Iterators/'

export abstract class AbstractCollection<E> implements ICollection<E> {
    public abstract size(): number;
    public abstract iterator(): IBaseIterator<E>;

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

    addAll(eles: Iterable<E>): boolean {
        let modified = false
        for(let val of eles) {
            if(this.add(val)) modified = true
        }
        return modified
    }

    remove(e: E): boolean;
    remove(filter: (e: E) => boolean): boolean;
    remove(arg: any): boolean {
        const iter = this.iterator()
        while(iter.hasNext()) {
            const val = iter.next().value
            const condition = typeof arg === 'function' ? arg(val) : arg === iter.next().value
            if(condition) {
                iter.remove()
                return true
            }
        }
        return false
    } 

    removeIf(filter: (e: E) => boolean): boolean {
        const iter = this.iterator()
        while(iter.hasNext()) {
            const val = iter.next().value
            if(filter(val)) {
                iter.remove()
                return true
            }
        }
        return false       
    }

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

    spliterator() {}

    toArray(): E[] {
        const size = this.size()
        const r: E[] = new Array(size)
        const iter = this.iterator()
        for (let i = 0; i < size; i++) {
            if(iter.hasNext()) {
                r[i] = iter.next().value
            }
        }
        return r
    }

    // abstract hashCode(): number;
    // abstract equals(e: E): boolean;
    [Symbol.iterator]
}