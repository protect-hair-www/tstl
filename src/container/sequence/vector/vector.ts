/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:57:21
 * @LastEditTime: 2022-03-09 18:24:07
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
     * Resizes the container so that it contains n elements.
     * 
     * If n is smaller than the current container size, the content is reduced to its first n elements, removing those beyond (and destroying them).
     * If n is greater than the current container size, the content is expanded by inserting at the end as many elements as needed to reach a size of n. 
     * If val is specified, the new elements are initialized as copies of val, otherwise, they are value-initialized.
     * If n is also greater than the current container capacity, an automatic reallocation of the allocated storage space takes place.
     * 
     * Notice that this function changes the actual content of the container by inserting or erasing elements from it.
     * @param {*}
     * @return {*}
     */    
    resize(n: number, v?: T) {
        let first = new VCIterator<T>(this.begin().getNode() + n, this.cntr);
        if(n < this.size()) this.erase(first, this.end())
        else this.insert(this.end(), n - this.size(), v)
    }

    /**
     * @description: asscess element
     * @param {*}
     * @return {*}
     */    
    at(pos: number) {
        return this.cntr.at(pos)
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
        // this.finish++
    }

    /**
     * @description: request a change in capacity
     * @param {*}
     * @return {*}
     */    
    reserve() {

    }

    /**
     * @description: delete last element
     * @param {*}
     * @return {*}
     */    
    pop_back() {
        this.cntr.pop()
        // this.finish--
    }

    /**
     * @description: inset elemnts
     * 
     * The vector is extended by inserting new elements before the element at the specified position, 
     * effectively increasing the container size by the number of elements inserted.
     * 
     * the method has 3 versions:
     * version 1: Position in the vector where the new elements are inserted.
     * version 2: Number of elements to insert. Each element is initialized to a copy of val.
     * version 3: Iterators specifying a range of elements.
     * 
     * @param {*}
     * @return {*}
     */    
    insert(pos: VCIterator<T>, x: T | number | VCIterator<T>, last?: T | VCIterator<T>) {
        if(typeof x === 'number' && last) {
            this._fill_insert(pos, x, (last as T))
        } else if(x instanceof VCIterator && last instanceof VCIterator) {
            this._range_insert(pos, (x as VCIterator<T>), (last as VCIterator<T>))
        } else {
            this._pos_insert(pos, (x as T));
        }
    }

    /**
     * @description: insert at a specificed pos (internally implementation)
     * @param {VCIterator} pos
     * @param {T} x
     * @return {*}
     */    
    private _pos_insert(pos: VCIterator<T>, val: T) {
        this.cntr.splice(pos.getNode(), 0, val)
        this.finish++
    }

    /**
     * @description: Number of elements to insert. Each element is initialized to a copy of val (internally implementation)
     * @param {VCIterator} pos
     * @param {number} n
     * @param {T} x
     * @return {*}
     */
    private _fill_insert(pos: VCIterator<T>, n: number, val: T) {
        if(n !== 0) {
            const added = new Array<T>(n);
            added.fill(val)
            this.cntr.splice(pos.getNode(), 0, ...added)
            this.finish +=n
        }
    }

    /**
     * @description: Iterators specifying a range of elements. 
     * Copies of the elements in the range [first,last) are inserted at position in the same order (internally implementation)
     * @param {VCIterator} pos
     * @param {VCIterator} first
     * @param {VCIterator} last
     * @return {*}
     */    
    private _range_insert(pos: VCIterator<T>, first: VCIterator<T>, last: VCIterator<T>) {
        let added = new Array<T>();
        let cur = first, n = 0;
        while(cur.hasNext() && cur.getNode() !== last.getNode()) {
            added.push(cur.getValue() as T)
            cur = cur.next()
            n++
        }
        console.log(n, added);
        this.cntr.splice(pos.getNode(), 0, ...added)
        this.finish +=n
    }

    /**
     * @description: swap content
     * @param {*}
     * @return {*}
     */    
    swap(vec: Vector<T>) {

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
        const count = last.getNode() - first.getNode()
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
    emplace(ctr?: {}) {

    }

    /**
     * @description: construct and insert element at the end
     * @param {*}
     * @return {*}
     */    
    emplace_back(ctr?: {}) {

    }
}
