/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:54:17
 * @LastEditTime: 2022-03-02 16:03:40
 * @LastEditors: hzheyuan
 * @Description: sorted associative container map
 * map is a sorted associative container that contains key-value pairs with unique keys. 
 * Keys are sorted by using the comparison function Compare. Search removal, and insertion 
 * operations have logarithmic complexity. Maps are usually implemented as red-black trees
 * @FilePath: \tstl\src\container\associative\map.ts
 */
import { Tree } from '../tree/index'

export class Map<K, V> {
  // 存储数据，一颗红黑树
  _t: Tree<K, V>

  // 比较器Comparator
  private key_comp: (a: K, b: K) => boolean = (a, b) => a < b
  constructor(comparator?: (a: K, b: K) => boolean) {
    if (comparator) this.key_comp = comparator
    this._t = new Tree<K, V>(this.key_comp)

    return new Proxy(this, {
      get: function (target, prop, receiver) {
        // console.log(target, prop, receiver, 'get xxx');
        // console.log(Reflect.has(target, prop), 'has')
        // console.log(`get: `, target, prop, Reflect.has(target, prop));
        if (Reflect.has(target, prop)) return Reflect.get(target, prop, receiver)
        return target.find(prop).get()
      },
      set: function (target, prop, value, receiver) {
        console.log(`set: `, target, prop, value, Reflect.has(target, prop));
        if(Reflect.has(target, prop)) Reflect.set(target, prop, receiver);
        else {
          const lb = target.lower_bound(prop)
          const lbn = lb.getNode();
          console.log(lb.getNode(), lb.getNode() === target.end().getNode())

          if(lbn === target.end().getNode() || target.key_comp(prop, lbn.getKey())) {
            target.insert_position(lb, value)
          } else {
            lb.getNode().setValue(value)
          }
          console.log(lb.getNode(), lb.getNode().getValue(), target.key_comp(prop, lb.getNode().getKey()))
          return true
        }
        return false
      }
    })
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
    return this._t.insert_unique(x)
  }

  public insert_position(i, x) {
    return this._t.inset_uniqual_with_position(i, x)
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

