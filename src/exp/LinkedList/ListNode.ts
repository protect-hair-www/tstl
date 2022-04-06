/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 13:53:36
 * @LastEditTime: 2022-04-06 21:06:34
 * @LastEditors: hzheyuan
 * @Description: list container node
 * @FilePath: /tstl/src/exp/LinkedList/ListNode.ts
 */

export class Node<T> {
  private _prev: Node<T> | null
  private _next: Node<T> | null
  private _value: T | null

  constructor(prev: Node<T> | null, e: T, next: Node<T> | null) {
    this._prev = prev
    this._value = e
    this._next = next
  }

  /**
   * @description: get prev pointer
   * @param {*}
   * @return {*}
   */
  get prev() {
    return this._prev
  }

  /**
   * @description: set prev pointer
   * @param {*} x
   * @return {*}
   */
  set prev(x) {
    this._prev = x
  }

  /**
   * @description: return next pointer
   * @param {*}
   * @return {*}
   */
  get next() {
    return this._next
  }

  /**
   * @description: set next pointer
   * @param {*} x
   * @return {*}
   */
  set next(x) {
    this._next = x
  }

  /**
   * @description: get the value
   * @param {*}
   * @return {*}
   */
  get value() {
    return this._value
  }

  /**
   * @description: set the value
   * @param {*} v
   * @return {*}
   */
  set value(v) {
    this._value = v
  }

  /**
   * @description: a public method getValue
   * @param {*}
   * @return {*}
   */
  public getValue(): T {
    return this._value as T
  }

  /**
   * @description: a public method setValue
   * @param {*} v
   * @return {*}
   */
  public setValue(v) {
    this._value = v
  }
}
