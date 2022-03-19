/*
 * @Author: hzheyuan
 * @Date: 2022-02-22 16:02:55
 * @LastEditTime: 2022-03-19 15:21:36
 * @LastEditors: hzheyuan
 * @Description: 红黑树对应的迭代器
 * @FilePath: /tstl/src/container/tree/Iterator.ts
 */

import { RBTNode, Color } from './RBTNode'
// old version(will be delete)
export abstract class Iterator<T> {
  _cur

  // 迭代器指针操作
  abstract prev() // 迭代器前移，并返回迭代器所指向的元素
  abstract next() // 迭代器后移，并返回迭代器所指向的元素
  abstract done(): boolean // 是否遍历完
  abstract hasNext(): boolean // 同上done

  abstract getNode() // 获取迭代器结点
  abstract get() // 迭代器成员访问方法
  abstract getValue() // 获取值
  // abstract getKey()        // 获取键值，如果有的话
  abstract remove() // 通过迭代器删除
}

// import { RandomAccessIterator, BidirectionalIterator, IteratorTags } from '../../iterator'
// export interface RbIterator<T> extends BidirectionalIterator<T> {
//   // 迭代器指针操作
//   prev() // 迭代器前移，并返回迭代器所指向的元素
//   next() // 迭代器后移，并返回迭代器所指向的元素
//   done(): boolean // 是否遍历完
//   getNode() // 获取迭代器结点
//   get() // 迭代器成员访问方法
//   getValue() // 获取值
//   // abstract getKey()        // 获取键值，如果有的话
//   remove() // 通过迭代器删除
// }

const isNil = RBTNode.isNil

export class RBTIterator<K, V> extends Iterator<K> {
  _cur: RBTNode<K, V>

  constructor(c) {
    super()
    this._cur = c
  }

  private get cur() {
    return this._cur
  }

  private set cur(val) {
    this._cur = val
  }

  /**
   * @description: 内部使用方法，返回红黑树结点
   * @param {*} RBTNode
   * @return {*}
   */
  getNode = (): RBTNode<K, V> => {
    return this.cur
  }

  /**
   * @description: 获取迭代器指向成员，对外接口，返回结点值
   * @return {*}
   */
  get = (): V | boolean => {
    return this.isEnd() ? false : this.cur.getValue()
  }

  /**
   * @description: 获取迭代器指向成员，对外接口，返回结点值
   * @return {*}
   */
  value = (): V | boolean => {
    return this.isEnd() ? false : this.cur.getValue()
  }

  /**
   * @description: 获取迭代器指向成员，对外接口，返回结点值
   * @return {*}
   */
  getValue = (): V | boolean => {
    return this.isEnd() ? false : this.cur.getValue()
  }

  /**
   * @description 返回迭代器指针指向结点的key值
   * @return {*}
   */
  key = (): K | boolean => {
    return this.isEnd() ? false : this.cur.getKey()
  }

  /**
   * @description 返回迭代器指针指向结点的key值
   * @return {*}
   */
  getKey = (): K | boolean => {
    return this.isEnd() ? false : this.cur.getKey()
  }

