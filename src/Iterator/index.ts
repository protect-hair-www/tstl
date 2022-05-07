/*
 * @Author: hzheyuan
 * @Date: 2022-02-22 09:29:12
 * @LastEditTime: 2022-05-07 18:27:57
 * @LastEditors: kalai
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
 * |      Input | Output |
 * |       |             |
 * |    Forward          |
 * |       |             |
 * |  Bidirectional      |
 * |       |             |
 * |  Random Access      |
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
import { InputIterator } from './input_iterator'
import { OutputIterator } from './output_iterartor'
import { ForwardIterator } from './forward_iterator';
import { BidirectionalIterator } from './bidirectional_iterator';
import { RandomAccessIterator } from './random_access_iterator'

interface IteratorMap<T> {
  inputIterator: InputIterator<T>
  outputIterator: OutputIterator<T>
  forwardIterator: ForwardIterator<T>
  bidirectionalIterator: BidirectionalIterator<T>
  randomAccessIterator: RandomAccessIterator<T>
}

export type IteratorTypes<T> = InputIterator<T> | OutputIterator<T> | ForwardIterator<T> | BidirectionalIterator<T> | RandomAccessIterator<T>;
type LimitIteratorKeys = 'inputIterator' | 'outputIterator' | 'forwardIterator'; 
type bidirectionalIteratorKeys = 'bidirectionalIterator'; 
type randomAccessIteratorKey = 'randomAccessIterator'

type FilterKeys<T, U> = {[P in keyof T]: P extends U ? P : never};
type RelevantLimitKeys<T> = FilterKeys<IteratorMap<T>, LimitIteratorKeys>[keyof IteratorMap<T>] & keyof IteratorMap<T>;
type LimitIteratorMap<T> = Pick<IteratorMap<T>, LimitIteratorKeys>
type BidirectionalIteratorIteratorMap<T> = Pick<IteratorMap<T>, bidirectionalIteratorKeys> 
type RandomAccessIteratorMap<T> = Pick<IteratorMap<T>, randomAccessIteratorKey> 

/**
 * @description: advance for input|output|forward three kinds of iterators
 * @param {K} i
 * @param {number} n
 * @return {*}
 */
export function _advance_of_limited_iter<T, K extends LimitIteratorMap<T>[keyof LimitIteratorMap<T>]>(i: K, n: number) {
    while(n) {i.next(); --n;}
}

/**
 * @description: advance for bidirectionaly iterator
 * @param {K} i
 * @param {number} n
 * @return {*}
 */
export function _advance_for_bidirectional_iter<T, K extends BidirectionalIteratorIteratorMap<T>[keyof BidirectionalIteratorIteratorMap<T>]>(i: K, n: number) {
    if(n >= 0) { while(n--) {i.next()}}
    else { while(n++) {(i as BidirectionalIterator<T>).prev()} }
}

/**
 * @description: advance for randomaccess iterator
 * @param {K} i
 * @param {number} n
 * @return {*}
 */
export function _advance_for_randomaccess_iter<T, K extends RandomAccessIteratorMap<T>[keyof RandomAccessIteratorMap<T>]>(i: K, n: number) {
    i.increment(n);
}

/**
 * @description: public method for user
 * @param {*}
 * @return {*}
 */
// export function advance<T, K extends IteratorMap<T>[keyof IteratorMap<T>]>(i: K, n: number): void;
export function advance<T, K extends IteratorMap<T>[keyof IteratorMap<T>]>(i: K, n: number) {
  if(i.tag === IteratorTags.INPUT_ITERATOR || i.tag === IteratorTags.OUTPUT_ITERATOR || i.tag === IteratorTags.FORWARD_ITERATOR) {
    _advance_of_limited_iter(i, n);
  } else if(i.tag === IteratorTags.BIDIRECTIONAL_ITERATOR) {
    _advance_for_bidirectional_iter<T, BidirectionalIterator<T>>(i as BidirectionalIterator<T> , n);
  } else {
    _advance_for_randomaccess_iter<T, RandomAccessIterator<T>>(i as RandomAccessIterator<T>, n)
  }
  return i
};

/**
 * @description: get distance of [first, last) for randomaccess iterators
 * @param {K} first
 * @param {K} last
 * @return {*}
 */
export function _distance_for_randomaccess_iter<T, K extends RandomAccessIteratorMap<T>[keyof RandomAccessIteratorMap<T>]>(first: K, last: K) {
  // let n = first.index - last.index;
  let n = last.index - first.index;
  return n;
}

/**
 * @description: get distance of [first, last), public method for user
 * @param {IteratorTypes} first
 * @param {IteratorTypes} last
 * @return {*}
 */
export function distance<T>(first: IteratorTypes<T>, last: IteratorTypes<T>): number {
  first = first.copy(), last = last.copy()
  let n = 0
  if(first.tag === IteratorTags.RANDOM_ACCESS_ITERATOR) {
   n = _distance_for_randomaccess_iter(first as RandomAccessIterator<T>, last as RandomAccessIterator<T>)
  } else {
    while(!equals(first, last)) {first.next(); ++n;}
  }
  return n
}

/**
 * @description: check two iterator equals
 * @param {IteratorTypes} first
 * @param {IteratorTypes} last
 * @return {*}
 */
export function equals<T>(first: IteratorTypes<T>, last: IteratorTypes<T>): boolean {
  return first.cur === last.cur
}

/**
 * @description: swap and iter_swap
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @return {*}
 */
export function iter_swap<T>(first: ForwardIterator<T>, last: ForwardIterator<T>) {
  let _first = first.copy(), _last = last.copy()
  let temp = _first.value
  _first.value = _last.value
  _last.value = temp
}

export function iter_move<T>(i: IteratorTypes<T>) {
  // todo
  return i.value
}

export * from './base_iterator'
export * from './Iterable'
export * from './input_iterator'
export * from './output_iterartor'
export * from './forward_iterator'
export * from './bidirectional_iterator'
export * from './random_access_iterator'
export * from './impls/LinearIterator'
export * from './impls/ListIterator'
