/*
 * @Author: hzheyuan
 * @Date: 2022-02-22 09:29:12
 * @LastEditTime: 2022-03-21 16:15:32
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
export enum IteratorTags {
  BASE,
  INPUT_ITERATOR,
  OUTPUT_ITERATOR,
  FORWARD_ITERATOR,
  BIDIRECTIONAL_ITERATOR,
  RANDOM_ACCESS_ITERATOR
};
import { BaseIterator } from './base_iterator';
import { InputIterator } from './input_iterator'
import { OutputIterator } from './output_iterartor'
import { ForwardIterator } from './forward_iterator';
import { BidirectionalIterator } from './bidirectional_iterator';
import { RandomAccessIterator } from './random_access_iterator'

type IteratorTypes<T> = InputIterator<T> | OutputIterator<T> | ForwardIterator<T> | BidirectionalIterator<T> | RandomAccessIterator<T>;

// export function advance<T>(i: IteratorTypes<T>, n: number): void;
export function advance<T>(i: IteratorTypes<T>, n: number): void;
export function advance<T>(i: IteratorTypes<T>, n: number) {
  if(i.tag === IteratorTags.INPUT_ITERATOR || i.tag === IteratorTags.OUTPUT_ITERATOR || i.tag === IteratorTags.FORWARD_ITERATOR) {
    while(n) {i.next(); --n;}
  } else if(i.tag === IteratorTags.BIDIRECTIONAL_ITERATOR) {
    if(n >= 0) { while(n--) {i.next()}}
    else { while(n++) {(i as BidirectionalIterator<T>).prev()} }
  } else {
    (i as RandomAccessIterator<T>).increment(n);
  }
};

// export function equals<T>(first: T, last: T): boolean;
export function equals<T>(first: IteratorTypes<T>, last: IteratorTypes<T>): boolean {
  let tag = first.tag;
  let firstVal = first.value, lastVal = last.value;
  if(typeof first._cur === 'number') {
    return first._cur === last._cur
  } else {
    return first._cur === last._cur
  }
}

export function distance<T>(first: IteratorTypes<T>, last: IteratorTypes<T>): number;
export function distance<T>(first, last): number {
  let n = 0
  if(first.tag === IteratorTags.INPUT_ITERATOR || first.tag === IteratorTags.OUTPUT_ITERATOR || first.tag === IteratorTags.FORWARD_ITERATOR) {
    while(!equals(first, last)) {first.next(); ++n;}
  } else if(first.tag === IteratorTags.BIDIRECTIONAL_ITERATOR) {
    while(!equals(first, last)) {first.next(); ++n;}
  } else {
    n = first.index - last.index;
  }
  return n
}

export function itr_move<T>(itr: InputIterator<T>): T {
  return itr.getValue()
}

export function itr_swap<T>(first: BidirectionalIterator<T>, last: BidirectionalIterator<T>) {}

export * from './base_iterator'
export * from './Iterable'
export * from './input_iterator'
export * from './output_iterartor'
export * from './forward_iterator'
export * from './bidirectional_iterator'
export * from './random_access_iterator'
