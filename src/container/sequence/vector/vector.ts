/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:57:21
 * @LastEditTime: 2022-03-17 21:52:16
 * @LastEditors: hzheyuan
 * @Description: sequence container vector
 * vectors are sequence containers representing arrays that can change in size.
 *
 * Just like arrays, vectors use contiguous storage locations for their elements,
 * which means that their elements can also be accessed using offsets on regular pointers to its elements,
 * and just as efficiently as in arrays. But unlike arrays, their size can change dynamically, with their storage being handled automatically by the container.
 *
 * Internally, vectors use a javascript array to store their elements.
 * Javascript array will reallocated in order to grow in size when new elements are inserted.
 *
 * Compared to the other dynamic sequence containers (deques, lists and forward_lists),
 * vectors are very efficient accessing its elements (just like arrays) and relatively efficient adding or removing elements from its end.
 *
 * @FilePath: \tstl\src\container\sequence\vector\vector.ts
 */
import { InputIterator } from '../../../iterator'
import { VCIterator } from './iterator'
import { TSTLIterable } from '../../../iterator/Iterable'

export class Vector<T> implements TSTLIterable<T> {
  private cntr: T[]
  start: number = 0
  finish: number = 0

  /**
   * @description: Constructor vector
   * Constructs a vector, initializing its contents depending on the constructor version used:
   *  (1) empty container constructor(default constructor): constructor an empty container, with no elements.
   *  (2) fill constructor: constructs a container with n elements. Each element is a copy of v.
   *  (3) range constructor: constructs a container with many elements as the range [first, last), in same order.
   *  (4) copy constructor: constructs a container with a copy of each elements in other vector, in same order.
   * @param {*}
   * @return {*}
   */
  public constructor()
  public constructor(vectorLength: number)
  public constructor(vector: Vector<T>)
  public constructor(vectorLength: number, v: T)
  public constructor(first: InputIterator<T>, last: InputIterator<T>)
  public constructor(...args: any[]) {
    if (args.length === 0) {
      this.cntr = new Array()
    } else if (args.length === 1) {
      if (typeof args[0] === 'number') {
        this.cntr = new Array(args[0])
      } else {
        this.cntr = new Array(...args[0])
      }
    } else {
      if (typeof args[0] === 'number') {
        this.cntr = new Array(args[0], args[1])
      } else {
        this.cntr = this.assign(args[0], args[1])
      }
    }
  }

  /**
   * @description: return iterator to begining
   * @param {*}
   * @return {*}
   */
  begin(): VCIterator<T> {
    return new VCIterator(this.start, this.cntr)
  }

  // cbegin(): VCIterator<T> {
  //     const cntr = this.cntr
  //     return new VCIterator(this.start, cntr);
  // }

  /**
   * @description: return iterator to end
   * @param {*}
   * @return {*}
   */
  end(): VCIterator<T> {
    const last = this.cntr.length
    return new VCIterator(last, this.cntr)
  }

  /**
   * @description: return size
   * @param {*}
   * @return {*}
   */
  size(): number {
    return this.cntr.length
  }

  /**
   * @description: test whether container is empty
   * @param {*}
   * @return {*}
   */
  empty(): boolean {
    return this.size() === 0
  }

  /**
   * @description: access first element
   * @param {*}
   * @return {*}
   */
  front(): T {
    return this.cntr[0]
  }

  /**
   * @description: access last element
   * @param {*}
   * @return {*}
   */
  back(): T {
    const len = this.cntr.length
    return this.cntr[len - 1]
  }

  /**
   * @description: access data
   * @param {*}
   * @return {*}
   */
  get data(): T[] {
    return this.cntr
  }

  /**
   * @description: set content data
   * @param {Array} x
   * @return {*}
   */
  set data(x: T[]) {
    this.cntr = x
  }

  /**
   * @description: change size
   * Resizes the container so that it contains n elements.
   *
   * If n is smaller than the current container size, the content is reduced to its first n elements, removing those beyond (and destroying them).
   * If n is greater than the current container size, the content is expanded by inserting at the end as many elements as needed to reach a size of n.
   * If val is specified, the new elements are initialized as copies of val, otherwise, they are value-initialized.
   * If n is also greater than the current container capacity, an automatic reallocation of the allocated storage space takes place.
   *
   * Notice that this function changes the actual content of the container by inserting or erasing elements from it.
   * @param {*}
   * @return {*}
   */
  resize(n: number)
  resize(n: number, v: T)
  resize(n: number, v?: T) {
    const first = new VCIterator<T>(this.begin().getKey() + n, this.cntr)
    if (n < this.size()) this.erase(first, this.end())
    else this.insert(this.end(), n - this.size(), v)
  }

