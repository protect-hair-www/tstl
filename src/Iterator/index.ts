/*
 * @Author: hzheyuan
 * @Date: 2022-02-22 09:29:12
 * @LastEditTime: 2022-02-24 17:57:45
 * @LastEditors: hzheyuan
 * @Description:
 * 迭代器接口
 *  提供一种方法，使之能够依序访问某个容器所含的各个元素，而又无需暴露该容器内部的表示方式
 *  这个抽象类提供通用接口，各个容器做自身的实现
 * @FilePath: \tstl\src\Iterator\index.ts
 */
export abstract class Iterator {
  // 内部属性，stl相关的几个迭代器
  _cur

  // 迭代器指针操作
  abstract prev()             // 迭代器前移
  abstract next()             // 迭代器后移
  abstract done(): boolean    // 是否结束
  abstract hasNext(): boolean // 同上done

  // 迭代器成员访问方法
  abstract get()
  abstract remove()
}
