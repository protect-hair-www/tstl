/*
 * @Author: hzheyuan
 * @Date: 2021-08-16 11:33:05
 * @LastEditTime: 2022-02-22 16:03:05
 * @LastEditors: hzheyuan
 * @Description: 关联式容器基础数据结构红黑树
 * @FilePath: \tstl\src\container\tree\Tree.ts
 */
import { RBTNode, Color } from './RBTNode'
import { RBTIterator }  from './Iterator'

export class Tree<K, V> {
  readonly nil = RBTNode.nilNode
  private _root: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>
  private _iterator;

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

  /**
   * @description: 容器存储结点大小
   * @return {*}
   */  
  get size(): number {
    return this.root.size
  }

  /**
   * @description: 判空
   * @return {*}
   */  
  get empty(): boolean {
    return this.root.size == 0
  }

  public iterator() {
    return this._iterator = new RBTIterator(this.root)
  }

  /**
   * @description: 创建一个红黑树结点
   * @param {K} key
   * @param {V} value
   * @return {*}
   */
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
    if (y === this.nil) return

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

    y.size = x.size
    x.size = x.left.size + x.right.size + 1
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
    if (x === this.nil) return

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

    x.size = y.size
    y.size = y.left.size + y.right.size + 1
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
      y.size++
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
    while (z.parent.color === Color.RED) {
      let y;
      if (z.parent === z.parent.parent.left) {
        // 插入结点的叔叔结点
        y = z.parent.parent.right
        // case 1: 插入结点z的叔叔结点y是红色的
        if (y.color === Color.RED) {
          z.parent.color = Color.BLACK
          y.color = Color.BLACK
          z.parent.parent.color = Color.RED
          z = z.parent.parent
        } else {
          // case 2: 插入的结点z的叔叔结点y是黑色的，并且z是一个右孩子 
          if (z === z.parent.right) {
            z = z.parent
            this.leftRotate(z)
          }
          // case 3: 插入的结点z的叔叔结点y是黑色的，并且z是一个左孩子 
          z.parent.color = Color.BLACK
          z.parent.parent.color = Color.RED
          this.rightRotate(z.parent.parent)
        }
      } else {
        y = z.parent.parent.left
        if (y.color === Color.RED) {
          z.parent.color = Color.BLACK
          y.color = Color.BLACK
          z.parent.parent.color = Color.RED
          z = z.parent.parent
        } else {
          if (z === z.parent.left) {
            z = z.parent
            this.rightRotate(z)
          }
          z.parent.color = Color.BLACK
          z.parent.parent.color = Color.RED
          this.leftRotate(z.parent.parent)
        }
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

  /**
   * @description: 替换过程：用一颗子树v替换另一棵子树u，并且将v作为u孩子的双亲结点
   * @param {RBTNode} u
   * @param {RBTNode} v
   * @return {*}
   */
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

  /**
   * @description: 删除结点
   * @param {RBTNode} z
   * @return {*}
   */
  private _delete(z: RBTNode<K, V>) {
    if (z === this.nil) return;

    // 从z到根的简单路径上，维护size属性 
    let p = z;
    while (p !== this.nil) {
      p.size--;
      p = p.parent;
    }

    let y = z
    let x
    let yOriginColor = y.color
    if (z.left === this.nil) {
      // case 1：删除结点z，没有左孩子
      // console.log('case 1', z, z.right);
      x = z.right
      this.transparent(z, z.right)
    } else if (z.right === this.nil) {
      // case 1：删除结点z，只有一个左孩子
      // console.log('case 2', z, z.left);
      x = z.left
      this.transparent(z, z.left)
    } else {
      y = this.minimum(z.right)
      yOriginColor = y.color
      x = y.right
      if (y.parent === z) {
        // case 3：删除结点z，既有左孩子又有右孩子，而且右孩子为z的后继
        // console.log('case 3', z, z.left);
        x.parent = y
      } else {
        // case 4：删除结点z，既有左孩子又有右孩子，右孩子不是z的后继
        this.transparent(y, y.right)
        y.right = z.right
        y.right.parent = y

        // 维护size属性
        let p = x.parent;
        while (p !== y) {
          p.size--;
          p = p.parent;
        }
        y.size = y.left.size + 1
      }
      this.transparent(z, y)
      y.left = z.left
      y.left.parent = y
      y.color = z.color

      // 维护size属性
      y.size = y.left.size + y.right.size + 1;
    }

    if (yOriginColor === Color.BLACK) {
      this.deleteFixup(x)
    }
  }

  /**
   * @description: 删除结点，对外接口
   * @param {K} x
   * @return {*}
   */
  public delete(x: K) {
    let z = this.find(x);
    this._delete(z);
  }

  /**
   * @description: 删除之后，维护红黑性质
   * @param {RBTNode} x
   * @param {*} V
   * @return {*}
   */
  private deleteFixup(x: RBTNode<K, V>) {
    let w;
    while (x !== this.root && x.color === Color.BLACK) {
      if (x === x.parent.left) {
        w = x.parent.right;
        if (w.color === Color.RED) {
          // case 1: x的兄弟结点w是红色的
          w.color = Color.BLACK
          w.parent.color = Color.RED
          this.leftRotate(x.parent)
          w = x.parent.right
        }
        if (w.left.color === Color.BLACK && w.right.color === Color.BLACK) {
          // case 2: x的兄弟结点w是黑色的， 并且w的两个子结点都是黑色的
          w.color = Color.RED
          x = x.parent
        } else {
          if (w.right.color === Color.BLACK) {
            // case 3: x的兄弟结点w是黑色的， w的左孩子是红色的，w的右孩子是黑色的
            w.left.color = Color.BLACK
            w.color = Color.RED
            this.rightRotate(w)
            w = x.parent.right
          }
          // case 4: x的兄弟结点w是黑色的， 并且w的孩子是红色的
          w.color = x.parent.color
          w.parent.color = Color.BLACK
          w.right.color = Color.BLACK
          this.leftRotate(x.parent)
          x = this.root
        }
      } else {
        // 对称情况
        w = x.parent.left
        if (w.color === Color.RED) {
          w.color = Color.BLACK
          w.parent.color = Color.RED
          this.rightRotate(x.parent)
          w = x.parent.left
        }
        if (w.right.color === Color.BLACK && w.left.color === Color.BLACK) {
          w.color = Color.RED
          x = x.parent
        } else {
          if (w.left.color === Color.BLACK) {
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
    }
    x.color = Color.BLACK
  }

  /**
   * @description: 子树中关键字最小的元素
   * @param {RBTNode} x
   * @param {*} V
   * @return {*}
   */
  private minimum(x: RBTNode<K, V>) {
    while (x.left !== this.nil) x = x.left
    return x
  }

  /**
   * @description: 子树中关键字最大的元素
   * @param {RBTNode} x
   * @param {*} V
   * @return {*}
   */
  private maximum(x: RBTNode<K, V>) {
    while (x.right !== this.nil) x = x.right
    return x
  }

  /**
   * @description: 结点前驱
   * @param {RBTNode} x
   * @param {*} V
   * @return {*}
   */
  preSuccessor(x: RBTNode<K, V>) {
    if(x === this.nil) return;
    if (x.left != this.nil) return this.maximum(x.left)
    let y = x.parent
    while (y !== this.nil && x === y.left) {
      x = y
      y = y.parent
    }
    return y
  }

  /**
   * @description: 结点后继
   * @param {RBTNode} x
   * @param {*} V
   * @return {*}
   */
  successor(x: RBTNode<K, V>) {
    if(x === this.nil) return;
    if (x.right != this.nil) return this.minimum(x.right)
    let y = x.parent
    while (y !== this.nil && x === y.right) {
      x = y
      y = y.parent
    }
    return y
  }

  /**
   * @description: 查找某个关键字元素，对外接口
   * @param {K} key
   * @return {*}
   */
  public find(key: K): RBTNode<K, V> {
    return this._find(this.root, key)
  }

  /**
   * @description: 查找某个关键字元素
   * @param {K} key
   * @return {*}
   */
  private _find(root: RBTNode<K, V>, key: K): RBTNode<K, V> {
    if (root === this.nil || root.key === key) {
      return root
    }
    if (key < root.key) {
      return this._find(root.left, key)
    } else {
      return this._find(root.right, key)
    }
  }

  /**
   * @description: 内部方法，查找具有给定秩的元素
   * @param {RBTNode} x
   * @param {number} i
   * @return {*}
   */
  private _select(x: RBTNode<K, V>, i: number) {
    if (i <= 0) return this.nil;
    let r = x.left.size + 1
    if (i === r) {
      return x;
    } else if (i < r) {
      return this._select(x.left, i)
    } else {
      return this._select(x.right, i - r)
    }
  }

  /**
   * @description: 查找具有给定秩的元素，对外方法
   * @param {number} i
   * @return {*}
   */
  public select(i: number) {
    return this._select(this.root, i)
  }

  /**
   * @description: 查询一个元素的秩
   * @param {RBTNode} T
   * @param {K} k
   * @return {*}
   */
  private _rank(T: RBTNode<K, V>, k: K) {
    let x = this.find(k)
    if (x === this.nil) return 0
    let r = x.left.size + 1
    let y = x
    while (y !== T) {
      if (y === y.parent.right) {
        r = r + y.parent.left.size + 1
      }
      y = y.parent
    }
    return r
  }

  /**
   * @description: 查询一个元素的秩
   * @param {K} k
   * @return {*}
   */
  public rank(k: K) {
    return this._rank(this.root, k);
  }

  /**
   * @description: 内部中序遍历实际实现
   * @param {RBTNode} x
   * @param {*} V
   * @return {*}
   */
  _inorderWalk(x: RBTNode<K, V>, cb?: (node) => unknown) {
    if (x === this.nil) return;
    if (x.left) this._inorderWalk(x.left, cb)
    if (cb) cb(x);
    if (x.right) this._inorderWalk(x.right, cb)
  }

  /**
   * @description: 对外提供中序遍历接口
   * @param {function} fn
   * @param {K} z
   * @return {*}
   */
  inorderWalk(fn?: (node) => unknown, z?: K) {
    let x
    if (z) x = this.find(z)
    if (x === this.nil || !x) x = this.root
    this._inorderWalk(x, fn);
  }
}
