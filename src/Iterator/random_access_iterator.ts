/*
 * @Author: hzheyuan
 * @Date: 2022-02-12 11:00:45
 * @LastEditTime: 2022-03-12 11:30:57
 * @LastEditors: hzheyuan
 * @Description: interface identify the category of an iteratro as a random-access iterator
 * 
 * Random-access iterators are iterators that can be used to access elements at an arbitrary offset
 * position relative to the element they point to, offering the same functionality as pointer.
 * 
 * Random-access iterators are the most complete iterators in terms of functionality. 
 * All pointer types are also valid random-access iterators.
 * 
 * @FilePath: /tstl/src/Iterator/random_access_iterator.ts
 */
export interface RandomAccessIterator<T> extends Iterator<T>{
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

export function random_itr_distance<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>): number {
    let n = 0;
    while(first.hasNext() && first !== last) {
        n++;
        first.next()
    }
    return n;
}