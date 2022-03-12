/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:08:41
 * @LastEditTime: 2022-03-12 15:56:00
 * @LastEditors: hzheyuan
 * @Description: vector容器迭代器
 * @FilePath: /tstl/src/container/sequence/deque/iterator.ts
 */
import { RandomAccessIterator } from '@/Iterator/'

export class DequeIterator<T> implements RandomAccessIterator<T> {
  _cur: number
  _cntr

  constructor(c, cntr) {
    this._cur = c
    this._cntr = cntr
  }

  private get cur() {
    return this._cur
  }

  private set cur(val) {
    this._cur = val
  }

  private get cntr() {
    return this._cntr
  }

  /**
   * @description: access current index (getter)
   * @param {*}
   * @return {*}
   */
  get key(): number {
    return this.cur
  }

  /**
   * @description: get current index
   * @param {*}
   * @return {*}
   */
  public getKey() {
    return this.cur
  }

  /**
   * @description: access the element(same as getValue)
   * @return {*}
   */
  get value(): T {
    return this._cntr[this.cur]
  }

  /**
   * @description: access the element (getter)
   * @return {*}
   */
  public getValue (): T {
    return this._cntr[this.cur]
  }

  /**
   * @description: access node (vector no need this method)
   * @param {*}
   * @return {*}
   */
  public getNode(): number {
    return this.cur
  }

  /**
   * @description: test whether has next element(iteratro can increment)
   */
  public hasNext(): boolean {
    return this.cur !== this._cntr.length
  }

  /**
   * @description: test whether has previous element
   * @param {*}
   * @return {*}
   */  
  public hasPrev(): boolean {
    return this.cur !== 0
  }

  /**
   * @description: iterator at the end
   */
  public done(): boolean {
    return !this.hasNext()
  }

  /**
   * @description: iterator goto next
   * @param {*}
   * @return {*}
   */
  increment(): void {
    this.cur++
  }

  /**
   * @description: iterator goto prev
   * @param {*}
   * @return {*}
   */
  decrement(): void {
    this.cur--
  }

  /**
   * @description: iterator decrement and return the element
   * @param {*}
   * @return {*}
   */
  public next(): IteratorResult<T> {
    // this.increment()
    // return this.cntr[this.cur]
    if (this.hasNext()) {
      const node = { done: false, value: this.cntr[this.cur] }
      this.increment()
      return node
    } else {
      return { done: true, value: undefined }
    }
  }


  /**
   * @description: iterator increment and return the element
   * @param {*}
   * @return {*}
   */
  public prev(): IteratorResult<T> {
    if (this.hasNext()) {
      const node = { done: false, value: this.cntr[this.cur] }
      this.decrement()
      return node
    } else {
      return { done: true, value: undefined }
    }
  }

  /**
   * @description: distance of to iterator
   * @param {*} begin
   * @param {*} end
   * @return {*}
   */
  static distance(begin, end) {
    const f = begin.getKey(), l = end.getKey()
    return l - f
  }

  /**
   * @description: remove the interator element
   * @param {*}
   * @return {*}
   */
  remove() { }

  /**
   * @description: Javascript iterator protocol
   * @param {*}
   * @return {*}
   */
  [Symbol.iterator](): Iterator<T> {
    return {
      next: () => {
        if (this.hasNext()) {
          let node = { done: false, value: this.cntr[this.cur] }
          this.increment()
          return node
        } else {
          return { done: true, value: undefined }
        }
      }
    }
  }
}

