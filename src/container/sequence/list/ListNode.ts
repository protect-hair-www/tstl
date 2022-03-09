/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 13:53:36
 * @LastEditTime: 2022-03-09 23:29:49
 * @LastEditors: hzheyuan
 * @Description: list container node 
 * @FilePath: /tstl/src/container/sequence/list/ListNode.ts
 */

export class ListNode<T> {
    private _prev: ListNode<T>
    private _next: ListNode<T>
    private _value: T | null

    constructor(x?: T) {
        this._prev = this 
        this._next = this
        this._value = x ? x : null
    }

    /**
     * @description: get prev pointer
     * @param {*}
     * @return {*}
     */    
    get prev() {
        return this._prev
    }

    /**
     * @description: set prev pointer
     * @param {*} x
     * @return {*}
     */    
    set prev(x) {
        this._prev = x
    }

    /**
     * @description: return next pointer
     * @param {*}
     * @return {*}
     */    
    get next() {
        return this._next
    }

    /**
     * @description: set next pointer
     * @param {*} x
     * @return {*}
     */    
    set next(x) {
        this._next = x
    }

    /**
     * @description: get the value
     * @param {*}
     * @return {*}
     */    
    get value() {
        return this._value
    }

    /**
     * @description: set the value
     * @param {*} v
     * @return {*}
     */    
    set value(v) {
        this._value = v
    }

    /**
     * @description: a public method getValue
     * @param {*}
     * @return {*}
     */    
    public getValue(): T {
        return (this._value as T)
    }

    /**
     * @description: a public method setValue
     * @param {*} v
     * @return {*}
     */    
    public setValue(v) {
        this._value = v
    }
}