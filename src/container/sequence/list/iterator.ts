/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:08:24
 * @LastEditTime: 2022-03-04 18:06:54
 * @LastEditors: hzheyuan
 * @Description: list 容器迭代器
 * @FilePath: \tstl\src\container\sequence\list\iterator.ts
 */
import { Iterator } from '../../../Iterator/index'
import { ListNode } from './ListNode'

export class ListIterator<T> extends Iterator {
    _cur: ListNode<T>

    constructor(cur) {
        super()
        this._cur = cur
    }

    get() {

    }

    getValue() {
        return this._cur.getValue()
    }

    getNode(): ListNode<T> {
        return this._cur
    }

    hasNext(): boolean {
        return true
    }

    next() {

    }

    prev(): ListIterator<T> {
        return this
    }

    increment() {

    }

    decrement() {

    }

    remove() {

    }

    done(): boolean {
        return true
    }

    static distance(fisrt, last) {
        return 1
    }
}
