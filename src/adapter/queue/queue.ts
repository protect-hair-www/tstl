/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:09:40
 * @LastEditTime: 2022-03-11 13:28:24
 * @LastEditors: hzheyuan
 * @Description: queues are type of containr, specifically desingned to operate in a FIFO context(first-in-firt-out),
 * where elements are inserted into one end of container end extracted from the other.
 *
 * queues are implemented as containers adapter, which are classes that use an encapsulated object of a specific container
 * class as its underlying container, providing a specific set of member functions to assess its elements.
 * Elements are pushed into the "back" of the specific container and popped form its front.
 *
 * The underlying container may be one of standard container or same other specifically designed container class. This underlying
 * container shall support at least the following operations:
 *  (1). empty
 *  (2). size
 *  (3). front
 *  (4). back
 *  (5). push_back
 *  (6). pop_front
 *
 * The standard container classes deque and list fulfill these requirements.
 * By default, if no container class is specified for a particular stack class instantiation, the standard container deque is used.
 *
 * @FilePath: \tstl\src\adapter\queue\queue.ts
 */
import { Deque } from '@/container/sequence/deque/index'
import { List } from '@/container/sequence/list/index'

type QueueCntrType<T> = Deque<T> | List<T>

export class Queue<T> {
  _cntr: QueueCntrType<T>

  constructor(p?: number | Iterable<T>, cntrType?: QueueCntrType<T>) {
    if (typeof p === 'number' && p) this._cntr = new Deque<T>()
    else if (p) this._cntr = new Deque(...(p as Iterable<T>))
    else this._cntr = new Deque()
  }

  get cntr() {
    return this.cntr
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
   * @description: access first element
   * @param {*}
   * @return {*}
   */
  public front(): T {
    return this.cntr.front()
  }

  /**
   * @description: access last element
   * @param {*}
   * @return {*}
   */
  public back(): T {
    return this.cntr.back()
  }

  /**
   * @description: insert element
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
    this.cntr.emplace(v)
  }

  /**
   * @description: remove next element
   * @param {*}
   * @return {*}
   */
  public pop() {
    this.cntr.pop()
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
