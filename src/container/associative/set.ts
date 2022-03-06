/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:54:17
 * @LastEditTime: 2022-03-06 22:58:09
 * @LastEditors: hzheyuan
 * @Description: sorted associative container set
 * 
 * Sets are containers that store unique elements following a specific order.
 * 
 * In a set, the value of an element also identifies it(the value is itself the key, of type T),
 * and each value must be unique. The vlaue of the elements in a set cannot modified once in container
 * (the elements are always const). but they can be inserted or remvoved from the container
 * 
 * Internally, the elements in a set are always stroted following a specific strict weak ordering
 * criterion indicated by its internal comparsion funciton
 * 
 * set containers are generally slower than unordred_set containers to access individual elements by their key
 * but they allow direct iteration on subsets based on their order.
 * 
 * Search removal, and insertion operations have logarithmic complexity. 
 * Sets are typically implemented as red black tree
 * 
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
   * @description: return iterator to begining
   * @return {*}
   */  
  public begin() {
    return this._t.begin()
  }

  /**
   * @description: return iterator of end
   * @return {*}
   */  
  public end() {
    return this._t.end()
  }

  /**
   * @description: test whether container is empty
   * @return {*}
   */  
  public empty(): boolean {
    return this._t.empty
  }

  /**
   * @description: return container size
   * @return {*}
   */  
  public size() {
    return this._t.size
  }

  /**
   * @description: count elements with specific value
   * @param {K} x
   * @return {*}
   */  
  public count(x: K) {
    return this._t.find(x).get() === this._t.end().get() ? 0 : 1
  }

  /**
   * @description: insert elements
   * @param {*} x
   * @return {*}
   */  
  public insert(x) {
    return this._t.insert_unique(x, x)
  }

  /**
   * @description: get iterator to element
   * @param {*} x
   * @return {*}
   */  
  public find(x) {
    return this._t.find(x)
  }

  /**
   * @description: erase elements
   * @param {*} x
   * @return {*}
   */  
  public erase(x) {
    let r = this._t.erase(x).get()
    return r === this._t.end().get() ? false : r
  }

  /**
   * @description: return iterator to lower bound
   * @param {K} x
   * @return {*}
   */  
  public lower_bound(x: K) {
    return this._t.lower_bound(x)
  }

  /**
   * @description: return iterator to upper bound
   * @param {K} x
   * @return {*}
   */  
  public upper_bound(x: K) {
    return this._t.upper_bound(x)
  }

  /**
   * @description: get range of equal elements
   * @param {K} x
   * @return {*}
   */  
  public equal_range(x: K) {
    const r = this._t.equal_range(x);
    return [r[0].get(), r[1].get()]
  }

  /**
   * @description: swap content (todo)
   * @param {*}
   * @return {*}
   */  
  public swap() {

  }

  /**
   * @description: clear content
   * @param {*}
   * @return {*}
   */  
  public clear() {
    this._t.clear()
  }
}
