/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:57:28
 * @LastEditTime: 2022-03-12 12:10:08
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

function heapify<T>(first: RandomAccessIterator<T>, holeIndex: number, len: number, comp?: (a: T, b: T) => boolean) {
    let topIndex = holeIndex
}

/**
 * @description: make_heap
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {function} comp
 * @return {*}
 */
export function make_heap<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp?: (a: T, b: T) => boolean) {
    let len = random_itr_distance(first, last)
    if(len < 2) return
    let parent = (len - 2) / 2
    for(let i = parent; i >= 0; i--) {
        heapify(first, parent, len, comp)
    }
}