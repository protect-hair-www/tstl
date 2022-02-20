/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:33:05
 * @LastEditTime: 2022-02-20 14:55:25
 * @LastEditors: hzheyuan
 * @Description: 关联式容器基础数据结构红黑树
 * @FilePath: /tstl/src/container/tree/Tree.ts
 */
import { RBTNode, Color } from './RBTNode'

export class Tree<K, V> {
  readonly nil = RBTNode.nilNode

  private _root: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>
  private size: number = 0;

  // 比较器Comparator
  // private key_comp: (a: K, b: K) => boolean = (a: K, b: K) => (a - b) > 0;
  constructor(comparator?: (a: K, b: K) => boolean) {
    // if(comparator) this.key_comp = comparator;
  }

  get root() {
    return this._root
  }

  set root(node) {
    this._root = node
  }

  private createRBTNode(key: K, value: V) {
    const node = new RBTNode<K, V>(key, value)
    return node;
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
    let y = x.right

    // 更新b与y的关系
    x.right = y.left
    if (y.left !== this.nil) {
      y.left.parent = x
    }

    // 更新p与x的关系
    y.parent = x.parent
    if (x.parent === this.nil) {
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
   * @param {RBTNode} y
   * @return {*}
   *     p             p
   *     |             |
   *     y  =======>   x
   *    / \           / \
   *   x   r         a   y
   *  / \               / \
   * a  b              b   r
   */
  rightRotate(y: RBTNode<K, V>) {
    // 记录y
    let x = y.left

    // 更新b与y的关系
    y.left = x.right
    if (x.right !== this.nil) {
      x.right.parent = y
    }

    // 更新p与x的关系
    x.parent = y.parent
    if (y.parent === this.nil) {
      this.root = x
    } else if (y === y.parent.right) {
      y.parent.right = x
    } else {
      y.parent.left = x
    }

    // 更新x与y的关系
    x.right = y
    y.parent = x
  }

  /**
   * @description: 插入一个结点
   * @param {RBTNode} z
   * @return {*}
   */
  private _insert(key: K, value: V) {
    let z = this.createRBTNode(key, value)
    let y = this.nil
    let x = this.root

    while (x !== this.nil) {
      y = x
      if (z.key < x.key) {
        x = x.left
      } else {
        x = x.right
      }
    }
    z.parent = y

    if (y === this.nil) {
      this.root = z
    } else if (z.key < y.key) {
      y.left = z
    } else {
      y.right = z
    }

    z.left = this.nil
    z.right = this.nil
    z.color = Color.RED
    this.insertFixup(z)
  }

  /**
   * @description: 插入之后维护红黑性质
   * @param {RBTNode} z
   * @param {*} V
   * @return {*}
   */  
  private insertFixup(z: RBTNode<K, V>) {
    while (z.parent !== this.nil && z.parent.color === Color.RED) {
      let y;
      if (z.parent === z.parent.parent.left) {
        // 插入结点的叔叔结点
        y = z.parent.parent.right
        // case 1: 插入结点z的叔叔结点y是红色的
        if (y !== this.nil && y.color === Color.RED) {
          z.parent.color = Color.BLACK
          y.color = Color.BLACK
          z.parent.parent.color = Color.RED
          z = z.parent.parent
          continue;
        }
        // case 2: 插入的结点z的叔叔结点y是黑色的，并且z是一个右孩子 
        if (z === z.parent.right) {
          z = z.parent
          this.leftRotate(z)
        }
        // case 3: 插入的结点z的叔叔结点y是黑色的，并且z是一个左孩子 
        z.parent.color = Color.BLACK
        z.parent.parent.color = Color.RED
        this.rightRotate(z.parent.parent)
      } else {
        y = z.parent.parent.left
        if (y !== this.nil && y.color === Color.RED) {
          z.parent.color = Color.BLACK
          y.color = Color.BLACK
          z.parent.parent.color = Color.RED
          z = z.parent.parent
          continue;
        }
        if (z === z.parent.left) {
          z = z.parent
          this.rightRotate(z)
        }
        z.parent.color = Color.BLACK
        z.parent.parent.color = Color.RED
        this.leftRotate(z.parent.parent)
      }
    }
    this.root.color = Color.BLACK
  }

  /**
   * @description: 对外提供的插入接口
   * @param {V} v
   * @return {*}
   */  
  public insert(v: V) {
    let key: unknown = v
    this._insert(key as K, v)
  }

  /**
   * @description: 插入节点的键值(key)在整颗树中必须独一无二（如果存在相同的键值，插入操作不会真正进行）
   * @param {*}
   * @return {*}
   */  
  insert_unique() {

  }

  /**
   * @description: 可以插入有重复键值的结点，与insert_unique相反
   * @param {*}
   * @return {*}
   */  
  insert_equal() {

  }

  private transparent(u: RBTNode<K, V>, v: RBTNode<K, V>) {
    if (u.parent === this.nil) {
      this.root = v
    } else if (u === u.parent.left) {
      u.parent.left = v
    } else {
      u.parent.right = v
    }
    v.parent = u.parent
  }

  delete(z: RBTNode<K, V>) {
    let y = z
    let x
    let yOriginColor = y.color
    if (z.left === this.nil) {
      x = z.right
      this.transparent(z, z.right)
    } else if (z.right === this.nil) {
      x = z.left
      this.transparent(z, z.left)
    } else {
      y = this.minimum(z.right)
      yOriginColor = y.color
      x = y.right
      if (y.parent === z) {
        x.parent = y
      } else {
        this.transparent(y, y.right)
        y.right = z.right
        y.right.parent = y
      }
      this.transparent(z, y)
      y.left = z.left
      y.left.parent = y
      y.color = z.color
    }
    if (yOriginColor === Color.BLACK) {
      this.deleteFixup(x)
    }
  }

  private minimum(x: RBTNode<K, V>) {
    while (x.left !== this.nil) x = x.left
    return x
  }

  private maximum(x: RBTNode<K, V>) {
    while (x.right !== this.nil) x = x.right
    return x
  }

  private deleteFixup(x: RBTNode<K, V>) {
    while (x !== this.root && x.color === Color.BLACK) {
      if (x === x.parent.left) {
        let w = x.parent.right
        if (w.color === Color.RED) {
          w.color = Color.BLACK
          w.parent.color = Color.RED
          this.leftRotate(x.parent)
          w = x.parent.right
        }
        if (w.left.color === Color.BLACK && w.right.color === Color.BLACK) {
          w.color = Color.RED
          x = x.parent
        } else if (w.right.color === Color.BLACK) {
          w.left.color = Color.BLACK
          w.color = Color.RED
          this.rightRotate(w)
          w = x.parent.right
        }
        w.color = x.parent.color
        w.parent.color = Color.BLACK
        w.right.color = Color.BLACK
        this.leftRotate(x.parent)
        x = this.root
      } else {
        let w = x.parent.left
        if (w.color === Color.RED) {
          w.color = Color.BLACK
          w.parent.color = Color.RED
          this.rightRotate(x.parent)
          w = x.parent.left
        }
        if (w.right.color === Color.BLACK && w.left.color === Color.BLACK) {
          w.color = Color.RED
          x = x.parent
        } else if (w.left.color === Color.BLACK) {
          w.right.color = Color.BLACK
          w.color = Color.RED
          this.leftRotate(w)
          w = x.parent.left
        }
        w.color = x.parent.color
        w.parent.color = Color.BLACK
        w.left.color = Color.BLACK
        this.rightRotate(x.parent)
        x = this.root
      }
    }
    x.color = Color.BLACK
  }

  preSuccessor(x: RBTNode<K, V>) {
    if (x.left != this.nil) return this.maximum(x.left)
    let y = x.parent
    while (y !== this.nil && x === y.left) {
      x = y
      y = y.parent
    }
    return y
  }

  successor(x: RBTNode<K, V>) {
    if (x.right != this.nil) return this.minimum(x.right)
    let y = x.parent
    while (y !== this.nil && x === y.right) {
      x = y
      y = y.parent
    }
    return y
  }

  find(key: K): RBTNode<K, V> {
    return this.findByRoot(this.root, key)
  }

  findByRoot(root: RBTNode<K, V>, key: K): RBTNode<K, V> {
    if (root === this.nil || root.key === key) {
      return root
    }
    if (key < root.key) {
      return this.findByRoot(root.left, key)
    } else {
      return this.findByRoot(root.right, key)
    }
  }

  inorderWalk(x: RBTNode<K, V>) {
    if(x === this.nil) {
      return;
    }
    if(x.left) this.inorderWalk(x.left)
    console.log(x.key);
    if(x.right) this.inorderWalk(x.right);
  }  

}
