/*
 * @Author: hzheyuan
 * @Date: 2022-03-12 11:02:28
 * @LastEditTime: 2022-03-12 15:48:43
 * @LastEditors: hzheyuan
 * @Description: Bidirectional iterator
 * @FilePath: /tstl/src/Iterator/bidirectional_iterator.ts
 */

export interface BidirectionalIterator<T> extends Iterator<T>{
  _cur                              // current position

  get key();                        // get current key or index(getter)
  getKey();                         // get current key or index

  get value(): T                    // access current position element(getter)
  getValue(): T                     // access current position element

  // next(): T                      // position increment and return the value
  prev?(): IteratorResult<T>        // iterator decrement and return IteratorResult({donw: boolean, value: T})
  
  hasNext(): boolean                // test whether has next element
  hasPerv?(): boolean               // test whether has previous element

  done(): boolean                   // test finished the trave (done === !hasNext())
  getNode()                         // get position element(some datastruct need get node (eg. map, set...))
  remove?()                          // erase the position element

  [Symbol.iterator](): Iterator<T>  // Javascript，iterable object have to implementation「@@iterator」method，Javascript can access the property with [Symbol.iterator]
}
