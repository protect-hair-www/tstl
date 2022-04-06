/*
 * @Author: hzheyuan
 * @Date: 2022-04-06 22:16:52
 * @LastEditTime: 2022-04-06 23:16:13
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/exp/LinkedList/ListIterator.ts
 */
import { LinkedIterator } from './Iterator'
import { IListIterator  } from '../Iterators/IListIterator'
import { Node } from './ListNode'
import { LinkedList } from './index';

export class LinkedListIterator<E> implements IListIterator<E> {
    private _lastReturned: Node<E> | null
    private _next: Node<E> | null
    private _nextIndex: number
    // private expectedModCount 
    private _cntr: LinkedList<E>

    constructor(index: number, list: LinkedList<E>) {
        this._cntr = list
        this._next = (index === list.size()) ? null : list.node(index) 
        this._nextIndex = index
        this._lastReturned = null
    }

    public hasNext(): boolean {
        return this._nextIndex < this._cntr.size()
    }

    public hasPrevious(): boolean {
        return this._nextIndex > 0
    }

    public next(): IteratorResult<E> {
        if(!this.hasNext()) {
            return {done: true, value: undefined}
        } else {
            this._lastReturned = this._next
            this._next = this._next!.next
            this._nextIndex++
            let val = this._lastReturned!.value
            return {done: false, value: val!}
        }
    }

    public previous(): IteratorResult<E> {
        if(!this.hasPrevious()) return {done: true, value: undefined}
        else {
            this._lastReturned = this._next = (this._next === null) ? this._cntr.last : this._next.prev
            this._nextIndex--
            let val = this._lastReturned!.value
            return {done: false, value: val!}
        }
    }

    previousIndex(): number {
        return this._nextIndex - 1
    }

    nextIndex(): number {
        return this._nextIndex
    }

    public remove(): void {
        if(this._lastReturned === null) 
            throw new Error('linked list listIterator remove error')
        let lastNext = this._lastReturned.next
        this._cntr.unlink(this._lastReturned)
        if(this._next === this._lastReturned) this._next = lastNext
        else this._nextIndex
        this._lastReturned = null
    }

    public set(e: E): void {
        if(this._lastReturned === null) 
            throw new Error('linked list listIterator set error')
        this._lastReturned.value = e
    }

    add(e: E): void {
        this._lastReturned = null
        if(this._next === null) this._cntr._linkLast(e)
        else this._cntr._linkBefore(e, this._next)
        this._nextIndex++
    }
}

