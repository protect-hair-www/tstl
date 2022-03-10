/*
 * @Author: hzheyuan
 * @Date: 2022-03-10 23:20:05
 * @LastEditTime: 2022-03-10 23:25:45
 * @LastEditors: hzheyuan
 * @Description: Iterator Interface
 * @FilePath: /tstl/src/Iterator/Iterator.ts
 */
export interface TSTLIterator<T> {
  _cur                              // 当前位置
  prev(): T                         // 迭代器前移，并返回迭代器所指向的元素
  next(): T                         // 迭代器后移，并返回迭代器所指向的元素
  [Symbol.iterator](): Iterator<T>  // Javascript，可迭代对象必须实现「@@iterator」方法，使用[Symbol.iterator]访问
  hasNext(): boolean                // 是否还有可遍历的元素
  done(): boolean                   // 是否遍历完成 (done === !hasNext())
  getKey()                          // 获取键值，如果有的话
  getValue(): T                     // 获取值
  getNode()                         // 获取迭代器指向的结点(一些数据结构，比如tree，数据是放在一个node结构中)
  remove()                          // 通过迭代器删除
}