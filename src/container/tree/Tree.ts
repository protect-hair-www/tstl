/*
 * @Author: hzheyuan
 * @Date: 2021-08-16 11:33:05
 * @LastEditTime: 2022-02-24 18:18:04
 * @LastEditors: hzheyuan
 * @Description: 关联式容器基础数据结构红黑树
 * RB-Tree是一棵二叉查找树,并且具备有以下性质:
 * 红黑树的性质：
 *    (1)每个节点或是红色的,或是黑色的.
 *    (2)根节点是黑色的.
 *    (3)每个叶节点（NULL）是黑色的.
 *    (4)如果一个节点是红色的，则它的两个孩子节点都是黑色的.
 *    (5)对每个节点，从该节点到其所有后代叶节点的简单路径上，均包含相同数目的黑色节点.
 * @FilePath: \tstl\src\container\tree\Tree.ts
 */
import { RBTNode, Color } from './RBTNode'
import { RBTIterator } from './Iterator'
const isNil = RBTNode.isNil

export class Tree<K, V> {
  // stl实现的红黑树有一个新增的header结点(doing)
  // header结点不仅指向root，也指向红黑树的leftMost和rightMost，以便在O(1)时间内获取begin指针
  // 同时header指针也可以在set的union操作时实现线性时间的复杂度
  // 指向大致如下：
  // ==================================================================================
  //    ----header-----
  //    |    ||       |
  //    |   root      |
  //    |  /   \      |
  //   leftMost rightMost
  // ==================================================================================
  private _header: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>
  // 红黑树根结点，通过header.parent获取
  private _root: RBTNode<K, V> = RBTNode.nilNode as RBTNode<K, V>
  // 空结点(红黑树叶子结点)
  readonly nil = RBTNode.nilNode
  // 比较器Comparator
  private key_comp: (a: K, b: K) => boolean = (a, b) => (a as any) - (b as any) < 0
  constructor(comparator?: (a: K, b: K) => boolean) {
    if (comparator) this.key_comp = comparator
    this.createHeader()
  }

  private get header() {
    return this._header
  }

  private set header(x) {
    this._header = x
  }

  get root() {
    return this.header.parent
    // return this._root
  }

  set root(node) {
    this.header.parent = node
    // this._root = node
  }

  // 树中结点数量
  _size = 0
  /**
   * @description: 容器存储结点大小
   * @return {*}
   */
  get size(): number {
    return this._size
  }

  set size(n) {
    this._size = n
  }

  get count() {
    return this._size
  }

  /**
   * @description: 判空
   * @return {*}
   */
  get empty(): boolean {
    return this.size === 0
  }

  /**
   * @description: 迭代器
   * @return {*} Iterator
   */  
  public iterator = (): RBTIterator<K, V> => {
    return new RBTIterator(this.leftMost)
  }

  /**
   * @description: begin迭代器
   * @param {*} RBTIterator
   * @return {*}
   */  
  public begin = (): RBTIterator<K, V> => {
    return new RBTIterator(this.leftMost)
  }

  /**
   * @description: end迭代器
   * @param {*} RBTIterator
   * @return {*}
   */  
  public end = (): RBTIterator<K, V> => {
    return new RBTIterator(this.header)
  }

  /**
   * @description: 创建一个红黑树结点
   * @param {K} key
   * @param {V} value
   * @return {*}
   */
  private createRBTNode(key: K, value: V) {
    // const node =
    return new RBTNode<K, V>(key, value)
  }

  /**
   * @description: 创建header结点
   */
  private createHeader = () => {
    let key, v
    key = v = Symbol.for('header')
    this.header = this.createRBTNode(key, v) as RBTNode<K, V>

    this.root = RBTNode.nilNode
    this.header.color = Color.RED

    // header几个指针的指向
    this.leftMost = this.header
    this.rightMost = this.header
    // this.header.parent = this.root
  }

