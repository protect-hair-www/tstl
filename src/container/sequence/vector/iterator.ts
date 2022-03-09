/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:08:41
 * @LastEditTime: 2022-03-09 18:55:55
 * @LastEditors: hzheyuan
 * @Description: vector容器迭代器
 * @FilePath: \tstl\src\container\sequence\vector\iterator.ts
 */
import { Iterator } from '../../../Iterator/index'

export class VCIterator<T> extends Iterator<T> {
  _cur: number
  _cntr

  constructor(c, cntr) {
    super()
    this._cur = c
    this._cntr = cntr
    return new Proxy(this, {
      get: function (target, prop, receiver) {
        // console.log('get', target, prop, Reflect.has(target, prop), receiver);
        if (Reflect.has(target, prop)) return Reflect.get(target, prop, receiver)
      },
      set: function (target, prop, value, receiver) {
        console.log(`set: `, target, prop, value, Reflect.has(target, prop));
        // if(prop === 'cur') {
        //   target.cur =  value
        // } else
        if(prop !== 'cur' && Reflect.has(target, prop)) {
          Reflect.set(target, prop, value, receiver);
          return true
        } else {
          target._cur = value;
          return true
        }
        return true
      }
    })
  }

  private get cur() {
    return this._cur
  }

  private set cur(val) {
    this._cur = val
  }

  /**
   * @description: 获取迭代器指向成员，对外接口，返回结点值
   * @return {*}
   */
  get = (): T | boolean => {
    return this.hasNext() ? this._cntr[this.cur] : false
  }

  /**
   * @description: 获取迭代器指向成员，对外接口，返回结点值
   * @return {*}
   */
  value = (): T | boolean => {
    return this.hasNext() ? this._cntr[this.cur] : false
  }

  /**
   * @description: 获取迭代器指向成员，对外接口，返回结点值
   * @return {*}
   */
  getValue = (): T | boolean => {
    return this.hasNext() ? this._cntr[this.cur] : false
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
   * @description: 迭代器是否位于end位置
   * @return {*}
   */
  private isEnd() {
    return this.cur === this._cntr.length
  }

  /**
   * @description: 同下done方法，jdk方法
   */
  hasNext(): boolean {
    return !this.isEnd()
  }

  /**
   * @description: 迭代结束条件
   */
  done(): boolean {
    return this.isEnd()
  }

  /**
   * @description: 迭代器前移接口
   * @param {*}
   * @return {*}
   */
  prev() {
    this.decrement()
    return this
  }

  /**
   * @description: 测试next方法
   * @param {*}
   * @return {*}
   */
  private _next() {
    this.increment()
    return this
  }

  /**
   * @description: js迭代协议规定的next方法
   * @param {*}
   * @return {*}
   */
  public next(): VCIterator<T> {
    return new VCIterator(++this.cur, this._cntr)
  }

  /**
   * @description: 迭代器
   * @param {*}
   * @return {*}
   */
  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.hasNext()) {
          let node = { done: false, value: this._cntr[this.cur] }
          this.increment()
          return node
        } else {
          return { done: true, value: null }
        }
      }
    }
  }

  *_nodes() {
    while (this.hasNext()) {
      try {
        let entry = this._cntr[this.cur]
        this.increment()
        yield entry
      } catch (error) {
        console.log(error)
      }
    }
  }

  //   /**
  //    * @description: entries迭代器
  //    * @param {*}
  //    * @return {*}
  //    */
  //   *entries() {
  //     while (this.hasNext()) {
  //       try {
  //         let entry = { key: this.cur.key, value: this.cur.getValue() }
  //         this.increment()
  //         yield entry
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //   }

  //   /**
  //    * @description: keys迭代器
  //    * @param {*}
  //    * @return {*}
  //    */
  //   *keys() {
  //     while (this.hasNext()) {
  //       try {
  //         let key = this.cur.key
  //         this.increment()
  //         yield key
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //   }

  //   /**
  //    * @description: values迭代器
  //    * @param {*}
  //    * @return {*}
  //    */
  //   *values() {
  //     while (this.hasNext()) {
  //       let value = this.cur.getValue()
  //       this.increment()
  //       yield value
  //     }
  //   }

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
   * @description: 两个迭代器之间的距离
   * @param {*} begin
   * @param {*} end
   * @return {*}
   */
  static distance(begin, end) {
    let f = begin.getNode(), l = end.getNode()
    return l - f
  }

  remove() { }
}

