/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 13:53:36
 * @LastEditTime: 2022-03-04 17:57:47
 * @LastEditors: hzheyuan
 * @Description: list container node 
 * @FilePath: \tstl\src\container\sequence\list\ListNode.ts
 */

export class ListNode<T> {
    _prev: ListNode<T>
    _next: ListNode<T>

    _value: T | Symbol 

    constructor(x?: T) {
        this._prev = this 
        this._next = this
        this._value = x ? x : Symbol.for('header')
    }

    get prev() {
        return this._prev
    }

    set prev(x) {
        this._prev = x
    }

    get next() {
        return this._next
    }

    set next(x) {
        this._next = x
    }

    get value() {
        return this._value
    }

    set value(v) {
        this._value = v
    }

    public getValue() {
        return this._value
    }

    public setValue(v) {
        this._value = v
    }
}