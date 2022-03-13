/*
 * @Author: hzheyuan
 * @Date: 2022-03-12 11:02:28
 * @LastEditTime: 2022-03-13 16:43:45
 * @LastEditors: hzheyuan
 * @Description: Bidirectional iterator
 * Inteface to identify the category of an iterator as a bidirectional iterator
 * 
 * Bidirectional iterators are iterators that can be used to access the 
 * sequence of elements in a range in both directions (towards the end and towards the beginning).
 * 
 * All random-access iterators are also valid bidirectional iterators.
 * 
 * There is not a single type of bidirectional iterator: 
 * Each container may define its own specific iterator type able to iterate through it and access its elements.
 * 
 * Bidirectional iterators have the same properties as forward iterators, with the only difference that they can also be decremented
 *  (1) Access 
 *  (2) Write
 *  (3) Next (+1)
 *  (4) Prev (-1)
 * @FilePath: /tstl/src/Iterator/bidirectional_iterator.ts
 */
import { ForwardIterator }  from './forward_iterator'
export interface BidirectionalIterator<T> extends ForwardIterator<T>{
  hasPrev(): boolean                  // test whether has previous element
  prev(): IteratorResult<T>           // iterator decrement and return IteratorResult({donw: boolean, value: T})
  
  remove?()                           // erase the position element
  [Symbol.iterator](): Iterator<T>    // Javascript，iterable object have to implementation「@@iterator」method，Javascript can access the property with [Symbol.iterator]
}
