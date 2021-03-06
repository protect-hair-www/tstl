/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:54:48
 * @LastEditTime: 2022-03-27 21:55:48
 * @LastEditors: hzheyuan
 * @Description: associative container multimap
 * Multimaps are associative containers that store elements formed by a combination of a key value and a mapped value,
 * following a specific order, and where multiple elements can have equivalent keys.
 *
 * In a multimap, the key values are generally used to sort an uniquely identify the elements,
 * while the mapped values store the content associated this key. the types of key and mapped
 * value may differ.
 *
 * Interally, the elements in a multimap are always sorted by its key following a specific strict
 * weak ordering criterion indicated by its internal comparation function
 *
 * multimap containers are generally slower than unordred_multimap containers to access individual elements by their key
 * but they allow direct iteration on subsets based on their order.
 *
 * Search removal, and insertion operations have logarithmic complexity.
 * multimaps are usually implemented as red-black trees
 *
 * @FilePath: \tstl\src\container\associative\multimap.ts
 */
import { Tree } from '../../tree/index'

export class MultiMap<K, V> {
  // 存储数据，一颗红黑树
  _t: Tree<K, V>

  // 比较器Comparator
  private key_comp: (a: K, b: K) => boolean = (a, b) => a < b
  constructor(comparator?: (a: K, b: K) => boolean) {
    if (comparator) this.key_comp = comparator
    this._t = new Tree<K, V>()
    // 代理当前对象，实现map['propKey'] = 'value'写法
    // return new Proxy(this, {
    //   get: function (target, prop, receiver) {
    //     // console.log('get', target, prop, Reflect.has(target, prop), receiver);
    //     if (Reflect.has(target, prop)) return Reflect.get(target, prop, receiver)
    //     return target.find(prop).get()
    //   },
    //   set: function (target, prop, value, receiver) {
    //     // console.log(`set: `, target, prop, value, Reflect.has(target, prop));
    //     if(Reflect.has(target, prop)) Reflect.set(target, prop, receiver);
    //     else {
    //       const propKey: unknown | K = prop
    //       const lb = target.lower_bound((propKey as K)), n = lb.getNode();
    //       // 如果不存在就新插入一个结点
    //       if(n === target.end().getNode() || target.key_comp((propKey as K), n.getKey())) {
    //         target.insert_position(lb, prop, value)
    //       } else {
    //         // 否则修改结点的value属性即可
    //         lb.getNode().setValue(value)
    //       }
    //       return true
    //     }
    //     return false
    //   }
    // })
  }

  /**
   * @description: return iterator to begining
   * @return {*}
   */
  public begin() {
    return this._t.begin()
  }

  /**
   * @description: return iterator to begining
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
   * @description: Count elements with a specific key
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
  public insert(k: K, v: V) {
    return this._t.insert_equal(k, v)
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
    const r = this._t.erase(x).getValue()
    return r === this._t.end().getValue() ? false : r
  }

  /**
   * @description: get iterator to lower_bound
   * @param {K} x
   * @return {*}
   */
  public lower_bound(x: K) {
    return this._t.lower_bound(x)
  }

  /**
   * @description: get iterator to upper_bound
   * @param {K} x
   * @return {*}
   */
  public upper_bound(x: K) {
    return this._t.upper_bound(x)
  }

  /**
   * @description: get iterator to equal elements
   * @param {K} x
   * @return {*}
   */
  public equal_range(x: K) {
    const r = this._t.equal_range(x)
    return [r[0].getValue(), r[1].getValue()]
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
