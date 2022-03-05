/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:08:24
 * @LastEditTime: 2022-03-05 17:38:40
 * @LastEditors: hzheyuan
 * @Description: list container iterator 
 * @FilePath: /tstl/src/container/sequence/list/iterator.ts
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
     * @description: check is at end
     * @param {*}
     * @return {*}
     */
    private isEnd(): boolean {
        return this.getValue() === Symbol.for('header')
    }

    /**
     * @description: check has next element
     * @param {*}
     * @return {*}
     */
    hasNext(): boolean {
        return !this.isEnd()
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

    /**
     * @description: js iterator protocol next method
     * @param {*}
     * @return {*}
     */
    next(): ListIterator<T> {
        return new ListIterator(this._cur.next)
    }

    /**
     * @description: prev element
     * @param {*}
     * @return {*}
     */
    prev(): ListIterator<T> {
        return new ListIterator(this._cur.prev)
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
     * @description: remove by iterator
     * @param {*}
     * @return {*}
     */
    remove() {

    }

    done(): boolean {
        return !this.isEnd()
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
}
