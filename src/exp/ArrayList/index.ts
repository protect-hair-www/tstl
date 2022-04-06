/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:38:26
 * @LastEditTime: 2022-04-06 23:24:17
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/exp/ArrayList/index.ts
 */
import { AbstractList }  from '../Abstracts/AbstractList'
import { IList }  from '../Interface/IList'
import { IRandomAccess } from '../Interface/IRandomAccess'
import { ICloneable } from './../Interface/ICloneable';
import { Iterator }  from './Iterator'
import { ListIterator }  from './ListIterator'
import type { IteratorTypes, ListIteratorTypes } from '../Iterators/type'

export class ArrayList<E> extends AbstractList<E> implements IList<E>, IRandomAccess, ICloneable {
    private _size: number = 0
    private _cntr: E[] = []

    constructor() {
        super()
    }

    public iterator(): IteratorTypes<E> { 
        return new Iterator(0, this);
    }

    public listIterator(index: number): ListIteratorTypes<E> {
        return new ListIterator<E>(index, this)
    }

    public size(): number {
        return this._cntr.length
    }

    public cntr() {
        return this._cntr
    }

    public isEmpty(): boolean {
        return this._size === 0
    }

    public contains(e: E): boolean {
        return this.indexOf(e) >= 0
    }

    public indexOf(e: E): number {
        return this.indexOfRange(e, 0, this.size())
    }

    private indexOfRange(e: E, start: number, end: number) {
        for(let i = start; i < end; ++i) {
            if(e === this._cntr[i]) return i
        }
        return -1
    }

    private checkIndex(index: number): boolean {
        return true
    }

    public get(index: number): E {
        this.checkIndex(index)
        return this._cntr[index]
    }

    public set(index: number, e: E): E {
        this.checkIndex(index)
        let oldE = this._cntr[index]
        this._cntr[index] = e
        return oldE;
    }

    private _add(e: E) {
        this.modCount++
        this._cntr.push(e)
    }

    private _addAt(index: number, e: E): boolean {
        this.modCount++
        this._cntr.splice(index, 0, e)
        return true
    }

    public add(...args: any[]): boolean {
        if(args.length === 1) {
            this._add(args[0])
        } else {
            this._addAt(args[0], args[1])
        }
        return true
    }    

    // public addAll(elements: Iterable<E>): boolean {
    //     this._cntr = this._cntr.concat(...elements)
    //     return true
    // }
    addAll(elements: Iterable<E>): boolean;
    addAll(index: number, elements: Iterable<E>): boolean;
    addAll(...args: any[]): boolean {
        if(args.length === 1) {
            let eles = args[0]
            this._cntr = this._cntr.concat(...eles)
        } else {

        }
        return true
    }

    
    remove(): boolean;
    remove(e: E): boolean;
    remove(index: number): boolean;
    remove(index?: any): boolean {
        if(index) {
            this._remove(index)
        }        
        return true
    }

    private _remove(index: number): boolean {
        this.checkIndex(index)
        this.modCount++
        this._cntr.splice(index, 1)
        return true
    }

    public removeIf(): boolean {
        return true;
    }

    public removeAll(): boolean {
        return true
    }

    public clear() {
        this.modCount++
        this._cntr.length = 0
    }

    subList(fromIndex: number, toIndex: number): IList<E> {
        return new ArrayList()
    }

    equals(e: E): boolean {
        return false
    }

    lastIndexOf(elemet: E): number {
        return 1
    }

    hashCode(): number {
        return 1
    }

    of(el: E): IList<E> {
        return new ArrayList()
    }
    
    [Symbol.iterator];
}