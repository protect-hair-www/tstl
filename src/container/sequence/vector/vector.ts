/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:57:21
 * @LastEditTime: 2022-03-07 23:21:06
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
    cntr: Array<T>

    start: number = 0
    finish: number = 0

    constructor(p?: number | Iterable<T>) {
        if(typeof p === 'number' && p) this.cntr = new Array<T>(p)
        else if(p) this.cntr = new Array(...(p as Iterable<T>))
        else this.cntr = new Array()
    }

    /**
     * @description: return iterator to begining
     * @param {*}
     * @return {*}
     */    
    begin(): VCIterator<T> {
        return new VCIterator(this.start, this.cntr) 
    }

    /**
     * @description: return iterator to end
     * @param {*}
     * @return {*}
     */    
    end(): VCIterator<T> {
        let last = this.cntr.length
        return new VCIterator(last, this.cntr)
    }

    /**
     * @description: return size
     * @param {*}
     * @return {*}
     */    
    size(): number {
        return this.cntr.length
    }

    /**
     * @description: test whether container is empty
     * @param {*}
     * @return {*}
     */    
    empty(): boolean {
        return this.size() === 0
    }

    getValue(): T {
        return this.cntr[0]
    }

    /**
     * @description: access first element
     * @param {*}
     * @return {*}
     */    
    front() {
        return this.cntr[this.start]
    }

    /**
     * @description: access last element
     * @param {*}
     * @return {*}
     */    
    back() {
        let len = this.cntr.length
        return this.cntr[len - 1]
    }

    /**
     * @description: access data
     * @param {*}
     * @return {*}
     */    
    data() {
        return this.cntr
    }

    /**
     * @description: change size
     * @param {*}
     * @return {*}
     */    
    resize() {
        this.cntr.length = 0
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
        this.cntr.push(x)
        this.finish++
    }

    /**
     * @description: delete last element
     * @param {*}
     * @return {*}
     */    
    pop_back() {
        this.cntr.pop()
        this.finish--
    }

    /**
     * @description: inset elemnts
     * @param {*}
     * @return {*}
     */    
    insert(pos: VCIterator<T>, x: T) {
        this.cntr.splice(pos.getNode(), 0, x)
        this.finish++
    }

    /**
     * @description: swap content
     * @param {*}
     * @return {*}
     */    
    swap(pos: VCIterator<T>, last?: VCIterator<T>) {
    }

    /**
     * @description: erase elements
     * Removes from the vector either a single element (position) or a range of elements ([first,last)).
     * @param {*}
     * @return {*}
     */    
    erase(pos: VCIterator<T>, last?: VCIterator<T>) {
        if(!last) this._erase_position(pos)
        else this._erase_range(pos, last)
    }

    /**
     * @description: erase version(1) erase one element of a position(internally implementation)
     * @param {VCIterator} pos
     * @return {*}
     */    
    private _erase_position(pos: VCIterator<T>) {
        this.cntr.splice(pos.getNode(), 1);
    }

    /**
     * @description: 
     * @param {VCIterator} first
     * @param {VCIterator} last
     * @return {*}
     */    
    private _erase_range(first: VCIterator<T>, last: VCIterator<T>) {
        const count = first.getNode() - last.getNode()
        this.cntr.splice(first.getNode(), count)
        this.finish = this.finish - count
    }

    /**
     * @description: clear content
     * @param {*}
     * @return {*}
     */    
    clear() {
        this.cntr = []
        this.cntr.length = 0
        this.finish = 0
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
