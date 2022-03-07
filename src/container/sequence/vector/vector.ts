/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:57:21
 * @LastEditTime: 2022-03-07 18:54:58
 * @LastEditors: hzheyuan
 * @Description: sequence container vector
 * vectors are sequence containers representing arrays that can change in size.
 * 
 * Just like arrays, vectors use contiguous storage locations for their elements, 
 * which means that their elements can also be accessed using offsets on regular pointers to its elements, 
 * and just as efficiently as in arrays. But unlike arrays, their size can change dynamically, with their storage being handled automatically by the container.
 * 
 * Internally, vectors use a javascript array to store their elements. 
 * Javascript array will reallocated in order to grow in size when new elements are inserted.
 * 
 * Compared to the other dynamic sequence containers (deques, lists and forward_lists), 
 * vectors are very efficient accessing its elements (just like arrays) and relatively efficient adding or removing elements from its end.
 * 
 * @FilePath: \tstl\src\container\sequence\vector\vector.ts
 */
import { VCIterator } from './iterator'

export class Vector<T> {
    container: Array<T>

    _begin: number = 0
    _end: number = 0

    constructor(n?) {
        this.container = new Array<T>(n)
    }

    /**
     * @description: return iterator to begining
     * @param {*}
     * @return {*}
     */    
    begin() {
        return this._begin
    }

    /**
     * @description: return iterator to end
     * @param {*}
     * @return {*}
     */    
    end() {
        return this._end
    }

    /**
     * @description: return size
     * @param {*}
     * @return {*}
     */    
    size(): number {
        return this.container.length
    }

    /**
     * @description: test whether container is empty
     * @param {*}
     * @return {*}
     */    
    empty(): boolean {
        return this.size() === 0
    }

    /**
     * @description: change size
     * @param {*}
     * @return {*}
     */    
    resize() {
        this.container.length = 0
    }

    /**
     * @description: request a change in capacity
     * @param {*}
     * @return {*}
     */    
    reserve() {

    }

    /**
     * @description: asscess element
     * @param {*}
     * @return {*}
     */    
    at() {

    }

    getValue(): T {
        return this.container[0]
    }

    /**
     * @description: access first element
     * @param {*}
     * @return {*}
     */    
    front() {
        return this.container[this._begin]
    }

    /**
     * @description: access last element
     * @param {*}
     * @return {*}
     */    
    back() {
        return this.container[this._end]
    }

    /**
     * @description: access data
     * @param {*}
     * @return {*}
     */    
    data() {

    }

    /**
     * @description: assign container content
     * @param {*}
     * @return {*}
     */    
    assign() {

    }

    /**
     * @description: add element to the end
     * @param {T} x
     * @return {*}
     */    
    push_back(x: T) {
        this.container.push(x)
    }

    /**
     * @description: delete last element
     * @param {*}
     * @return {*}
     */    
    pop_back() {

    }

    /**
     * @description: inset elemnts
     * @param {*}
     * @return {*}
     */    
    insert() {

    }

    /**
     * @description: swap content
     * @param {*}
     * @return {*}
     */    
    swap() {

    }

    /**
     * @description: erase elements
     * @param {*}
     * @return {*}
     */    
    erase() {

    }

    /**
     * @description: clear content
     * @param {*}
     * @return {*}
     */    
    clear() {

    }

    /**
     * @description: construct and insert element
     * @param {*}
     * @return {*}
     */    
    emplace() {

    }

    /**
     * @description: construct and insert element at the end
     * @param {*}
     * @return {*}
     */    
    emplace_back() {

    }
}
