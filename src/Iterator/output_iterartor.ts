/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 09:44:09
 * @LastEditTime: 2022-03-18 17:30:39
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
 *  (1) Access 
 *  (2) Write (write only)
 *  (3) Next (+1)
 *  (4) Compare
 * @FilePath: /tstl/src/Iterator/output_iterartor.ts
 */
import { BaseIterator } from './base_iterator'

export interface OutputIterator<T> extends BaseIterator<T> {
  get key() // get current key or index(getter)
  getKey() // get current key or index

  set value(v: T)
  setValue(v: T) // write value operator
}
