
/*
 * @Author: hzheyuan
 * @Date: 2022-04-06 10:36:58
 * @LastEditTime: 2022-04-06 23:35:03
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/exp/LinkedList/index.ts
 */
import { AbstractSequentialList } from "../Abstracts/AbstractSequentialList";
import { IRandomAccess } from '../Interface/IRandomAccess'
import { ICloneable } from './../Interface/ICloneable';
import { IList } from './../Interface/IList';
import { Node } from './ListNode'
import { LinkedIterator }  from './Iterator'
import { LinkedListIterator }  from './ListIterator'

export class LinkedList<E> extends AbstractSequentialList<E> implements IList<E>, ICloneable, IRandomAccess {
    _size: number = 0
    _first: Node<E> | null = null
    _last: Node<E> | null = null

    public size(): number {
        return this._size
    }

    get first() {
        return this._first
    }

    get last() {
        return this._last
    }

    set first(n: Node<E> | null) {
        this._first = n
    }

    set last(n: Node<E> | null) {
        this._last = n
    }

    public cntr() {
        return this.first
    }

    public iterator(): LinkedIterator<E> {
        return new LinkedIterator(0, this);
    }

    public listIterator(index: number): LinkedListIterator<E> {
        return new LinkedListIterator(0, this);
    }

    _linkFirst(e: E): void {
        const f = this.first
        const newNode = new Node(null, e, f)
        this.first = newNode;

        if(f === null) {
            this.last = newNode
        } else {
            f.prev = newNode
        }
        this._size++
        this.modCount++
    }

    _linkLast(e: E): void {
        let l = this.last
        const newNode = new Node(l, e, null)
        this.last = newNode
        if(l === null) {
            this.first = newNode
        } else {
            l.next = newNode
        }
        this._size++
        this.modCount++
    }

    _linkBefore(e: E, succ: Node<E>) {
        const pred = succ.prev
        const newNode = new Node(pred, e, succ)
        succ.prev = newNode
        if(pred === null) this.first = newNode
        else pred.next = newNode
        this._size++
        this.modCount++
    }

    public getFirst() {
        const f = this.first
        if(f == null) return null
        else return f.value
    }

    public getLast() {
        const l = this.last
        if(l == null) return null
        else return l.value
    }

    public addFirst(e: E) {
        this._linkFirst(e)
    }

    add(e: E): boolean;
    add(index: number, e: E): boolean;
    add(...args: any[]): boolean {
        if(args.length === 1) {
            this._linkLast(args[0])
        } else {
            //todo check index
            let index = args[0], e = args[1]
            if(index === this.size()) this._linkLast(e)
            else this._linkBefore(e, this.node(index))
        }
        return true
    }

    addAll(eles: Iterable<E>): boolean;
    addAll(index: number, eles: Iterable<E>): boolean;
    addAll(...args: any[]): boolean {
        if(args.length === 1) {
            this._addAll(this.size(), args[0])
        } else {
            this._addAll(args[0], args[1])
        }
        return true
    }

    _addAll(index: number, eles: Iterable<E>) {
        let size = this.size()
        const arr = Array.from(eles)
        if(arr.length === 0) return false

        let pred: Node<E> | null, succ: Node<E> | null
        if(index === size) {succ = null; pred = this.last}
        else {succ = this.node(index); pred = succ?.prev}

        for (const e of arr) {
            const newNode = new Node(pred, e, null)
            if(pred === null) this.first = newNode
            else pred.next = newNode
            pred = newNode
        }

        if(succ === null) this.last = pred
        else {pred!.next = succ; succ.prev = pred}
        size += arr.length
        this.modCount++
        return true
    }

    remove(): boolean;
    remove(e: E): boolean;
    remove(index: number): boolean;
    remove(...args: any[]): boolean {
        let len = args.length
        if(len === 1 && typeof args[0] === 'number') {
            this._remove(args[0])
        }
        return true
    }

    _remove(index: number): void {
        
    }

    removeIf(): boolean {
        return true
    }

    removeAll(): boolean {
        return true
    }

    unlink(x: Node<E>) {

    }

    public node(index: number): Node<E> {
        let size = this.size()
        if(index < (size >> 1)) {
            let x = this.first
            for(let i = 0; i < index; i++) x = x!.next
            return x!
        } else {
            let x = this.last
            for(let i = size - 1; i > index; i--) x = x!.prev
            return x!
        }
    }

    public addLast(e: E) {
        this._linkLast(e) 
    }

    public contains(e: E): boolean {
        return this.indexOf(e) >= 0
    }

    indexOf(e: E): number {
        let index = 0
        for(let x = this.first; x !== null; x = x.next) {
            if(x.value === e) return index
            index++
        }
        return -1
    }

    public clear() {
        for(let x = this.first; x !== null;) {
            let next = x.next
            x.value = null, x.next = null, x.prev = null;
            x = next
        }
        this.first = this.last = null
        this._size = 0
        this.modCount++
    }

    hashCode(): number {
        return 0
    }

    equals(e: E): boolean {
        return false
    }

    of(el: E): IList<E> {
        return new LinkedList<E>()   
    }

    subList(fromIndex: number, toIndex: number): IList<E> {
        return new LinkedList<E>()   
    }
}