  /**
   * @description: asscess element
   * @param {*}
   * @return {*}
   */
  at(pos: number) {
    return this.cntr.at(pos)
  }

  /**
   * @description: assign container content
   * assign new content to the container, replacing current contents, and modifying its size accodingly
   * this mothed has three versions:
   *
   * version(1): the new contents are n elements, each initialized to copy of val
   * version(2): range version, the new content are elements constructed from each of elements in the range of [first, last]，in same order
   * version(3): the new contents are copies of the values passed as initialized list, in the same order.
   *
   * @param {*}
   * @return {*}
   */
  assign(x: number | Iterable<T>, v?: T)
  assign(first: VCIterator<T>, last: VCIterator<T>)
  assign(x: unknown, y: unknown) {
    if (typeof x === 'number' && y) {
      this._assign_n_elements(x, y as T)
    } else if (x instanceof VCIterator && y instanceof VCIterator) {
      this._assign_range(x, y)
    } else {
      this._assing_itrabel_cntr(x as Iterable<T>)
    }
    return this.cntr
  }

  /**
   * @description: assign version(1)
   * the new contents are n elements, each initialized to copy of val
   * @param {number} n
   * @param {T} v
   * @return {*}
   */
  private _assign_n_elements(n: number, v: T) {
    this.cntr.length = n
    this.cntr.fill(v)
  }

  /**
   * @description: assign new content version(2)
   * range version, the new content are elements constructed from each of elements in the range of [first, last]，in same order
   * @param {Iterator} firt
   * @param {Iterator} last
   * @return {*}
   */
  private _assign_range(first: VCIterator<T>, last: VCIterator<T>) {
    const cur = first,
      elements: T[] = []
    while (cur.hasNext() && cur.getKey() !== last.getKey()) {
      elements.push(cur.getValue())
      cur.next()
    }
    this.clear()
    this.cntr.splice(0, 0, ...elements)
  }

  /**
   * @description: assign new content version(3)
   * the new contents are copies of the values passed as initialized list, in the same order.
   * @param {*}
   * @return {*}
   */
  private _assing_itrabel_cntr(cntr: Iterable<T>) {
    this.clear()
    for (const item of cntr) {
      this.cntr.push(item)
    }
  }

  /**
   * @description: add element to the end
   * @param {T} x
   * @return {*}
   */
  push_back(x: T) {
    this.cntr.push(x)
    // this.finish++
  }

  /**
   * @description: request a change in capacity
   * @param {*}
   * @return {*}
   */
  reserve() {}

  /**
   * @description: delete last element
   * @param {*}
   * @return {*}
   */
  pop_back() {
    this.cntr.pop()
    // this.finish--
  }

  /**
   * @description: inset elemnts
   *
   * The vector is extended by inserting new elements before the element at the specified position,
   * effectively increasing the container size by the number of elements inserted.
   *
   * the method has 3 versions:
   * version 1: Position in the vector where the new elements are inserted.
   * version 2: Number of elements to insert. Each element is initialized to a copy of val.
   * version 3: Iterators specifying a range of elements.
   *
   * @param {*}
   * @return {*}
   */
  insert(pos: VCIterator<T>, x: T | number | VCIterator<T>, last?: T | VCIterator<T>) {
    if (typeof x === 'number' && last) {
      this._insert_fill(pos, x, last as T)
    } else if (x instanceof VCIterator && last instanceof VCIterator) {
      this._insert_range(pos, x as VCIterator<T>, last as VCIterator<T>)
    } else {
      this._insert_pos(pos, x as T)
    }
  }

  /**
   * @description: insert at a specificed pos (internally implementation)
   * @param {VCIterator} pos
   * @param {T} x
   * @return {*}
   */
  private _insert_pos(pos: VCIterator<T>, val: T) {
    this.cntr.splice(pos.getKey(), 0, val)
    this.finish++
  }

