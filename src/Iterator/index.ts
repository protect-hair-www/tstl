/*
 * @Author: hzheyuan
 * @Date: 2022-02-22 09:29:12
 * @LastEditTime: 2022-03-10 17:29:04
 * @LastEditors: hzheyuan
 * @Description:
 * 迭代器接口
 *  提供一种方法，使之能够依序访问某个容器所含的各个元素，而又无需暴露该容器内部的表示方式
 *  这个抽象类提供通用接口，各个容器做自身的实现
 * @FilePath: \tstl\src\Iterator\index.ts
 */
export abstract class Iterator<T> {
  _cur

  // 迭代器指针操作
  abstract prev()          // 迭代器前移，并返回迭代器所指向的元素
  abstract next()          // 迭代器后移，并返回迭代器所指向的元素
  abstract done(): boolean    // 是否遍历完
  abstract hasNext(): boolean // 同上done

  abstract getNode()          // 获取迭代器结点 
  abstract get()              // 迭代器成员访问方法
  abstract getValue()         // 获取值
  // abstract getKey()           // 获取键值，如果有的话
  abstract remove()           // 通过迭代器删除
}
