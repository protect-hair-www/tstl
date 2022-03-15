/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 14:17:51
 * @LastEditTime: 2022-03-13 16:39:30
 * @LastEditors: hzheyuan
 * @Description: base iterator
 * Interface identify the category of an iterator as an base iterator
 *
 * @FilePath: /tstl/src/Iterator/base_iterator.ts
 */
export interface BaseIterator<T> extends Iterator<T> {
  _cur // current position

  // next and hasNext(next identify in Iterator)
  hasNext(): boolean // test whether has next element

  // compare
  equal(first, last): boolean // compare operator
  [Symbol.iterator](): Iterator<T> // Javascript，iterable object have to implementation「@@iterator」method，Javascript can access the property with [Symbol.iterator]
}
