/*
 * @Author: hzheyuan
 * @Date: 2022-02-22 09:29:12
 * @LastEditTime: 2022-03-13 11:35:13
 * @LastEditors: hzheyuan
 * @Description: iterator definitions
 * 
 * An iterator is any object that, pointing to some element in a range of elements(such as a contatiner),
 * has the ability to iterate through the elements of that range using a set of operators(with as lest increment and access value)
 * 
 * The moust obvious from of iterator is a pointer: a pointer can point to elements in a conatiner, and can iterate through them
 * using the increment operator. But other kind of iterators are possible. For example, each container (such as List) has a specific
 * iterator type designed to iterate through its elements.
 * 
 * While a pointer is from of iterator, not all iterators have same functionality of pointers. Depending on the properties 
 * supported by iteators, they are calssified into five diffrent categories:
 *  (1). Input_Iterator
 *  (2). Output_Iterator
 *  (3). Forward_Iterator
 *  (4). Bidirectional_Iterator
 *  (5). Random_Access_Iterator
 * 
 * Input and Output iterators are the most limited types of iterators: they can preform sequential single-pass input or output operations.
 * 
 * Forward itrators have all the functionality of input iterators and output iterators, althrougth they are limited to one direction
 * in which to iterate through a range(forward). All standard containers support at lest forwrad iterator types.
 * 
 * Bidirectional iterators are like forward iterators but can also be iterated through backwards.
 * 
 * Random access iterators implement all the functionality of bidirectional iterators, and also have the ability 
 * to access range no-sequentially: distant elements can be accessed directly by applying an offset value to an iterator without iterating
 * through all the elements in between. These iterator have similar functionality to standard pointers.
 * 
 * Relationship of the five iterator is (not inherit but infinement):
 * =======================
 * |  Input      Output  |
 * |       \    /        |
 * |      Forward        |
 * |         |           |
 * |    Bidirectional    |
 * |         |           |
 * |    Random Access    |
 * =======================
 * @FilePath: /tstl/src/Iterator/index.ts
 */

// old version(will be delete)
export abstract class Iterator<T> {
  _cur

  // 迭代器指针操作
  abstract prev()             // 迭代器前移，并返回迭代器所指向的元素
  abstract next()             // 迭代器后移，并返回迭代器所指向的元素
  abstract done(): boolean    // 是否遍历完
  abstract hasNext(): boolean // 同上done

  abstract getNode()          // 获取迭代器结点 
  abstract get()              // 迭代器成员访问方法
  abstract getValue()         // 获取值
  // abstract getKey()        // 获取键值，如果有的话
  abstract remove()           // 通过迭代器删除
}

export * from './Iterable'
export * from './input_iterator'
export * from './output_iterartor'
export * from './forward_iterator'
export * from './bidirectional_iterator'
export * from './random_access_iterator'
