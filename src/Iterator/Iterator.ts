/*
 * @Author: hzheyuan
 * @Date: 2022-03-10 23:20:05
 * @LastEditTime: 2022-03-11 17:18:45
 * @LastEditors: hzheyuan
 * @Description: Iterator Interface
 * 
 * This ia s common iterator interface for TSSTL，which is a extend of Javascript interator.
 * In Javascript an iterator is an object which defines a sequnence an potentially a return value upon its termination.
 * Sepcifically, an iterator in any object implements .
 * 
 * Iterator protocol [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol].
 * which has a next() method that return an object whith two properties:
 * 
 *  (1) value: the next value in the iteration sequnence.
 *  (2) done: is ture if the last value in the sequnence has already been consumed. if value is present alongsize done, it is the iterator's return value
 * 
 * @FilePath: \tstl\src\Iterator\Iterator.ts
*/

export interface ListIterator<T> extends Iterator<T>{
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