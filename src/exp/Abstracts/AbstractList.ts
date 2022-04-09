/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:39:35
 * @LastEditTime: 2022-04-09 12:47:01
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/exp/Abstracts/AbstractList.ts
 */
import { AbstractCollection } from "./AbstractCollection"
import { IList } from '../Interface/IList'
import type { IteratorTypes, ListIteratorTypes } from '../Iterators/type'
import { ICollection } from "../Interface/ICollection"
import { BaseIterator } from '../Iterators/IBaseIterator';
import { IListIterator } from '../Iterators/IListIterator';

class Itr<E> implements BaseIterator<E> {
    cursor: number = 0
    lastRet: number = -1
    // expectedModCount: number
    _cotr: AbstractList<E>

    constructor(cotr: AbstractList<E>, index = 0) {
        this._cotr = cotr
    }

    public hasNext(): boolean {
        return this.cursor === this._cotr.size()
    }

    public next(): IteratorResult<E> {
        try {
            if (this.hasNext()) {
                let i = this.cursor
                let next: E = this._cotr.get(i);
                this.lastRet = i
                this.cursor = i + 1
                return { done: false, value: next }
            } else {
                return { done: true, value: null }
            }
        } catch (error) {
            throw new Error('NoSuchElementException')
        }
    }

    public remove(): void {
        try {
            this._cotr.remove(this.lastRet)
            if (this.lastRet < this.cursor) this.cursor--
            this.lastRet = -1
        } catch (error) {
            throw new Error('NoSuchElementException')
        }
    }
}

class ListItr<E> extends Itr<E> implements IListIterator<E> {
    _cotr: AbstractList<E>
    constructor(cotr: AbstractList<E>, index = 0) {
        super(cotr, index)
        this._cotr = cotr
    }

    public hasPrevious(): boolean {
        return this.cursor !== 0
    }

    public previous(): IteratorResult<E> {
        try {
            if (this.hasPrevious()) {
                let i = this.cursor - 1
                let pre = this._cotr.get(i)
                this.lastRet = this.cursor = i
                return { done: false, value: pre }
            } else {
                return { done: true, value: null }
            }
        } catch (error) {
            throw new Error('NoSuchElementException')
        }
    }

    nextIndex(): number {
        return this.cursor
    }

    previousIndex(): number {
        return this.cursor - 1
    }

    set(e: E): void {
        if(this.lastRet < 0) throw new Error('IllegalStateException')
        try {
            this._cotr.set(this.lastRet, e)
        } catch (error) {
            throw new Error('ConcurrentModificationException')
        }
    }

    add(e: E): void {
        try {
            let i = this.cursor
            this._cotr.add(i, e)
            this.lastRet = -1
            this.cursor = i + 1
        } catch (error) {
            throw new Error('ConcurrentModificationException')
        }
    }
}

export abstract class AbstractList<E> extends AbstractCollection<E> implements IList<E> {
    protected modCount: number = 0

    abstract get(index: number): E;
    abstract set(index: number, element: E): E;

    public isEmpty(): boolean {
        return this.size() === 0
    }

    add(e: E): boolean;
    add(index: number, e: E): boolean;
    add(...args: any[]): boolean {
        this.add(this.size(), args[0])
        return true
    }

    private rangeCheckForAdd(index: number) {
        if (index < 0 || index > this.size())
            throw new Error('Index out of bounds exception')
    }

    addAll(eles: Iterable<E>): boolean;
    addAll(index: number, eles: Iterable<E>): boolean;
    addAll(...args: any[]): boolean {
        const len = args.length
        if (len === 2) {
            let index = args[0], eles = args[1]
            this.rangeCheckForAdd(index)
            let modifed = false
            for (let e of eles) {
                this.add(index++, e)
                modifed = true
            }
            return modifed
        }
        return false
    }

    indexOf(e: E): number {
        const iter = this.listIterator(0)
        while (iter.hasNext()) {
            if (e === iter.next().value) return iter.previousIndex()
        }
        return -1
    }

    lastIndexOf(e: E): number {
        const iter = this.listIterator(this.size())
        while (iter.hasPrevious()) {
            if (e === iter.previous().value) return iter.nextIndex()
        }
        return -1
    }

    public contains(e: E): boolean {
        const iter = this.iterator()
        while (iter.hasNext()) {
            if (e === iter.next().value) {
                return true
            }
        }
        return false;
    }

    public containsAll(eles: Iterable<E>) {
        for (const val of eles) {
            if (!this.contains(val)) return false
        }
        return true
    }

    remove(): E;
    remove(e: E): boolean;
    remove(index: number): E;
    remove(...args: any[]): boolean | E {
        throw new Error('UnsupportedOperationException');
    }

    public clear() {
        this.removeRange(0, this.size());
    }

    protected removeRange(fromIdx: number, toIdx: number) {
        const iter = this.listIterator(fromIdx), n = toIdx - fromIdx;
        for (let i = 0; i < n; i++) {
            iter.next(); iter.remove();
        }
    }

    public iterator(): BaseIterator<E> {
        return new Itr<E>(this)
    }

    public listIterator(index: number): IListIterator<E> {
        return new ListItr(this, index)
    }

    abstract copyOf(c: ICollection<E>): boolean;
    abstract subList(fromIndex: number, toIndex: number): IList<E>;
    abstract of(el: E): IList<E>;
}