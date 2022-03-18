/*
 * @Author: hzheyuan
 * @Date: 2022-02-12 11:00:45
 * @LastEditTime: 2022-03-18 17:30:13
 * @LastEditors: hzheyuan
 * @Description: interface identify the category of an iteratro as a random-access iterator
 *
 * Random-access iterators are iterators that can be used to access elements at an arbitrary offset
 * position relative to the element they point to, offering the same functionality as pointer.
 *
 * Random-access iterators are the most complete iterators in terms of functionality.
 * All pointer types are also valid random-access iterators.
 *
 * There is not a single type of random-access iterator:
 * Each container may define its own specific iterator type able to iterate through it and access its elements.
 * But all random access iterators support -at least- the following operations:
 *  (1) Access
 *  (2) Write
 *  (3) next (+1)
 *  (4) perv (-1)
 *  (5) Increment (+n)
 *  (6) Decrement (-n)
 * @FilePath: /tstl/src/Iterator/random_access_iterator.ts
 */
import { BidirectionalIterator } from './bidirectional_iterator'

export interface RandomAccessIterator<T> extends BidirectionalIterator<T> {
  increment(n?: number, c?: boolean): RandomAccessIterator<T> // increment n
  decrement(n?: number, c?: boolean): RandomAccessIterator<T> // decrement n
  getNode() // get position element(some datastruct need get node (eg. map, set...))
  remove?() // erase the position element
}

export function random_itr_distance<T>(
  first: RandomAccessIterator<T>,
  last: RandomAccessIterator<T>
): number {
  const n = last.getKey() - first.getKey()
  return n
}
