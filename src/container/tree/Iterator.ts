/*
 * @Author: hzheyuan
 * @Date: 2022-02-22 16:02:55
 * @LastEditTime: 2022-02-24 22:40:59
 * @LastEditors: hzheyuan
 * @Description:
 * @FilePath: /tstl/src/container/tree/Iterator.ts
 */
import { Iterator } from '../../Iterator/index'
import { RBTNode, Color } from './RBTNode'
const isNil = RBTNode.isNil

export class RBTIterator<K, V> extends Iterator {
  _cur: RBTNode<K, V>;

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
   * @description: 同下done方法
   */  
  hasNext(): boolean {
    return this._cur === RBTNode.nilNode
  }

  /**
   * @description: 迭代结束条件
   */  
  done(): boolean {
    return this._cur === RBTNode.nilNode
  }

  /**
   * @description: 迭代器前移接口
   * @param {*}
   * @return {*}
   */
  prev() {
    this.decrement()
    return this;
  }

  /**
   * @description: 迭代协议next接口
   * @param {*}
   * @return {*}
   */
  next() {
    this.increment()
    return this;
  }

  /**
   * @description: 获取迭代器指向成员
   * @param {*}
   * @return {*}
   */
  get(): RBTNode<K, V> {
    return this.cur
  }

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
  }

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

  remove() {}
}
