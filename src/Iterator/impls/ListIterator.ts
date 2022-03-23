/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:08:24
 * @LastEditTime: 2022-03-23 23:07:40
 * @LastEditors: hzheyuan
 * @Description: list container iterator
 * @FilePath: /tstl/src/iterator/impls/ListIterator.ts
 */
import { ListNode } from '../../container/sequence/list/ListNode'
import { BaseIterator, RandomAccessIterator, BidirectionalIterator, IteratorTags, IteratorTypes } from '../index'
import { ListIteratorBase }  from './ListIteratorBase'

export class ListIterator<T> extends ListIteratorBase<T> {
  readonly tag: IteratorTags = IteratorTags.BIDIRECTIONAL_ITERATOR
  _cur: ListNode<T>

  constructor(cur) {
    super(cur)
    this._cur = cur
  }

  /**
   * @description: access node value (getter)
   * @param {*}
   * @return {*}
   */
  get value() {
    return this.cur.getValue()
  }

  /**
   * @description: get the list node saved value
   * @param {*}
   * @return {*}
   */
  getValue() {
    return this.cur.getValue()
  }

  /**
   * @description: set value
   * @param {T} v
   * @return {*}
   */
  setValue(v: T) {
    this.cur.value = v
  }

  /**
   * @description: get list element node
   * @param {*}
   * @return {*}
   */
  getNode(): ListNode<T> {
    return this._cur
  }

  /**
   * @description: test whether equals to other itr
   * @param {ListIterator} itr
   * @return {*}
   */  
  equals<T, I extends IteratorTypes<T>>(itr: I) {
      return this.cur === itr.cur
  }

  copy(): IteratorTypes<T> {
    return new ListIterator<T>(this.cur)
  }

  /**
   * @description: goto next (interanlly implementation)
   * @param {*}
   * @return {*}
   */
  increment(n: number, c: boolean = true): RandomAccessIterator<T> {
    this._cur = this._cur.next
    const itr: unknown = new ListIterator(this.cur)
    return itr as RandomAccessIterator<T>
  }

  /**
   * @description: goto prev (internally implementation)
   * @param {*}
   * @return {*}
   */
  decrement(n: number = 1, c: boolean = true): RandomAccessIterator<T> {
    this._cur = this._cur.prev
    const itr: unknown = new ListIterator(this.cur)
    return itr as RandomAccessIterator<T>
  }

  /**
   * @description: test whether has previous element
   * @param {*}
   * @return {*}
   */
  public hasPrev(): boolean {
    return this.cur.prev.getValue() !== null
  }

  /**
   * @description: iterator decrement and return the element
   * @param {*}
   * @return {*}
   */
  public prev(): IteratorResult<T> {
    // this.decrement()
    // return this._cur.getValue()
    if (this.hasPrev()) {
      const node = { done: false, value: this._cur.getValue() }
      this._cur = this._cur.prev
      return node
    } else {
      return { done: true, value: undefined }
    }
  }

//   /**
//    * @description: return next iterator
//    * @param {*}
//    * @return {*}
//    */
  nextItr(): ListIterator<T> {
    return new ListIterator(this._cur.next)
  }

  /**
   * @description: return prev iterator
   * @param {*}
   * @return {*}
   */
  prevItr(): ListIterator<T> {
    return new ListIterator(this._cur.prev)
  }

  /**
   * @description: remove by iterator
   * @param {*}
   * @return {*}
   */
  remove() {}

}
