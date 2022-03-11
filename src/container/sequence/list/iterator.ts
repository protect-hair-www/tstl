/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:08:24
 * @LastEditTime: 2022-03-11 10:57:50
 * @LastEditors: hzheyuan
 * @Description: list container iterator 
 * @FilePath: \tstl\src\container\sequence\list\iterator.ts
 */
import { Iterator } from '../../../Iterator/index'
import { ListNode } from './ListNode'

export class ListIterator<T> extends Iterator<T> {
    _cur: ListNode<T>

    constructor(cur) {
        super()
        this._cur = cur
    }

    /**
     * @description: get the list node saved value, same as getValue()
     * @param {*}
     * @return {*}
     */
    get() {
        return this._cur.getValue()
    }

    /**
     * @description: get the list node saved value
     * @param {*}
     * @return {*}
     */
    getValue() {
        return this._cur.getValue()
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
    public next():T {
        this.increment()
        return this._cur.getValue()
    }

    /**
     * @description: return next iterator
     * @param {*}
     * @return {*}
     */    
    nextItr(): ListIterator<T> {
        return new ListIterator(this._cur.next)
    }

    /**
     * @description: iterator decrement and return the element 
     * @param {*}
     * @return {*}
     */
    public prev():T {
        this.decrement()
        return this._cur.getValue()
    }

    /**
     * @description: return prev iterator
     * @param {*}
     * @return {*}
     */    
    prevItr(): ListIterator<T> {
        return new ListIterator(this._cur.prev)
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
        return {
            next: () => {
                if (this.hasNext()) {
                    const node = { done: false, value: this._cur.getValue() }
                    this.increment()
                    return node
                } else {
                    return { done: true, value: undefined }
                }
            }
        }
    }
}
