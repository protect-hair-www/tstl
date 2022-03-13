/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 09:43:54
 * @LastEditTime: 2022-03-13 16:32:25
 * @LastEditors: hzheyuan
 * @Description: Input Iterator
 * 
 * Input iterators are iterators that can be used in sequential input operations, 
 * where each value pointed by the iterator is read only once and then the iterator is incremented.
 * 
 * All forward, bidirectional and random-access iterators are also valid input iterators.
 * There is not a single type of input iterator: Each container may define its own specific iterator type able to 
 * iterate through it and access its elements. But all input iterators support at least the following operations:
 *  (1) Access (readonly)
 *  (2) Next (+1) 
 *  (3) Compare
 * @FilePath: /tstl/src/Iterator/input_iterator.ts
 */
import { BaseIterator } from './base_iterator'
export interface InputIterator<T> extends BaseIterator<T>{
  _cur                                                                  // current position

  get key();                                                            // get current key or index(getter)
  getKey();                                                             // get current key or index

  // access
  get value(): T                                                        // access current position element(getter)
  getValue(): T                                                         // access current position element
}