  /**
   * @description: Number of elements to insert. Each element is initialized to a copy of val (internally implementation)
   * @param {VCIterator} pos
   * @param {number} n
   * @param {T} x
   * @return {*}
   */
  private _insert_fill(pos: VCIterator<T>, n: number, val: T) {
    if (n !== 0) {
      const added = new Array<T>(n)
      added.fill(val)
      this.cntr.splice(pos.getKey(), 0, ...added)
      this.finish += n
    }
  }

  /**
   * @description: Iterators specifying a range of elements.
   * Copies of the elements in the range [first,last) are inserted at position in the same order (internally implementation)
   * @param {VCIterator} pos
   * @param {VCIterator} first
   * @param {VCIterator} last
   * @return {*}
   */
  private _insert_range(pos: VCIterator<T>, first: VCIterator<T>, last: VCIterator<T>) {
    const added = new Array<T>()
    let cur = first,
      n = 0
    while (cur.hasNext() && cur.getKey() !== last.getKey()) {
      added.push(cur.getValue() as T)
      cur.next()
      n++
    }
    this.cntr.splice(pos.getKey(), 0, ...added)
    this.finish += n
  }

  /**
   * @description: swap content
   * exchange the content of this container by content of x, which is a other vector with same type, size may differ
   * @param {*}
   * @return {*}
   */
  swap(vec: Vector<T>) {
    const temp = vec.data
    vec.data = this.cntr
    this.cntr = temp
  }

  /**
   * @description: erase elements
   * Removes from the vector either a single element (position) or a range of elements ([first,last)).
   * @param {*}
   * @return {*}
   */
  erase(pos: VCIterator<T>, last?: VCIterator<T>) {
    if (!last) this._erase_position(pos)
    else this._erase_range(pos, last)
  }

  /**
   * @description: erase version(1) erase one element of a position(internally implementation)
   * @param {VCIterator} pos
   * @return {*}
   */
  private _erase_position(pos: VCIterator<T>) {
    this.cntr.splice(pos.getKey(), 1)
  }

  /**
   * @description:
   * @param {VCIterator} first
   * @param {VCIterator} last
   * @return {*}
   */
  private _erase_range(first: VCIterator<T>, last: VCIterator<T>) {
    const count = last.getKey() - first.getKey()
    this.cntr.splice(first.getKey(), count)
    this.finish = this.finish - count
  }

  /**
   * @description: clear content
   * @param {*}
   * @return {*}
   */
  clear() {
    this.cntr = []
    this.cntr.length = 0
    this.finish = 0
  }

  /**
   * @description: construct and insert element
   * @param {*}
   * @return {*}
   */
  emplace<K>(pos: VCIterator<T>, c: { new (...arg) }, ...arg) {
    const ins: T = new c(arg)
    this.insert(pos, ins)
  }

  /**
   * @description: construct and insert element at the end
   * @param {*}
   * @return {*}
   */
  emplace_back<K>(c: { new (...arg) }, ...arg) {
    const ins: T = new c(arg)
    this.push_back(ins)
  }

  /**
   * @description: Javascript iterator protocol(Internally implementation)
   * @param {*}
   * @return {*}
   */
  *[Symbol.iterator](): IterableIterator<T> {
    const cur = this.begin()
    while (cur.hasNext()) {
      try {
        // let node = { done: false, value: cur.getValue() }
        const value = cur.getValue()
        cur.next()
        yield value
      } catch (error) {
        console.log(error)
      }
    }
    // old version
    // return {
    //     next: () => {
    //         if (cur.hasNext()) {
    //             let node = { done: false, value: cur.getValue() }
    //             cur.next();
    //             return node
    //         } else {
    //             return { done: true, value: undefined }
    //         }
    //     }
    // }
  }

  /**
   * @description: Javascript keys iterator
   * @param {*}
   * @return {*}
   */
  *keys() {
    let cur = this.begin(),
      idx = 0
    while (cur.hasNext()) {
      try {
        const key = idx++
        cur.next()
        yield key
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**
   * @description: Javascript values iterator
   * @param {*}
   * @return {*}
   */
  *values() {
    const cur = this.begin()
    while (cur.hasNext()) {
      const value = cur.getValue()
      cur.next()
      yield value
    }
  }

  /**
   * @description: Javascript entries iterator
   * @param {*}
   * @return {*}
   */
  *entries() {
    let cur = this.begin(),
      idx: number = 0
    while (cur.hasNext()) {
      try {
        const entry: [number, T] = [idx++, cur.getValue()]
        cur.next()
        yield entry
      } catch (error) {
        console.log(error)
      }
    }
  }
}
