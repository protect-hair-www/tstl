/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:57:28
 * @LastEditTime: 2022-03-13 17:52:54
 * @LastEditors: hzheyuan
 * @Description: Heap
 * 
 * Heap is a algothim.
 * 
 * A heap is a way to organize the elements of range that allows for fast retrieval of element 
 * with highest value at any monent(with pop_heap), even repeatedly for fast insertion of new element(with push_heap).
 * 
 * The element with highest value is always pointed by fisrt. The order of the other elements depends on the particular
 * implementation.
 * 
 * The elements are compared use operator "<" (for the fisrt version), or comp(for the second): the element with
 * the highest value is an element for which this would return false when compared to every other element in the range.
 * 
 * The standard container adapter priority_queue call make_heap, push_heap and pop_heap automatically to maintain
 * heap properties for a container.
 * 
 * @FilePath: /tstl/src/container/sequence/heap/heap.ts
 */
import { RandomAccessIterator, random_itr_distance } from '@/Iterator'
import { CompFunType, less } from '@/fanctor'

/**
 * @description: heap heapify
 * @param {RandomAccessIterator} first
 * @param {number} holeIndex
 * @param {number} len
 * @param {function} comp
 * @return {*}
 */
function heapify<T>(first: RandomAccessIterator<T>, holeIndex: number, len: number, v: T, comp: CompFunType = less) {
    // console.log('heapify', first.getKey(), holeIndex, len);
    let topIndex = holeIndex
    let rightChild = (holeIndex << 1) + 2
    while(rightChild < len) {
        let l = first.increment(rightChild - 1, false), r = first.increment(rightChild, false);
        if(comp(r.getValue(), l.getValue())) rightChild--
        let largerValue = first.increment(rightChild, false).getValue() 
        first.increment(holeIndex, false).setValue(largerValue) 
        holeIndex = rightChild
        rightChild = (rightChild + 1) << 1
    }
    if(rightChild === len) {
        let rv = first.increment(rightChild - 1, false).getValue()
        first.increment(holeIndex, false).setValue(rv);
        holeIndex = rightChild - 1
    }
    _push_heap(first, holeIndex, topIndex, v, comp)
}

/**
 * @description: Push element into heap range
 * Given a heap in the range [first,last-1), 
 * this function extends the range considered a heap to [first,last) 
 * by placing the value in (last-1) into its corresponding location within it.
 * 
 * A range can be organized into a heap by calling make_heap. 
 * After that, its heap properties are preserved if elements are added and removed from it using push_heap and pop_heap, respectively.
 * @param {RandomAccessIterator} first
 * @param {number} holeIndex
 * @param {number} topIndex
 * @param {T} v
 * @param {CompFunType} comp
 * @return {*}
 */
export function push_heap<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    // console.log(first.getKey(), last.getKey(), random_itr_distance(first, last) - 1, last.getValue())
    let value = last.decrement(1, false).getValue(), distanse = random_itr_distance(first, last)
    _push_heap(first, distanse - 1, 0, value, comp)
}

/**
 * @description: heap push_heap iteranlly implementation
 * @param {RandomAccessIterator} first
 * @param {number} holeIndex
 * @param {number} topIndex
 * @param {T} v
 * @param {CompFunType} comp
 * @return {*}
 */
function _push_heap<T>(first: RandomAccessIterator<T>, holeIndex: number, topIndex: number, v: T, comp: CompFunType = less) {
    let parent = (holeIndex - 1) >> 1
    while(holeIndex > topIndex && comp(first.increment(parent, false).getValue(), v)) {
        let pv = first.increment(parent, false).getValue()
        first.increment(holeIndex, false).setValue(pv)
        holeIndex = parent
        parent = (holeIndex - 1) >> 1
    }
    first.increment(holeIndex, false).setValue(v)
}

/**
 * @description: rearrenges the elements in heap range [first, last) in such a way that the past
 * considered a heap is shortended by one: The element with highest value is moved to (last - 1) 
 * 
 * While the element with highest value is moved from first to (last - 1) (which now is out of heap),
 * the other elements are reorganized in such a way that the range [first, last) preserves the properties of a heap.
 * 
 * A range can be organized into a heap calling makeHeap. after that, its heap properties are perserved if elements are
 * added and removed from its using pushHeap and popHeap, respectively.
 * 
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {CompFunType} comp
 * @return {*}
 */
export function pop_heap<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less): T {
    return _pop_heap(first, last, comp)
}

/**
 * @description: pop_heap iteranlly implementation
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {CompFunType} comp
 * @return {*}
 */
function _pop_heap<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less): T {
    let _last = last.decrement(1, false), res = first.getValue()
    let distance = random_itr_distance(first, _last), value = _last.getValue()
    _last.setValue(res)
    heapify(first, 0, distance, value, comp)
    return res
}


/**
 * @description: make_heap
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {function} comp
 * @return {*}
 */
export function make_heap<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let len = random_itr_distance(first, last)
    if(len < 2) return
    let parent = (len - 2) >> 1
    // test 
    // let v = first.increment(parent, false).getValue();
    // heapify(first, parent, len, v, comp)
    // v = first.increment(1, false).getValue();
    // heapify(first, 1, len, v, comp)

    for(let i = parent; i >= 0; i--) {
        let v = first.increment(i, false).getValue();
        heapify(first, i, len, v, comp)
    }
}


/**
 * @description: Sort elements of heap
 * 
 * Sorts the elements in the heap range [first,last) into ascending order.
 * The elements are compared using operator< for the first version, and comp for the second, 
 * which shall be the same as used to construct the heap.
 * 
 * The range loses its properties as a heap.
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {CompFunType} comp
 * @return {*}
 */
export function sort_heap<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    while(random_itr_distance(first, last) > 1) {
        pop_heap(first, last, comp)
        last.decrement(1)
    }
}


/**
 * @description: is_heap internally implementation
 * @param {*}
 * @return {*}
 */
function _is_heap(): boolean;
function _is_heap() {
    return true
}

/**
 * @description: test if range is heap
 * Return true if the range [first, last) froms heap, as if constructed with make_heap
 * The elements are compared using operator < for the first version, and comp for the second 
 * @param {*}
 * @return {*}
 */
export function is_heap<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let parent = 0, child = 1, distance = random_itr_distance(first, last)
    for(; child < distance; ++child) {
        // if(comp(first.))
    }
}

export function is_heap_until() {

}