  /**
   * @description: 迭代器是否位于end位置
   * @return {*}
   */
  private isEnd() {
    return (this.cur.key as any) === Symbol.for('header')
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
    return !this.isEnd()
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
  public next() {
    if (this.hasNext()) {
      const node = { done: false, value: this.cur.getValue() }
      this.increment()
      return node
    } else {
      return { done: true, value: null }
    }
  }

  /**
   * @description: 迭代器
   * @param {*}
   * @return {*}
   */
  [Symbol.iterator]() {
    return this
  }

  *_nodes() {
    while (this.hasNext()) {
      try {
        const entry = this.cur
        this.increment()
        yield entry
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**
   * @description: entries迭代器
   * @param {*}
   * @return {*}
   */
  *entries() {
    while (this.hasNext()) {
      try {
        const entry = { key: this.cur.key, value: this.cur.getValue() }
        this.increment()
        yield entry
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**
   * @description: keys迭代器
   * @param {*}
   * @return {*}
   */
  *keys() {
    while (this.hasNext()) {
      try {
        const key = this.cur.key
        this.increment()
        yield key
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**
   * @description: values迭代器
   * @param {*}
   * @return {*}
   */
  *values() {
    while (this.hasNext()) {
      const value = this.cur.getValue()
      this.increment()
      yield value
    }
  }

  /**
   * @description: 红黑树迭代器后移，具体实现
   * @param {*}
   * @return {*}
   */
  private increment(): void {
    if (!isNil(this.cur.right)) {
      // 如果有右孩子，向右走一步，然后一直往左走
      this.cur = this.cur.right
      while (!isNil(this.cur.left)) this.cur = this.cur.left
    } else {
      // 如果没有右孩子，找出父结点，向上查找，直到 “不为右孩子” 为止
      let y = this.cur.parent
      while (this.cur === y.right) {
        this.cur = y
        y = y.parent
      }
      // 此时右孩子不等于此时父结点，父结点为要找到的结点
      if (this.cur.right !== y) this.cur = y
    }
  }

  /**
   * @description: 红黑树迭代器前移具体实现
   * @param {*}
   * @return {*}
   */
  private decrement(): void {
    if (this.cur.color === Color.RED && this.cur.parent.parent === this.cur) {
      // header情况
      this.cur = this.cur.right
    } else if (!isNil(this.cur.left)) {
      let y = this.cur.left
      while (!isNil(y.right)) {
        y = y.right
      }
      this.cur = y
    } else {
      let y = this.cur.parent
      while (this.cur === y.left) {
        this.cur = y
        y = y.parent
      }
      this.cur = y
    }
  }

  /**
   * @description: 两个迭代器之间的距离
   * @param {*} begin
   * @param {*} end
   * @return {*}
   */
  static distance(begin, end) {
    let n = 0
    const first = begin
    while (first.hasNext() && first.getNode() !== end.getNode()) {
      first.next()
      n++
    }
    return n
  }

  remove() {}
}

// 测试方法
export const createRBTItr = (first) => {
  return {
    cur: first,

    [Symbol.iterator]() {
      return this
    },

    next() {
      this.increment()
      if (this.hasNext()) {
        return { done: false, value: this.cur.getKey() }
      } else {
        return { done: true }
      }
    },

    hasNext() {
      return this.cur.key !== Symbol.for('header')
    },

    keys() {
      const that = this
      return {
        [Symbol.iterator]() {
          return this
        },
        next() {
          that.increment()
          if (that.hasNext()) {
            return { done: false, value: that.cur.getKey() }
          } else {
            return { done: true }
          }
        }
      }
    },

    /**
     * @description: 红黑树迭代器后移，具体实现
     * @param {*}
     * @return {*}
     */
    increment(): void {
      if (!isNil(this.cur.right)) {
        // 如果有右孩子，向右走一步，然后一直往左走
        this.cur = this.cur.right
        while (!isNil(this.cur.left)) this.cur = this.cur.left
      } else {
        // 如果没有右孩子，找出父结点，向上查找，直到 “不为右孩子” 为止
        let p = this.cur.parent
        while (this.cur === p.right) {
          this.cur = p
          p = p.parent
        }
        // 此时右孩子不等于此时父结点，父结点为要找到的结点
        if (this.cur !== p) this.cur = p
      }
    },

    /**
     * @description: 红黑树迭代器前移具体实现
     * @param {*}
     * @return {*}
     */
    decrement(): void {
      if (this.cur.color === Color.RED && this.cur.parent.parent === this.cur) {
        // header情况
        this.cur = this.cur.right
      } else if (!isNil(this.cur.left)) {
        let y = this.cur.left
        while (!isNil(y.right)) {
          y = y.right
        }
        this.cur = y
      } else {
        let y = this.cur.parent
        while (this.cur === y.left) {
          this.cur = y
          y = y.parent
        }
        this.cur = y
      }
    }
  }
}
