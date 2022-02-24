/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 14:10:10
 * @LastEditTime: 2022-02-24 15:04:50
 * @LastEditors: hzheyuan
 * @Description: 关联容器基础数据结构红黑树的结点类
 * @FilePath: \tstl\src\container\tree\RBTNode.ts
 */
export enum Color {
  RED,
  BLACK
}

export class RBTNode<K, V> {
  readonly _key: K
  _data: V

  private _parent: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>
  private _left: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>
  private _right: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>
  private _color: Color = Color.BLACK
  private _size: number = 0

  static readonly nilNode: RBTNode<any, any> = new (class extends RBTNode<unknown, unknown> {
    constructor() {
      super(Symbol.for('nil'), Symbol.for('nil'))
      this._left = this._right = this;
      (this._parent as any) = null;
      this._color = Color.BLACK
      this._size = 0
    }
  })()

  constructor(key: K, v: V) {
    this._key = key
    this._data = v
    this._size = 1
  }

  get data() {
    return this._data
  }

  get key() {
    return this._key
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

  static isNil(node: RBTNode<unknown, unknown>): boolean {
    return node.key === Symbol.for('nil')
  }
}
