
/*
 * @Author: hzheyuan
 * @Date: 2022-04-06 10:36:58
 * @LastEditTime: 2022-04-08 23:32:03
 * @LastEditors: kalai
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
import { ICollection } from "../Interface/ICollection";

export class LinkedList<E> extends AbstractSequentialList<E> implements IList<E>, ICloneable, IRandomAccess {
    _size: number = 0
    _first: Node<E> | null = null
    _last: Node<E> | null = null

    public size(): number {
        return this._size
    }

    /**
     * @description Access the first node
     * @return {Node}
     */    
    get first() {
        return this._first
    }

    /**
     * @description Access the last node 
     * @return {Node}
     */    
    get last() {
        return this._last
    }

    set first(n: Node<E> | null) {
        this._first = n
    }

    set last(n: Node<E> | null) {
        this._last = n
    }

    /**
     * @description 
     * @param {*}
     * @return {*}
     */    
    public cntr() {
        return this.first
    }

    public iterator(): LinkedIterator<E> {
        return new LinkedIterator(0, this);
    }

    public listIterator(index: number = 0): LinkedListIterator<E> {
        this.checkPositionIndex(index)
        return new LinkedListIterator(index, this);
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

    /**
     * @description Unlinks non-null first node f.
     * @param {Node} f
     * @return {E}
     */    
    _unlinkFirst(f: Node<E>): E {
        let v = f.value, next = f.next
        f.value = null
        f.next = null
        this.first = next
        if(next === null) this.last = null
        else next.prev = null
        this._size--
        this.modCount++
        return v!
    }

    /**
     * @description Unlinks non-null last node f.
     * @param {Node} f
     * @return {E}
     */    
    _unlinkLast(l: Node<E>) {
        let v = l.value, prev = l.prev
        l.value = null
        l.next = null
        this.last = prev
        if(prev === null) this.first = null
        else prev.next = null
        this._size--
        this.modCount++
        return v!
    }

    // public get(index: number): E {
    //     this.checkElementIndex(index)
    //     return this.node(index).value
    // }

    public getFirst() {
        const f = this.first
        if(f == null) {
            throw new Error('the list is empty')
        }
        else return f.value
    }

    public getLast() {
        const l = this.last
        if(l == null) {
            throw new Error('the list is empty')
        } 
        else return l.value
    }

    private isElementIndex(index: number) {
        return index >= 0 && index < this.size()
    }

    private isPositionIndex(index: number) {
        return index >= 0 && index <= this.size()
    }

    private checkPositionIndex(index) {
        if(!this.isPositionIndex(index))
            throw new Error('index out of bound');
    }

    private checkElementIndex(index: number) {
        if(!this.isElementIndex(index)) 
            throw new Error('index out of bound');
    }

    public add(e: E): boolean;
    public add(index: number, e: E): boolean;
    public add(...args: any[]): boolean {
        if(args.length === 1) {
            this._linkLast(args[0])
        } else {
            let index = args[0], e = args[1]
            this.checkPositionIndex(index);
            if(index === this.size()) this._linkLast(e)
            else this._linkBefore(e, this.node(index))
        }
        return true
    }

    public addFirst(e: E) {
        this._linkFirst(e)
    }

    public addLast(e: E) {
        this._linkLast(e) 
    }

    public addAll(eles: Iterable<E>): boolean;
    public addAll(index: number, eles: Iterable<E>): boolean;
    public addAll(...args: any[]): boolean {
        if(args.length === 1) {
            this._addAll(this.size(), args[0])
        } else {
            this._addAll(args[0], args[1])
        }
        return true
    }

    private _addAll(index: number, eles: Iterable<E>) {
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
        this._size += arr.length
        this.modCount++
        return true
    }

    public remove(): E;
    public remove(e: E): boolean;
    public remove(index: number): E;
    public remove(...args: any[]): boolean | E {
        let len = args.length
        if(len === 0) return this.removeFisrt()
        else {
            if(typeof args[0] === 'number') {
                return this._removeOfIndex(args[0])
            }
            return this._removeByEle(args[0])
        }
    }

    private _removeOfIndex(index: number): E {
        this.checkElementIndex(index)
        return this.unlink(this.node(index))
    }

    private _removeByEle(e: E) {
        for(let x = this.first; x !== null; x = x.next) {
            if(e === x.value) {this.unlink(x); return true}
        }
        return false
    }

    /**
     * removeFisrt
     */
    public removeFisrt(): E {
        const f = this.first;
        if(f === null) throw new Error('no such element exception')
        return this._unlinkFirst(f)
    }

    public removeLast(): E {
        const l = this.last;
        if(l === null) throw new Error('no such element exception')
        return this._unlinkLast(l)
    }

    public removeFirstOccurrence(e: E): boolean {
        return this.remove(e)
    }

    public removeLastOccurrence(e: E): boolean {
        for(let x = this.last; x !== null; x = x.prev) {
            if(e === x.value) { this.unlink(x); return true;}
        }
        return false;
    }

    public removeIf(): boolean {
        return true
    }

    public removeAll(): boolean {
        return true
    }

    unlink(x: Node<E>): E {
        let e = x.value, next = x.next, prev = x.prev;
        if(prev === null) this.first = null
        else {prev.next = next; x.prev = null}

        if(next === null) this.last = prev
        else { next.prev = prev; x.next = null }

        x.value = null
        this._size--
        this.modCount++
        return e!;
    }

    /**
     * @description Returns {@code true} if this list contains the specified element.
     * @param {E} e e element whose presence in this list is to be tested
     * @return {boolean} {@code true} if this list contains the specified element
     */    
    public contains(e: E): boolean {
        return this.indexOf(e) >= 0
    }

    public indexOf(e: E): number {
        let index = 0
        for(let x = this.first; x !== null; x = x.next) {
            if(x.value === e) return index
            index++
        }
        return -1
    }

    public lastIndexOf(e: E): number {
        let index = this.size()
        for(let x = this.last; x !== null; x = x.prev) {
            index--
            if(e == x.value) return index;
        }
        return -1;
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

    // Queue operations

    public element(): E | null {
        return this.getFirst()
    }

    /**
     * @description Retrieves, but does not remove, the head (first element) of this list.
     * 
     * @return the head of this list, or {@code null} if this list is empty
     */    
    public peek(): E | null {
        return this.first === null ? null : this.first.value
    }

    public poll(): E | null {
        let f = this.first
        return f === null ? null : this._unlinkFirst(f);
    }

    public offer(e: E): boolean {
        return this.add(e);
    }

    public offerFirst(e: E): boolean {
        this.addFirst(e)
        return true
    }

    /**
     * offerLast
     */
    public offerLast(e: E): boolean {
        this.addLast(e) 
        return true
    }

    /**
     * peekFirst
     */
    public peekFirst(): E | null {
        return this.first === null ? null : this.first.value 
    }

    public peekLast(): E | null {
        return this.last === null ? null : this.last.value 
    }

    /**
     * pollFirst
     */
    public pollFirst(): E | null {
        const f = this.first 
        return f === null ? null : this._unlinkFirst(f)
    }

    /**
     * pollLast
     */
    public pollLast() {
        const l = this.last
        return l === null ? null : this._unlinkLast(l)
    }

    /**
     * push
     */
    public push(e: E) {
        this.addFirst(e)
    }

    /**
     * pop
     */
    public pop(): E | null {
        return this.removeFisrt()
    }

    copyOf(c: ICollection<E>): boolean {
        return true
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