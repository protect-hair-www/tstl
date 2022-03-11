/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:08:41
 * @LastEditTime: 2022-03-11 17:29:49
 * @LastEditors: hzheyuan
 * @Description: vector容器迭代器
 * @FilePath: \tstl\src\container\sequence\vector\iterator.ts
 */
// import { Iterator } from '../../../Iterator/index'
import { ListIterator } from '@/Iterator/Iterator'

export class VCIterator<T> implements ListIterator<T> {
  _cur: number
  _cntr: Array<T>

  constructor(c, cntr: Array<T>) {
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
  private increment(): void {
    this.cur++
  }

  /**
   * @description: 迭代器前移具体实现
   * @param {*}
   * @return {*}
   */
  private decrement(): void {
    this.cur--
  }

  /**
   * @description: Javascript iterator protocol method next()
   * @param {*}
   * @return {*}
   */
  next():IteratorResult<T> {
    // this.cur++
    // return this.cntr[this.cur]
    if (this.hasNext()) {
      let node: IteratorResult<T> = { done: false, value: this.getValue() }
      this.increment()
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
      let node: IteratorResult<T> = { done: false, value: this.getValue() }
      this.decrement()
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
    const f = begin.getKey(), l = end.getKey()
    return l - f
  }

  /**
   * @description: erase the element by iterator
   * @param {*}
   * @return {*}
   */
  remove() { }

  /**
   * @description: Javascript iterable implementation
   * @param {*}
   * @return {*}
   */
  [Symbol.iterator]() {
    return this
  }
}
