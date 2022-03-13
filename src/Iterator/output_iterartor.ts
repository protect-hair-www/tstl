/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 09:44:09
 * @LastEditTime: 2022-03-13 16:39:49
 * @LastEditors: hzheyuan
 * @Description: Output iterator category
 * Interface to identify the category of an iterator as an output iterator
 * 
 * Output iterators are iterators that can be used in sequential output operations, 
 * where each element pointed by the iterator is written a value only once and then the iterator is incremented.
 * 
 * All forward, bidirectional and random-access iterators that are not constant iterators are also valid output iterators.
 * 
 * There is not a single type of output iterator: Each container may define its own specific iterator type able to 
 * iterate through it and access its elements. But all output iterators support at least the following operations:
 *  (1) Write value (write only)
 *  (2) Increment (+1)
 *  (3) Compare
 * @FilePath: /tstl/src/Iterator/output_iterartor.ts
 */
import { BaseIterator } from './base_iterator'

export interface OutputIterator<T> extends BaseIterator<T>{
  _cur                                                                  // current position

  get key();                                                            // get current key or index(getter)
  getKey();                                                             // get current key or index

  // access
  get value(): T                                                        // access current position element(getter)
  getValue(): T                                                         // access current position element
}