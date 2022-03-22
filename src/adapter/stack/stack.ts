/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:09:40
 * @LastEditTime: 2022-03-22 15:02:06
 * @LastEditors: hzheyuan
 * @Description: Stacks are type of containr, specifically desingned to operate in a LIFO context(last-in-firt-out),
 * where elements are inserted into one end of container end extracted from the other.
 *
 * Stacks are implemented as containers adapter, which are classes that use an encapsulated object of a specific container
 * class as its underlying container, providing a specific set of member functions to assess its elements.
 * Elements are "pushed / poped" form the "back" of the specific container, which is know as the top of the stack
 *
 * The underlying container may be one of standard container or same other specifically designed container class. This underlying
 * container shall support at least the following operations:
 *  (1). empty
 *  (2). size
 *  (4). back
 *  (5). push_back
 *  (6). pop_front
 *
 * The standard container classes vector, deque and list fulfill these requirements.
 * By default, if no container class is specified for a particular stack class instantiation, the standard container deque is used.
 *
 * @FilePath: \tstl\src\adapter\queue\queue.ts
 */
import { Deque } from '../../container/sequence/deque/index'
import { List } from '../../container/sequence/list/index'
type QueueCntrType<T> = Deque<T> // | List<T>

export class Stack<T> {
  _cntr: QueueCntrType<T>

  constructor(p?: number | Iterable<T>, cntrType?: QueueCntrType<T>) {
    if (typeof p === 'number' && p) this._cntr = new Deque<T>()
    // else if (p) this._cntr = new Deque(...(p as Iterable<T>))
    else this._cntr = new Deque()
  }

  get cntr() {
    return this._cntr
  }

  set cntr(cntr) {
    this._cntr = cntr
  }

  /**
   * @description: test whether container is empty
   * @param {*}
   * @return {*}
   */
  public empty(): boolean {
    return this.cntr.empty()
  }

  /**
   * @description: return size
   * @param {*}
   * @return {*}
   */
  public size(): number {
    return this.cntr.size()
  }

  /**
   * @description: test method will be removed
   * @param {number} pos
   * @return {*}
   */  
  public at(pos: number) {
    return this.cntr.at(pos);
  }
  
  /**
   * @description: access top element
   * @param {*}
   * @return {*}
   */
  public top(): T {
    return this.cntr.back()
  }

  /**
   * @description: pop top element 
   * @param {*}
   * @return {*}
   */
  public pop() {
    return this.cntr.pop_back()
  }

  /**
   * @description: push element
   * @param {T} v
   * @return {*}
   */
  public push(v: T) {
    this.cntr.push_back(v)
  }

  /**
   * @description: construnt and insert element
   * @param {T} v
   * @return {*}
   */
  public emplace(v: T) {
    // this.cntr.emplace(v)
  }

  /**
   * @description: swap contents
   * @param {QueueCntrType} x
   * @return {*}
   */
  public swap(x: QueueCntrType<T>) {
    this.cntr.swap(x)
  }
}
