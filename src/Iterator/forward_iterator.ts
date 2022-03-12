/*
 * @Author: hzheyuan
 * @Date: 2022-02-12 11:03:38
 * @LastEditTime: 2022-03-12 11:07:17
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/Iterator/forward_iterator.ts
 */
export interface ForwardIterator<T> extends Iterator<T>{
  _cur                              // current position

  get key();                        // get current key or index(getter)
  getKey();                         // get current key or index

  get value(): T                    // access current position element(getter)
  getValue(): T                     // access current position element
  
  hasNext(): boolean                // test whether has next element

  done(): boolean                   // test finished the trave (done === !hasNext())
  getNode()                         // get position element(some datastruct need get node (eg. map, set...))
  remove?()                          // erase the position element

  [Symbol.iterator](): Iterator<T>  // Javascript，iterable object have to implementation「@@iterator」method，Javascript can access the property with [Symbol.iterator]
}