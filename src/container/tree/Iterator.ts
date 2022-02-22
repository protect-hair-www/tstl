/*
 * @Author: hzheyuan
 * @Date: 2022-02-22 16:02:55
 * @LastEditTime: 2022-02-22 21:25:17
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/container/tree/Iterator.ts
 */
import { Iterator } from '../../Iterator/index'
import { RBTNode, Color } from './RBTNode'
const isNil = RBTNode.isNil;

export class RBTIterator extends Iterator {
  _root;

  constructor(root) {
    super();
    this._root = root;
    this._cur = this.begin;
  }

  get root() {
    return this._root;
  }

  get begin() {
    if (!isNil(this.root)) return this.minmum()
  }

  get end() {
    return RBTNode.nilNode;
  }

  private get cur() {
    return this._cur
  }

  private set cur(val) {
    this._cur = val;
  }

  hasNext(): boolean {
    return false
  }

  minmum() {
    let x = this.root
    while (!isNil(x.left)) x = x.left
    return x
  }

  maxmum() {
    let x = this.root
    while (!isNil(x.right)) x = x.right
    return x
  }

  /**
   * @description: 迭代器前移接口
   * @param {*}
   * @return {*}
   */
  prev() {
    this.decrement()
  }

  /**
   * @description: 迭代协议next接口
   * @param {*}
   * @return {*}
   */
  next() {
    this.increment()
  }

  /**
   * @description: 获取迭代器指向成员
   * @param {*}
   * @return {*}
   */
  get() {
    return this.cur
  }

  /**
   * @description: 红黑树迭代器后动具体实现
   * @param {*}
   * @return {*}
   */
  increment(): void {
    if (isNil(this.cur)) return
    if (!isNil(this.cur.right)) {
      this.cur = this.cur.right
      while (!isNil(this.cur.left)) this.cur = this.cur.left
    } else {
      let p = this.cur.parent
      while (this.cur === p.right) {
        this.cur = p
        p = p.parent
      }
      if (this.cur !== p) this.cur = p
    }
  }

  /**
   * @description: 红黑树迭代器前移具体实现
   * @param {*}
   * @return {*}
   */
  decrement(): void {
    if (isNil(this.cur)) return this.cur = this.maxmum()
    if (this.cur.color === Color.RED && this.cur.parent.parent === this.cur)
      this.cur = this.cur.right
    else if (!isNil(this.cur.left)) {
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

  remove() {

  }
}

