/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:08:41
 * @LastEditTime: 2022-03-23 23:07:08
 * @LastEditors: hzheyuan
 * @Description: linear type container iterator
 * @FilePath: /tstl/src/iterator/impls/LinearIterator.ts
 */
import { RandomAccessIterator, IteratorTags, IteratorTypes } from '../index'
import { LinearIteratorBase }  from './LinearIteratorBase'

export class LinearIterator<T> extends LinearIteratorBase<T> {
  readonly tag: IteratorTags = IteratorTags.RANDOM_ACCESS_ITERATOR

  constructor(c, cntr: T[]) {
    super(c, cntr)
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


  copy(): IteratorTypes<T> {
    return new LinearIterator<T>(this.cur, this.cntr)
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
    const itr: unknown = new LinearIterator<T>(cur, this.cntr)
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
    const itr: unknown = new LinearIterator(cur, this.cntr)
    return itr as RandomAccessIterator<T>
  }
}
