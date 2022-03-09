/*
 * @Author: hzheyuan
 * @Date: 2022-03-08 21:17:38
 * @LastEditTime: 2022-03-09 13:37:35
 * @LastEditors: hzheyuan
 * @Description: deque(double ended queue)
 * deque is an irregular acronym of double-ended queue.
 * Double-ended queues are sequence containers with dynamic sizes that can be expanded or contracted on both ends (either its front or its back).
 * 
 * Deque provide a functionality similar to vectors, 
 * but with efficient insertion and deletion of elements also at the beginning of the sequence, 
 * and not only at its end. But, unlike vectors, deques are not guaranteed to store all its elements 
 * in contiguous storage locations: accessing elements in a deque by offsetting a pointer to another element causes undefined behavior.
 * 
 * Both vectors and deques provide a very similar interface and can be used for similar purposes.
 * 
 * For operations that involve frequent insertion or removals of elements at positions 
 * other than the beginning or the end, deques perform worse 
 * and have less consistent iterators and references than lists and forward lists.
 * 
 * @FilePath: /tstl/src/container/sequence/deque/deque.ts
 */
import { DequeIterator } from './iterator'

export class Deque<T> {
    // the container
    cntr

    // iternally iterator to begining
    start: number = 0

    // iternally iterator to end 
    finish: number = 0

    constructor(p: T | Iterable<T>) {
        this.cntr = new Array<T>()
        if(typeof p === 'number' && p) this.cntr = new Array<T>(p)
        else if(p) this.cntr = new Array(...(p as Iterable<T>))
        else this.cntr = new Array()
    }

    /**
     * @description: return iterator to begining
     * @param {*}
     * @return {*}
     */    
    begin() {
        return new DequeIterator<T>(0, this.cntr)
    }

    /**
     * @description: return iterator to end
     * @param {*}
     * @return {*}
     */    
    end() {
        return new DequeIterator<T>(this.finish, this.cntr)
    }

    /**
     * @description: return const iterator to begining
     * @param {*}
     * @return {*}
     */    
    cbegin() {

    }

    /**
     * @description: return const iterator to end
     * @param {*}
     * @return {*}
     */    
    cend() {

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
        return this.cntr.length === 0
    } 

    /**
     * @description: access element
     * @param {*}
     * @return {*}
     */    
    at(x: DequeIterator<T>) {
        return this.cntr.at(x.getNode())
    }

    /**
     * @description: access first element
     * @param {*}
     * @return {*}
     */    
    front() {

    } 

    /**
     * @description: access last element
     * @param {*}
     * @return {*}
     */    
    back() {

    }

    /**
     * @description: assign container content
     * @param {*}
     * @return {*}
     */    
    assgin() {

    }

    /**
     * @description: add element at the end
     * @param {*}
     * @return {*}
     */    
    push_back() {

    }

    /**
     * @description: insert element at begining
     * @param {*}
     * @return {*}
     */    
    push_front() {

    }

    /**
     * @description: delete last element
     * @param {*}
     * @return {*}
     */    
    pop_back() {

    }

    /**
     * @description: delete first element
     * @param {*}
     * @return {*}
     */    
    pop_front() {

    }

    /**
     * @description: insert element
     * @param {*}
     * @return {*}
     */    
    insert() {

    }

    /**
     * @description: erase element
     * @param {*}
     * @return {*}
     */    
    erase() {

    }

    /**
     * @description: swap content
     * @param {*}
     * @return {*}
     */    
    swap() {

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
     * @description: construct and insert element at begining
     * @param {*}
     * @return {*}
     */    
    emplace_front() {

    }

    /**
     * @description: construct and insert element at the end
     * @param {*}
     * @return {*}
     */    
    emplace_back() {

    }
}