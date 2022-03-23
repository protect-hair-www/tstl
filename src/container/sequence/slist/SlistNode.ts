/*
 * @Author: hzheyuan
 * @Date: 2022-03-23 21:13:31
 * @LastEditTime: 2022-03-23 21:17:29
 * @LastEditors: hzheyuan
 * @Description: slist(single linked list)
 * @FilePath: /tstl/src/container/sequence/slist/SlistNode.ts
 */
export class SlistNode<T> {
  private _next: SlistNode<T>
  private _value: T | null

  constructor(x?: T) {
    this._next = this
    this._value = x ? x : null
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

