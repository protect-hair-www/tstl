/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 14:10:10
 * @LastEditTime: 2022-03-03 11:42:24
 * @LastEditors: hzheyuan
 * @Description: 关联容器基础数据结构红黑树的结点类
 * @FilePath: \tstl\src\container\tree\RBTNode.ts
 */
import { Entry } from './Entry'

export enum Color {
  RED,
  BLACK
}

export class RBTNode<K, V> extends Entry<K, V> {
  private _parent: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>
  private _left: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>
  private _right: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>
  private _color: Color = Color.BLACK
  private _size: number = 0
  private _entry: Entry<K, V>

  static readonly nilNode: RBTNode<any, any> = new (class extends RBTNode<unknown, unknown> {
    constructor() {
      super(Symbol.for('nil'), Symbol.for('nil'))
      this._left = this._right = this;
      (this._parent as any) = null;
      this._color = Color.BLACK
      this._size = 0
    }
  })()

  static isNil(node: RBTNode<unknown, unknown>): boolean {
    return node.key === Symbol.for('nil')
  }

  constructor(k: K, v: V) {
    super(k, v)
    this.key = k
    this.value = v
    this._size = 1
    this._entry = new Entry(k, v)
  }

  get left() {
    return this._left
  }

  get right() {
    return this._right
  }

  get parent() {
    return this._parent
  }

  get color() {
    return this._color
  }

  get size() {
    return this._size
  }

  set left(node) {
    this._left = node
  }

  set right(node) {
    this._right = node
  }

  set parent(node) {
    this._parent = node
  }

  set color(color) {
    this._color = color
  }

  set size(sz) {
    this._size = sz
  }

}
