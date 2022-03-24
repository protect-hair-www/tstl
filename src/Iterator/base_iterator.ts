/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 14:17:51
 * @LastEditTime: 2022-03-24 17:08:43
 * @LastEditors: hzheyuan
 * @Description: base iterator
 * Interface identify the category of an iterator as an base iterator.
 * Every iterator has a next method defined in Iterator.
 * Every iterator has a hasNext method method to test whether iteratro point to the end position.
 * Every iterator has a getValue method access the value.
 * @FilePath: \tstl\src\Iterator\base_iterator.ts
 */
import { IteratorTags,  } from './index'
import type { IteratorTypes } from './index'
export interface BaseIterator<T> extends Iterator<T> {
  readonly tag: IteratorTags

  /** current pointer */
  _cur
  get cur()
  set cur(c)
  
  /** base opreator access value */
  get value(): T // getter
  getValue(): T

  /** next and hasNext(next identify in Iterator) */
  hasNext(): boolean // test whether has next element

  /** Comparable */
  equals<T, I extends IteratorTypes<T>>(itr: I): boolean
  copy(): IteratorTypes<T>

  /** Javascript，iterable object have to implementation「@@iterator」method，Javascript can access the property with [Symbol.iterator]  */
  [Symbol.iterator](): Iterator<T> 
}
// export type valueType<T extends "string"> = 