  // 树中最左侧结点
  get leftMost() {
    return this.header.left
  }

  set leftMost(x) {
    this.header.left = x
  }

  // 树中最右侧结点
  get rightMost() {
    return this.header.right
  }

  set rightMost(x) {
    this.header.right = x
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
  leftRotate = (x: RBTNode<K, V>) => {
    // 记录y
    const y = x.right
    // if (isNil(y)) return

    // 更新b与y的关系
    x.right = y.left
    if (!isNil(y)) {
      y.left.parent = x
    }

    // 更新p与x的关系
    y.parent = x.parent
    // if (isNil(x.parent)) {
    //   this.root = y
    // } 
    if (x === this.root) {
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
  rightRotate = (y: RBTNode<K, V>) => {
    // 记录y
    const x = y.left
    // if (x === this.nil) return

    // 更新b与y的关系
    y.left = x.right
    if (!isNil(x.right)) {
      x.right.parent = y
    }

    // 更新p与x的关系
    x.parent = y.parent
    // if (y === this.root) {
    // if (isNil(y.parent)) {
    //   this.root = x
    // } 
    if (y === this.root) {
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
  private _insert_old(key: K, value: V) {
    const z = this.createRBTNode(key, value)
    let y = this.nil
    let x = this.root

    while (!isNil(x)) {
      y = x
      y.size++
      if (this.key_comp(z.key, x.key)) {
        x = x.left
      } else {
        x = x.right
      }
    }
    z.parent = y

    if (isNil(y)) {
      this.root = z
    } else if (this.key_comp(z.key, y.key)) {
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
   * @description: 新版插入方法，和SGI保持一致
   * @param {*} x_ 新插入结点
   * @param {*} y_ 插入结点的父结点
   * @param {*} v  插入值
   * @return {*}
   */
  private _insert = (x_, y_, v) => {
    const x = x_
    const y = y_
    let z
    if (y === this.header || !isNil(x) || this.key_comp(v, y.key)) {
      z = this.createRBTNode(v, v)
      y.left = z
      if (y === this.header) {
        this.root = z
        this.rightMost = z
      } else if (y === this.leftMost) {
        this.leftMost = z
      }
    } else {
      z = this.createRBTNode(v, v)
      y.right = z
      if (y === this.rightMost) this.rightMost = z
    }
    z.parent = y
    z.left = this.nil
    z.right = this.nil
    z.color = Color.RED
    this.insertFixup(z)
    this.size++
  }

  /**
   * @description: 插入之后维护红黑性质
   * @param {RBTNode} z
   * @param {*} V
   * @return {*}
   */
  private insertFixup = (z: RBTNode<K, V>) => {
    while (z !== this.root && z.parent.color === Color.RED) {
      // while (z.parent.color === Color.RED) {
      let y
      if (z.parent === z.parent.parent.left) {
        // 插入结点的叔叔结点
        y = z.parent.parent.right
        // case 1: 插入结点z的叔叔结点y是红色的
        if (!isNil(y) && y.color === Color.RED) {
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
        if (!isNil(y) && y.color === Color.RED) {
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
   * @description: 对外提供的插入接口(老版本)
   * @param {V} v
   * @return {*}
   */
  public insert_old(v: V) {
    const key: unknown = v
    this._insert_old(key as K, v)
  }

  /**
   * @description: 可以插入有重复键值的结点，与insert_unique相反
   * @param {*}
   * @return {*}
   */
  insert_equal = (v: K) => {
    let y = this.header
    let x = this.root
    while (!isNil(x)) {
      y = x
      // console.log(v, x.key, v < x.key)
      x = this.key_comp(v, x.key) ? x.left : x.right
    }
    return this._insert(x, y, v)
  }

  /**
   * @description: 插入节点的键值(key)在整颗树中必须独一无二（如果存在相同的键值，插入操作不会真正进行）
   * @param {*}
   * @return {*}
   */
  insert_unique(v: V) {
    let y = this.header
    let x = this.root
    let comp: boolean = true
    while (!isNil(x)) {
      y = x
      comp = this.key_comp(v as any, x.key)
      x = comp ? x.left : x.right
    }

    const j = new RBTIterator(y)
    if (comp) {
      // if (j === j.begin) {
      //   this._insert(x, y, v)
      // } else {
      //   j.prev()
      // }
      // const jn = j.get()
      // if (!isNil(jn)) {
      //   if (this.key_comp(jn.key, v as any)) this._insert(x, y, v)
      // }
    }
  }

  /**
   * @description: 替换过程：用一颗子树v替换另一棵子树u，并且将v作为u孩子的双亲结点
   * @param {RBTNode} u
   * @param {RBTNode} v
   * @return {*}
   */
  private transparent(u: RBTNode<K, V>, v: RBTNode<K, V>) {
    if (isNil(u.parent)) {
      this.root = v
    } else if (u === u.parent.left) {
      u.parent.left = v
    } else {
      u.parent.right = v
    }
    v.parent = u.parent
  }

  /**
   * @description: 删除结点（legacy）
   * @param {RBTNode} z
   * @return {*}
   */
  private _delete(z: RBTNode<K, V>) {
    if (isNil(z)) return

    // 从z到根的简单路径上，维护size属性
    let p = z
    while (!isNil(p)) {
      p.size--
      p = p.parent
    }

    let y = z
    let x
    let yOriginColor = y.color
    if (isNil(z.left)) {
      // case 1：删除结点z，没有左孩子
      // console.log('case 1', z, z.right);
      x = z.right
      this.transparent(z, z.right)
    } else if (isNil(z.right)) {
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
        let p = x.parent
        while (p !== y) {
          p.size--
          p = p.parent
        }
        y.size = y.left.size + 1
      }
      this.transparent(z, y)
      y.left = z.left
      y.left.parent = y
      y.color = z.color

      // 维护size属性
      y.size = y.left.size + y.right.size + 1
    }

    if (yOriginColor === Color.BLACK) {
      this.deleteFixup(x)
    }
  }

  /**
   * @description: 删除之后，维护红黑性质（legacy状态）
   * @param {RBTNode} x
   * @param {*} V
   * @return {*}
   */
  private deleteFixup = (x: RBTNode<K, V>) => {
    let w
    while (x !== this.root && (isNil(x) || x.color === Color.BLACK)) {
      if (x === x.parent.left) {
        w = x.parent.right
        if (w.color === Color.RED) {
          // case 1: x的兄弟结点w是红色的
          w.color = Color.BLACK
          w.parent.color = Color.RED
          this.leftRotate(x.parent)
          w = x.parent.right
        }
        if ((isNil(w.left) || w.left.color === Color.BLACK) && (isNil(w.right) || w.right.color === Color.BLACK)) {
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
   * @description: 删除结点，对外接口（legacy状态）
   * @param {K} x
   * @return {*}
   */
  public delete(x: K) {
    const z = this.find(x).get()
    this._delete(z)
  }

  /**
   * @description: 带有header属性版本的的删除操作
   * @param {RBTNode} z
   * @param {*} V
   * @return {*}
   */
  private _erase = (z: RBTNode<K, V>) => {
    let y = z
    let x = this.nil
    let x_p = this.nil

    if (isNil(y.left)) x = y.right
    // z最多只有一个非nil孩子
    else {
      if (isNil(y.right)) x = y.left
      // z有一个非nil孩子
      else {
        // y为x的后驱，x可能为nil
        y = y.right
        while (!isNil(y.left)) y = y.left
        x = y.right
      }
    }

    if (y !== z) {
      z.left.parent = y
      y.left = z.left

      if (y !== z.right) {
        x_p = y.parent
        if (!isNil(x)) x.parent = y.parent
        y.parent.left = x
        y.right = z.right
        z.right.parent = y
      } else {
        x_p = y
      }

      if (this.root == z) this.root = y
      else if (z.parent.left === z) z.parent.left = y
      else z.parent.right = y

      y.parent = z.parent
      // swap y 和 z的color
      const ct = y.color
      y.color = z.color
      z.color = ct

      y = z
    } else {
      x_p = y.parent
      if (!isNil(x)) x.parent = y.parent
      if (this.root === z) this.root = x
      else {
        if (z.parent.left === z) z.parent.left = x
        else z.parent.right = x
      }

      if (this.leftMost === z) {
        if (isNil(z.right)) this.leftMost = z.parent
        else this.leftMost = this.minimum(x)
      }

      if (this.rightMost === z) {
        if (isNil(z.left)) this.rightMost = z.parent
        else this.rightMost = this.maximum(x)
      }
    }

    if (y.color !== Color.RED) {
      while (x !== this.root && (isNil(x) || x.color === Color.BLACK)) {
        if (x === x_p.left) {
          let w = x_p.right
          if (w.color === Color.RED) {
            // case 1: x的兄弟结点w是红色的
            w.color = Color.BLACK
            x_p.color = Color.RED
            this.leftRotate(x_p)
            w = x_p.right
          }
          if ((isNil(w.left) || w.left.color === Color.BLACK) && (isNil(w.right) || w.right.color === Color.BLACK)) {
            // case 2: x的兄弟结点w是黑色的， 并且w的两个子结点都是黑色的
            w.color = Color.RED
            x = x_p
            x_p = x_p.parent
          } else {
            if (isNil(w.right) || w.right.color === Color.BLACK) {
              if(!isNil(w.left)) w.left.color = Color.BLACK
              // case 3: x的兄弟结点w是黑色的， w的左孩子是红色的，w的右孩子是黑色的
              // w.left.color = Color.BLACK
              w.color = Color.RED
              this.rightRotate(w)
              w = x_p.right
            }
            // case 4: x的兄弟结点w是黑色的， 并且w的孩子是红色的
            w.color = x_p.color
            w.parent.color = Color.BLACK
            if(!isNil(w.right)) w.right.color = Color.BLACK
            this.leftRotate(x_p)
            break;
            // x = this.root
          }
        } else {
          // 对称情况
          let w = x_p.left
          if (w.color === Color.RED) {
            w.color = Color.BLACK
            w.parent.color = Color.RED
            this.rightRotate(x_p)
            w = x_p.left
          }
          if ((isNil(w.right) || w.right.color === Color.BLACK) && (isNil(w.left) || w.left.color === Color.BLACK)) {
            w.color = Color.RED
            x = x_p
            x_p = x_p.parent
          } else {
            if (isNil(w.left) || w.left.color === Color.BLACK) {
              if(!isNil(w.right)) w.right.color = Color.BLACK
              w.color = Color.RED
              this.leftRotate(w)
              w = x_p.left
            }
            w.color = x_p.color
            w.parent.color = Color.BLACK
            if(!isNil(w.left)) w.left.color = Color.BLACK
            this.rightRotate(x_p)
            break
          }
        }
      }
      if(!isNil(x)) x.color = Color.BLACK
    }
    return y
  }

  /**
   * @description: 新版对外提供的删除接口
   * @param {K} x
   * @return {*}
   */
  public erase = (x: K): RBTNode<K, V> | undefined => {
    const z = this.find(x).get()
    if(!isNil(z)) return this._erase(z)
  }

  /**
   * @description: 子树中关键字最小的元素
   * @param {RBTNode} x
   * @param {*} V
   * @return {*}
   */
  private minimum(x: RBTNode<K, V>) {
    while (!isNil(x.left)) x = x.left
    return x
  }

  /**
   * @description: 子树中关键字最大的元素
   * @param {RBTNode} x
   * @param {*} V
   * @return {*}
   */
  private maximum(x: RBTNode<K, V>) {
    while (!isNil(x.right)) x = x.right
    return x
  }

  /**
   * @description: 结点前驱
   * @param {RBTNode} x
   * @param {*} V
   * @return {*}
   */
  preSuccessor(x: RBTNode<K, V>) {
    if (isNil(x)) return
    if (!isNil(x.left)) return this.maximum(x.left)
    let y = x.parent
    while (!isNil(y) && x === y.left) {
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
    if (isNil(x)) return
    if (!isNil(x.right)) return this.minimum(x.right)
    let y = x.parent
    while (!isNil(y) && x === y.right) {
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
  public find = (key: K): RBTIterator<K, V> => {
    return this._find(key)
  }

  /**
   * @description: 查询结点，迭代版本
   * @param {K} k
   * @return {*}
   */  
  private _find = (k: K): RBTIterator<K, V> => {
    let y = this.nil
    let x = this.root
    while(!isNil(x)) {
      if(!this.key_comp(x.key, k)) y = x, x = x.left
      else x = x.right
    }
    let j = new RBTIterator<K, V>(y);
    return (j === this.end() || this.key_comp(k, (j.get() as RBTNode<K, V>).key)) ? this.end() : j
  }

  /**
   * @description: 查找某个关键字元素，递归版本(lagc)
   * @param {K} key
   * @return {*}
   */
  private _find_c = (root: RBTNode<K, V>, key: K): RBTNode<K, V> => {
    if (isNil(root) || root.key === key) return root
    if (key < root.key) return this._find_c(root.left, key)
    else return this._find_c(root.right, key)
  }

  /**
   * @description: 内部方法，查找具有给定秩的元素
   * @param {RBTNode} x
   * @param {number} i
   * @return {*}
   */
  private _select(x: RBTNode<K, V>, i: number) {
    if (i <= 0) return this.nil
    const r = x.left.size + 1
    if (i === r) {
      return x
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
  private _rank = (T: RBTNode<K, V>, k: K) => {
    const x = this.find(k).get()
    if (isNil(x)) return 0
    let r = x.left.size + 1
    let y = x
    while (y !== this.root) {
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
    return this._rank(this.root, k)
  }

  /**
   * @description: lower bound
   * @param {K} k
   * @return {*}
   */
  lower_bound(k: K) {
    let y = this.header
    let x = this.root

    while (!isNil(x)) {
      if (this.key_comp(x.key, k)) (y = x), (x = x.left)
      else x = x.right
    }

    return new RBTIterator(y)
  }

  /**
   * @description: upper bound
   * @param {K} k
   * @return {*}
   */
  upper_bound(k: K) {
    let y = this.header
    let x = this.root

    while (!isNil(x)) {
      if (this.key_comp(k, x.key)) (y = x), (x = x.left)
      else x = x.right
    }

    return new RBTIterator(y)
  }

  /**
   * @description: equal range
   * @param {K} x
   * @return {*}
   */
  equal_range(x: K) {
    return [this.lower_bound(x), this.upper_bound(x)]
  }

  /**
   * @description: swap todo
   * @param {*}
   * @return {*}
   */
  swap() { }

  /**
   * @description: 清除
   * @param {*}
   * @return {*}
   */
  clear() {
    this._erase(this.root)
    this.root = this.nil
    this.leftMost = this.header
    this.rightMost = this.header
  }

  /**
   * @description: 内部中序遍历实际实现
   * @param {RBTNode} x
   * @param {*} V
   * @return {*}
   */
  _inorderWalk(x: RBTNode<K, V>, cb?: (node) => unknown) {
    if (isNil(x)) return
    if (x.left) this._inorderWalk(x.left, cb)
    if (cb) cb(x)
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
    if (isNil(x) || !x) x = this.root
    this._inorderWalk(x, fn)
  }
}
