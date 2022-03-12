/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:08:24
 * @LastEditTime: 2022-03-12 15:55:40
 * @LastEditors: hzheyuan
 * @Description: list container iterator 
 * @FilePath: /tstl/src/container/sequence/list/iterator.ts
 */
import { ListNode } from './ListNode'
import { RandomAccessIterator } from '@/Iterator/'

export class LinkListIterator<T> implements RandomAccessIterator<T> {
    _cur: ListNode<T>

    constructor(cur) {
        this._cur = cur
    }

    get cur() {
        return this._cur
    }

    set cur(x) {
        this._cur = x
    }

    /**
     * @description: access node key (getter)
     * @param {*}
     * @return {*}
     */    
    get key() {
        return this.cur.getValue()
    }

    getKey() {
        return this.cur.getValue()
    }

    /**
     * @description: access node value (getter)
     * @param {*}
     * @return {*}
     */    
    get value() {
        return this.cur.getValue()
    }

    /**
     * @description: get the list node saved value
     * @param {*}
     * @return {*}
     */
    getValue() {
        return this.cur.getValue()
    }

    /**
     * @description: get list element node
     * @param {*}
     * @return {*}
     */
    getNode(): ListNode<T> {
        return this._cur
    }

    /**
     * @description: check has next element
     * @param {*}
     * @return {*}
     */
    hasNext(): boolean {
        return this._cur.getValue() !== null
    }

    /**
     * @description: test whether has previous element
     * @param {*}
     * @return {*}
     */    
    hasPerv(): boolean {
        return this.cur.prev.getValue() !== null
    }

    /**
     * @description: same as hasnext
     * @param {*}
     * @return {*}
     */
    done(): boolean {
        return !this.hasNext()
    }

    /**
     * @description: goto next (interanlly implementation)
     * @param {*}
     * @return {*}
     */
    increment() {
        this._cur = this._cur.next
    }

    /**
     * @description: goto prev (internally implementation)
     * @param {*}
     * @return {*}
     */
    decrement() {
        this._cur = this._cur.prev
    }

    /**
     * @description: iterator increment and return the element 
     * @param {*}
     * @return {*}
     */
    public next(): IteratorResult<T> {
        // this.increment()
        // return this._cur.getValue()
        if (this.hasNext()) {
            const node = { done: false, value: this.cur.getValue() }
            this.increment()
            return node
        } else {
            return { done: true, value: undefined }
        }
    }

    /**
     * @description: iterator decrement and return the element 
     * @param {*}
     * @return {*}
     */
    public prev(): IteratorResult<T> {
        // this.decrement()
        // return this._cur.getValue()
        if (this.hasPerv()) {
            const node = { done: false, value: this._cur.getValue() }
            this.increment()
            return node
        } else {
            return { done: true, value: undefined }
        }
    }

    /**
     * @description: return next iterator
     * @param {*}
     * @return {*}
     */
    nextItr(): LinkListIterator<T> {
        return new LinkListIterator(this._cur.next)
    }

    /**
     * @description: return prev iterator
     * @param {*}
     * @return {*}
     */
    prevItr(): LinkListIterator<T> {
        return new LinkListIterator(this._cur.prev)
    }

    /**
     * @description: remove by iterator
     * @param {*}
     * @return {*}
     */
    remove() {

    }

    /**
     * @description: distance of to elements
     * @param {*} fisrt
     * @param {*} last
     * @return {*}
     */
    static distance(fisrt, last) {
        let n = 0, begin = fisrt;
        while (begin.hasNext() && begin.getNode() !== last.getNode()) {
            fisrt.increment()
            n++
        }
        return n
    }

    /**
     * @description: js iterator protocol
     * @param {*}
     * @return {*}
     */
    [Symbol.iterator]() {
        return this 
    }
}
