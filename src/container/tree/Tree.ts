/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:33:05
 * @LastEditTime: 2022-02-16 18:03:06
 * @LastEditors: hzheyuan
 * @Description: 关联式容器基础数据结构红黑树
 * @FilePath: \tstl\src\container\tree\Tree.ts
 */

import { RBTNode } from './RBTNode'

export class Tree<K, V> {
  public _root: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>

  constructor() {}

  get root() {
    return this._root
  }

  set root(node) {
    this._root = node
  }

  /**
   * @description: 左旋
   * @param {RBTNode} x
   * @return {*}
   *   p              p
   *   |              |
   *   x   =======>   y
   *  / \            / \
   * a   y          x   r
   *    / \        / \
   *   b   r      a  b
   */
  leftRotate(x: RBTNode<K, V>) {
    // 记录y
    const y = x.right

    // 更新b与y的关系
    x.right = y.left
    if (y.left != RBTNode.nilNode) {
      y.left.parent = x
    }

    // 更新p与x的关系
    y.parent = x.parent
    if (x.parent === RBTNode.nilNode) {
      this.root = y
    } else if (x === x.parent.left) {
      x.parent.left = y
    } else {
      x.parent.right = y
    }

    // 更新x与y的关系
    y.left = x
    x.parent = y
  }

  /**
   * @description: 右旋
   * @param {RBTNode} x
   * @return {*}
   *     p             p
   *     |             |
   *     y  =======>   x
   *    / \           / \
   *   x   r         a   y
   *  / \               / \
   * a  b              b   r
   */
  rightRotate(x: RBTNode<K, V>) {
    // 记录y
    const y = x.left

    // 更新b与y的关系
    x.left = y.right
    if (y.right != RBTNode.nilNode) {
      y.right.parent = x
    }

    // 更新p与x的关系
    y.parent = x.parent
    if (x.parent === RBTNode.nilNode) {
      this.root = y
    } else if (x === x.parent.left) {
      x.parent.right = y
    } else {
      x.parent.left = y
    }

    // 更新x与y的关系
    y.right = x
    x.parent = y
  }

  insert(z: RBTNode<K, V>) {
    const nil = RBTNode.nilNode
    let y = nil
    let x = this.root

    while (x !== nil) {
      y = x
      if (z.key < x.key) {
        x = x.left
      } else {
        x = x.right
      }
      z.parent = y
    }
  }
}
