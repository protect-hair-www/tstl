/*
 * @Author: hzheyuan
 * @Date: 2022-03-23 13:04:12
 * @LastEditTime: 2022-03-27 23:12:33
 * @LastEditors: hzheyuan
 * @Description: abstract class implemetation for linear iterator
 * @FilePath: /tstl/src/iterator/impls/LinearIteratorBase.ts
 */
import { RandomAccessIterator, IteratorTags, IteratorTypes, BaseIterator, equals } from '../index'

export abstract class LinearIteratorBase<T> implements RandomAccessIterator<T> {
  readonly tag: IteratorTags = IteratorTags.RANDOM_ACCESS_ITERATOR
  _cur: number
  _cntr: T[]

  constructor(c, cntr: T[]) {
    this._cur = c
    this._cntr = cntr
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
  //   console.log('value of')
  // }

  get cur() {
    return this._cur
  }

  set cur(val) {
    this._cur = val
  }

  protected get cntr() {
    return this._cntr
  }

  get index() {
      return this.cur
  }

  getIndex() {
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
   * @description: 
   * @param {number} idx
   * @return {*}
   */  
  at(idx: number): T {
    return this.cntr[idx]
  }

  /**
   * @description: 
   * @param {I} itr
   * @return {*}
   */
  equals<T, I extends IteratorTypes<T>>(itr: I) {
      return this.cur == itr.cur
  }

  abstract copy(): LinearIteratorBase<T>

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

  /**
   * @description: 迭代器后移，具体实现
   * @param {*}
   * @return {*}
   */
  abstract increment(n: number, c: boolean): RandomAccessIterator<T>;

  /**
   * @description: 迭代器前移具体实现
   * @param {*}
   * @return {*}
   */
  abstract decrement(n: number, c: boolean): RandomAccessIterator<T>;

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
   * @description: Javascript iterable implementation
   * @param {*}
   * @return {*}
   */
  [Symbol.iterator]() {
    return this
  }
}

