/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:54:39
 * @LastEditTime: 2022-03-06 23:13:36
 * @LastEditors: hzheyuan
 * @Description: associative containers multiset
 * 
 * Multisets are associative containers that store elements follow a specific order, 
 * and where multiple elememts can have equivalent values.
 * 
 * In a multiset, the value of an element alos identifies(the value is itself the key, of type K).
 * The value of elements in a multiset cannot be modified once in the container(the elements are always const)
 * but they can be inserted or removed from the container
 * 
 * Interally, the elements in a multiset are always sorted following a specific strict weak ordering 
 * criterion indicated by its internal comparation function
 * 
 * multiset containers are generally slower than unordred_multiset containers to access individual elements by their key
 * but they allow direct iteration on subsets based on their order.
 * 
 * Search removal, and insertion operations have logarithmic complexity. 
 * multisets are usually implemented as red-black trees
 * 
 * @FilePath: \tstl\src\container\associative\multiset.ts
 */
import { Tree } from '../tree/index'

export class MultiSet<K> {
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
   * @description: return iterator to end
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
   * @description: count elements with specific key
   * @param {K} x
   * @return {*}
   */  
  public count(x: K) {
    return this._t.count(x)
  }

  /**
   * @description: insert elements
   * @param {*} x
   * @return {*}
   */  
  public insert(x) {
    return this._t.insert_equal(x, x)
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
   * @description: erase element
   * @param {*} x
   * @return {*}
   */  
  public erase(x) {
    let r = this._t.erase(x).get()
    return r === this._t.end().get() ? false : r
  }

  /**
   * @description: return iterator to lower_bound
   * @param {K} x
   * @return {*}
   */  
  public lower_bound(x: K) {
    return this._t.lower_bound(x)
  }

  /**
   * @description: Return iterator to upper_bound
   * @param {K} x
   * @return {*}
   */  
  public upper_bound(x: K) {
    return this._t.upper_bound(x)
  }

  /**
   * @description: return iterator to equal elements
   * @param {K} x
   * @return {*}
   */  
  public equal_range(x: K) {
    const r = this._t.equal_range(x);
    return [r[0].get(), r[1].get()]
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
