/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:54:48
 * @LastEditTime: 2022-03-03 17:17:12
 * @LastEditors: hzheyuan
 * @Description: 和map一致，只是可以插入键值相同的元素
 * 也因为有键值相同的元素，所以不提供"[]"的方式，操作进行插入。原因是不知道修改哪一个
 * @FilePath: \tstl\src\container\associative\multimap.ts
 */
import { Tree } from '../tree/index'

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
   * @description: 容器中元素数量
   * @return {*}
   */
  public size() {
    return this._t.size
  }

  /**
   * @description: 容器中键值为x的元素的数量
   * @param {K} x
   * @return {*}
   */
  public count(x: K) {
    return this._t.count(x)
  }

  /**
   * @description: 插入元素
   * @param {*} x
   * @return {*}
   */
  public insert(k: K, v: V) {
    return this._t.insert_equal(k, v)
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
   * @description: 清除当前容器
   * @param {*}
   * @return {*}
   */
  public clear() {
    this._t.clear()
  }
}

