/*
 * @Author: hzheyuan
 * @Date: 2022-03-12 10:58:55
 * @LastEditTime: 2022-03-14 22:36:23
 * @LastEditors: hzheyuan
 * @Description: Algorithms
 * 
 * Algorithms defines a collection of functions especially designed to be used on ranges of elements.
 * A range is any sequence of objects that can be accessed through iterators or pointers, 
 * such as an array or an instance of some containers. Notice though, that algorithms operate 
 * through iterators directly on the values, not affecting in any way the structure of any possible 
 * container (it never affects the size or storage allocation of the container).
 * 
 * @FilePath: /tstl/src/algorithm/index.ts
 */
import { makeHeap, popHeap, pushHeap, sortHeap, isHeap, isHeapUntil } from './heap'

import { find }  from './non_modifying_sequence_op'

export {
    makeHeap,
    popHeap,
    pushHeap,
    sortHeap,
    isHeap,
    isHeapUntil
}