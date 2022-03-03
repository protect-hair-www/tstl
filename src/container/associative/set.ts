/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:54:17
 * @LastEditTime: 2022-03-03 11:35:51
 * @LastEditors: hzheyuan
 * @Description: sorted associative container map
 * @FilePath: \tstl\src\container\associative\set.ts
 */
import { Tree } from '../tree/index'

export class Set<K> {
  // 存储数据，一颗红黑树
  _t: Tree<K, K>

  // 比较器Comparator
  private key_comp: (a: K, b: K) => boolean = (a, b) => a < b
  constructor(comparator?: (a: K, b: K) => boolean) {
    if (comparator) this.key_comp = comparator
    this._t = new Tree<K, K>({comparator: this.key_comp})
  }

  /**
   * @description: begin迭代器
   * @return {*}
   */  
  public begin() {
    return this._t.begin()
  }

  /**
   * @description: end迭代器
   * @return {*}
   */  
  public end() {
    return this._t.end()
  }

  /**
   * @description: 是否为空
   * @return {*}
   */  
  public empty(): boolean {
    return this._t.empty
  }

  /**
   * @description: set中元素数量
   * @return {*}
   */  
  public size() {
    return this._t.size
  }

  /**
   * @description: set中元素为x的数量，返回0或1
   * @param {K} x
   * @return {*}
   */  
  public count(x: K) {
    return this._t.find(x).get() === this._t.end().get() ? 0 : 1
  }

  /**
   * @description: 插入元素
   * @param {*} x
   * @return {*}
   */  
  public insert(x) {
    return this._t.insert_unique(x, x)
  }

  /**
   * @description: 查找元素，返回为迭代器
   * @param {*} x
   * @return {*}
   */  
  public find(x) {
    return this._t.find(x)
  }

  /**
   * @description: 删除元素
   * @param {*} x
   * @return {*}
   */  
  public erase(x) {
    let r = this._t.erase(x).get()
    return r === this._t.end().get() ? false : r
  }

  /**
   * @description: lower_bound
   * @param {K} x
   * @return {*}
   */  
  public lower_bound(x: K) {
    return this._t.lower_bound(x)
  }

  /**
   * @description: upper_bound
   * @param {K} x
   * @return {*}
   */  
  public upper_bound(x: K) {
    return this._t.upper_bound(x)
  }

  /**
   * @description: equal_range
   * @param {K} x
   * @return {*}
   */  
  public equal_range(x: K) {
    const r = this._t.equal_range(x);
    return [r[0].get(), r[1].get()]
  }

  /**
   * @description: 清除当前set
   * @param {*}
   * @return {*}
   */  
  public clear() {
    this._t.clear()
  }
}
