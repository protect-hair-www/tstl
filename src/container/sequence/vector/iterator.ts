/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:08:41
 * @LastEditTime: 2022-03-19 17:56:00
 * @LastEditors: hzheyuan
 * @Description: vector容器迭代器
 * @FilePath: /tstl/src/container/sequence/vector/iterator.ts
 */
// import { Iterator } from '../../../Iterator/index'
import { RandomAccessIterator, IteratorTags, BaseIterator, equals } from '../../../iterator'

export class VCIterator<T> implements RandomAccessIterator<T> {
  readonly tag: IteratorTags = IteratorTags.BIDIRECTIONAL_ITERATOR
  _cur: number
  _cntr: T[]
  index: number 

  constructor(c, cntr: T[]) {
    this._cur = c
    this._cntr = cntr
    this.index = c
    // return new Proxy(this, {
    //   get: function (target, prop, receiver) {
    //     console.log('get', target, prop, Reflect.has(target, prop), receiver);
    //     if (Reflect.has(target, prop)) return Reflect.get(target, prop, receiver)
    //   },
    //   set: function (target, prop, value, receiver) {
    //     console.log(`set: `, target, prop, value, Reflect.has(target, prop));
    //     // if(prop === 'cur') {
    //     //   target.cur =  value
    //     // } else
    //     if(prop !== 'cur' && Reflect.has(target, prop)) {
    //       Reflect.set(target, prop, value, receiver);
    //       return true
    //     } else {
    //       target._cur = value;
    //       return true
    //     }
    //     return true
    //   }
    // })
  }

  // valueOf() {
  //   return this._cur
  // }

  private get cur() {
    return this._cur
  }

  private set cur(val) {
    this._cur = val
  }

  private get cntr() {
    return this._cntr
  }

  at(): T {
    return this.cntr[this.index]
  }

  equals<I extends BaseIterator<T>>(itr: I): boolean {
    return equals(this, itr)
  }

  /**
   * @description: access the index (getter)
   * @param {*}
   * @return {*}
   */
  get key() {
    return this.cur
  }

  /**
   * @description: return index
   * @param {*}
   * @return {*}
   */
  getKey() {
    return this.cur
  }

  /**
   * @description: get element value(same as get)
   * @return {*}
   */
  get value(): T {
    return this.cntr[this.cur]
  }

  /**
   * @description: get element value(same as get)
   * @return {*}
   */
  getValue(): T {
    return this.cntr[this.cur]
  }

  /**
   * @description:
   * @param {*}
   * @return {*}
   */
  set value(v: T) {
    if (this.cntr) this.cntr[this.cur] = v
  }

  /**
   * @description:
   * @param {*}
   * @return {*}
   */
  setValue(v: T) {
    if (this.cntr) this.cntr[this.cur] = v
  }

  /**
   * @description: access node (vector no need this method)
   * @param {*}
   * @return {*}
   */
  getNode(): number {
    return this.cur
  }

  /**
   * @description: test whether has next element (like jdk hasnext method)
   */
  hasNext(): boolean {
    return this.cur !== this.cntr.length
  }

  /**
   * @description: test whether has previous element
   * @param {*}
   * @return {*}
   */
  hasPrev(): boolean {
    return this.cur !== 0
  }

  equal(first: any, last: any): boolean {
    return first === last
  }

  /**
   * @description: same with has next (like jdk hasnext method)
   */
  done(): boolean {
    return !this.hasNext()
  }

  /**
   * @description: 迭代器后移，具体实现
   * @param {*}
   * @return {*}
   */
  increment(n: number = 1, c: boolean = true): RandomAccessIterator<T> {
    let cur = this.cur
    cur += n
    if (c) {
      this.cur += n
    }
    const itr: unknown = new VCIterator(cur, this.cntr)
    return itr as RandomAccessIterator<T>
  }

  /**
   * @description: 迭代器前移具体实现
   * @param {*}
   * @return {*}
   */
  decrement(n: number = 1, c: boolean = true): RandomAccessIterator<T> {
    let cur = this.cur
    cur -= n
    if (c) {
      this.cur -= n
    }
    const itr: unknown = new VCIterator(cur, this.cntr)
    return itr as RandomAccessIterator<T>
  }

  /**
   * @description: Javascript iterator protocol method next()
   * @param {*}
   * @return {*}
   */
  next(): IteratorResult<T> {
    // this.cur++
    // return this.cntr[this.cur]
    if (this.hasNext()) {
      const node: IteratorResult<T> = { done: false, value: this.getValue() }
      this.cur++
      return node
    } else {
      return { done: true, value: undefined }
    }
  }

  /**
   * @description: 迭代器前移接口
   * @param {*}
   * @return {*}
   */
  prev(): IteratorResult<T> {
    if (this.hasPrev()) {
      const node: IteratorResult<T> = { done: false, value: this.getValue() }
      this.cur--
      return node
    } else {
      return { done: true, value: undefined }
    }
  }

  /**
   * @description: distance of two interator
   * @param {*} begin
   * @param {*} end
   * @return {*}
   */
  static distance(begin, end) {
    const f = begin.getKey(),
      l = end.getKey()
    return l - f
  }

  /**
   * @description: erase the element by iterator
   * @param {*}
   * @return {*}
   */
  remove() {}

  /**
   * @description: Javascript iterable implementation
   * @param {*}
   * @return {*}
   */
  [Symbol.iterator]() {
    return this
  }
}
