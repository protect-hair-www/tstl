/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:57:54
 * @LastEditTime: 2022-03-13 17:51:13
 * @LastEditors: hzheyuan
 * @Description: Priority queue
 * Priority queues are type of container adapters, specifically designed such that
 * its first element is always the greatest of the elements it containers, according to some strict weak ordering criterion.
 * 
 * Priority queues are implemented as container adaptors, which are clases that use an encapsulated object of a specific
 * container class as its underlying container, providing a specific set of member functions to access its elements.
 * Elements are popped from the "back" of the specific container, which is know as the top of the priority queue.
 * 
 * The underlying container may be any of the standard container class or some spcifically designed container class. 
 * The container shall be access through random access iterators and support the following operations:
 *  (1) empty()
 *  (2) size()
 *  (3) front()
 *  (4) push_back()
 *  (5) pop_back()
 * @FilePath: /tstl/src/container/sequence/priority_queue/priority_queue.ts
 */
import { makeHeap, pushHeap, popHeap }  from '@/container/sequence/heap/'
import { Vector }  from '@/container/sequence/vector/'
import { CompFunType, less } from '@/fanctor'

export class PriorityQueue<T, C = Vector<T>> {
    cntr 
    compare: CompFunType

    constructor(comp: CompFunType = less, c) { 
        this.cntr = this.create<T>(c)
        this.compare = comp
        this.init()
    }

    create<T>(c: {new(...args): C}, ...args): C {
        return new c(...args)
    }

    /**
     * @description: interanlly implementation(make heap of some standard container)
     * @param {*}
     * @return {*}
     */    
    private init() {
        let begin = this.cntr.begin(), end = this.cntr.end();
        makeHeap(begin, end, this.compare)
    }

    /**
     * @description: Test whether container is empty
     * @param {*}
     * @return {*}
     */    
    empty() {
        return this.cntr.empty()
    }

    /**
     * @description: return size
     * @param {*}
     * @return {*}
     */    
    size() {
        return this.cntr.size()
    } 

    /**
     * @description: Aceess top element
     * @param {*}
     * @return {*}
     */    
    top() {
        return this.cntr.front()
    }

    /**
     * @description: Insert element
     * @param {T} v
     * @return {*}
     */    
    push(v: T) {
        this.cntr.push_back(v)
        pushHeap(this.cntr.begin(), this.cntr.end(), this.compare)
    }

    /**
     * @description: remove element
     * @param {*}
     * @return {*}
     */    
    pop() {
        popHeap(this.cntr.begin(), this.cntr.end(), this.compare)
        this.cntr.pop_back()
    }
}