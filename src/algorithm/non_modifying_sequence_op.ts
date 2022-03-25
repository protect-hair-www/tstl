/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:24:22
 * @LastEditTime: 2022-03-25 16:42:28
 * @LastEditors: hzheyuan
 * @Description: non modifying sequence operations
 * @FilePath: \tstl\src\algorithm\non_modifying_sequence_op.ts
 */
import { InputIterator, OutputIterator, ForwardIterator, advance, distance, itr_move } from '../Iterator'

/**
 * @description test condition on all elements in range
 * return true if fn return true for all the elements in the range [first, last) or if the range is empty, and false otherwise.
 * @param {InputIterator} first initial position in a sequence
 * @param {InputIterator} last final position in a sequence
 * @param {function} fn Unary function that accepts an element in the range as argument and return a value convertiable to boolean.
 * @return {boolean} boolean
 */
export function all_of<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  fn: (v: T) => boolean
): boolean {
  let _first = first, _last = last;
  while (!_first.equals(_last)) {
    if (!fn(_first.value)) return false
    _first.next()
  }
  return true
}

/**
 * @description same with all_of
 * @param {InputIterator} first initial position in a sequence
 * @param {InputIterator} last initial position in a sequence
 * @param {function} fn Unary function that accepts an element in the range as argument and return a value convertiable to boolean.
 * @return {boolean} boolean
 */
export function every<T>(first: InputIterator<T>, last: InputIterator<T>, fn: (v: T) => boolean) {
  return all_of(first, last, fn)
}

/**
 * @description test if any element in range fulfills condition
 * return true if fn returns true for any of the elements  in the range [first, last), and false otherwise
 * if [first, last) is empty range, return false
 * @param {InputIterator} first initial position in a sequence
 * @param {InputIterator} last initial position in a sequence
 * @param {function} fn Unary function that accepts an element in the range as argument and return a value convertiable to boolean.
 * @return {*}
 */
export function any_of<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  fn: (v: T) => boolean
): boolean {
  first = first.copy();
  while (!first.equals(last)) {
    if (fn(first.value)) return true
    first.next()
  }
  return false
}

/**
 * @description same as any_of
 * @param {InputIterator} first initial position in a sequence
 * @param {InputIterator} last initial position in a sequence
 * @param {function} fn Unary function that accepts an element in the range as argument and return a value convertiable to boolean.
 * @return {*}
 */
export function any<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  fn: (v: T) => boolean
): boolean {
  return any_of(first, last, fn)
}

/**
 * @description test if no in range fulfills condition
 * return true if fn returns false for all of the elements in the range [first, last), or if the range is empty, and false otherwise.
 * @param {InputIterator} first initial position in a sequence
 * @param {InputIterator} last initial position in a sequence
 * @param {function} fn Unary function that accepts an element in the range as argument and return a value convertiable to boolean.
 * @return {*}
 */
export function none_of<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  fn: (v: T) => boolean
): boolean {
  first = first.copy();
  while (!first.equals(last)) {
    if (fn(first.value)) return false
    first.next()
  }
  return true
}

/**
 * @description apply function to range
 * applies function fn to each of the elements in the range [first,last)
 * 
 * @param {InputIterator} first initial position in a sequence
 * @param {InputIterator} last initial position in a sequence
 * @param {function} fn Unary function that accepts an element in the range as argument and return a value convertiable to boolean.
 * @return {*}
 */
export function for_each<T>(first: InputIterator<T>, last: InputIterator<T>, fn: (v: T) => any) {
  first = first.copy();
  while (!first.equals(last)) {
    fn(first.value)
    first.next()
  }
}

/**
 * @description find value in range
 * return the first element in the range[first, last) that compares euqal to val. if no such element is found, return last.
 * @param {InputIterator} first initial position in a sequence
 * @param {InputIterator} last initial position in a sequence
 * @param {function} fn Unary function that accepts an element in the range as argument and return a value convertiable to boolean.
 * @return {InputIterator<T>} InputIterator<T>
 */
export function find<T>(first: InputIterator<T>, last: InputIterator<T>, fn: (v: T) => boolean): InputIterator<T>;
export function find<T>(first: InputIterator<T>, last: InputIterator<T>, val: T): InputIterator<T>;
export function find<T>(...args: any[]): InputIterator<T> {
  let first = args[0].copy(), last = args[1], pred = args[2];
  while (!first.equals(last)) {
    if (typeof pred === 'function') {
      if (pred(first.value)) return first
    } else {
      if (first.value === pred) return first
    }
    first.next()
  }
  return last.copy()
}

/**
 * @description find value in range
 * return the first element in the range[first, last) that fn return true. if no such element is found, return last.
 * @param {InputIterator} first initial position in a sequence
 * @param {InputIterator} last initial position in a sequence
 * @param {function} fn Unary function that accepts an element in the range as argument and return a value convertiable to boolean.
 * @return {InputIterator<T>} InputIterator<T>
 */
export function find_if<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  fn: (v: T) => boolean
): InputIterator<T> {
  first = first.copy();
  while (!first.equals(last)) {
    if (fn(first.value)) return first
    first.next()
  }
  return last.copy()
}

/**
 * @description find element in range negative condition
 * return the first element in the range [first, last) for which fn returns false, if no such element is found, return last.
 * @param {InputIterator} first initial position in a sequence
 * @param {InputIterator} last initial position in a sequence
 * @param {function} fn Unary function that accepts an element in the range as argument and return a value convertiable to boolean.
 * @return {InputIterator<T>} InputIterator<T>
 */
export function find_if_not<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  fn: (v: T) => boolean
): InputIterator<T> {
  first = first.copy();
  while (!first.equals(last)) {
    if (!fn(first.value)) return first
    first.next()
  }
  return last.copy()
}

/**
 * @description find last subsequence in range.
 * 
 * searches the range [first1, last1) for the last occurrence of the sequence difined by [first2, last2), 
 * and returns its first element, if no occurrence are found return last1.
 *
 * the elements in both ranges are compared sequentially using fn: a subsequence of [first1, last1) is considered a match
 * only when this is true for all elements of [first2, last2).
 *
 * this function returns the last of such occurrence. For an algorithm that return this first instead.
 * @param {ForwardIterator<T>} first1
 * @param {ForwardIterator<T>} last1
 * @param {ForwardIterator<T>} first2
 * @param {ForwardIterator<T>} last2
 * @return {ForwardIterator<T>} ForwardIterator<T>
 */
export function find_end<T>(first1: ForwardIterator<T>, last1: ForwardIterator<T>, first2: ForwardIterator<T>, last2: ForwardIterator<T>, fn?: (x: T, y: T) => boolean): ForwardIterator<T>;
export function find_end<T>(...args: any[]) {
  let first1 = (args[0].copy() as ForwardIterator<T>);
  let first2 = (args[2].copy() as ForwardIterator<T>);
  let last1 = args[1], last2 = args[3], pred = args[4];
  if (first2.equals(last2)) return last1

  let ret = last1.copy()
  while (!first1.equals(last1)) {
    const it1 = first1.copy(), it2 = first2.copy();
    if (typeof pred === 'function') {
      while (pred(it1.value, it2.value)) {
        it1.next(), it2.next()
        if (it2.equals(last2)) { ret = first1.copy(); break; }
        if (it1 == last1) return ret
      }
    } else {
      while (it1.value === it2.value) {
        it1.next(), it2.next()
        if (it2.equals(last2)) { ret = first1.copy(); break; }
        if (it1.equals(last1)) return ret
      }
    }
    first1.next()
  }
  return ret
}

/**
 * @description find element from set in range
 *
 * return the first element in the range [first1, last1) that match any of the element in [first2, last2).
 * if no such element if found, the function returns last1.
 *
 * the elements in [first1, last1) are sequentially compared to each of the values in [first2, last2) using
 * fn, util a pair matches.
 *
 * @param {InputIterator<T>} first1 input iterators to the initial positions of the searched sequence.
 * @param {InputIterator<T>} last1 input iterators to the final positions of the searched sequence.
 * @param {ForwardIterator<T>} first2 forward iterators to the initial positions of the element values to be searched for. The range used is [first2,last2).
 * @param {ForwardIterator<T>} last2 forward iterators to the final positions of the element values to be searched for. The range used is [first2,last2).
 * @return {InputIterator<T>} an iterator to the first element in [first1,last1) that is part of [first2,last2). if no matches are found, the function returns last1.
 */
export function find_first_of<T>(
  first1: InputIterator<T>,
  last1: InputIterator<T>,
  first2: ForwardIterator<T>,
  last2: ForwardIterator<T>,
  fn?: (x: T, y: T) => boolean
): InputIterator<T> {
  first1 = first1.copy(), first2 = (first2.copy() as ForwardIterator<T>);
  while (!first1.equals(last1)) {
    for (const it = first2.copy(); !it.equals(last2); it.next()) {
      if (fn && fn(it.value, first1.value)) return first1.copy()
      else if (it.value === first1.value) return first1.copy();
    }
    first1.next()
  }
  return last1.copy()
}

/**
 * @description find eqaul adjacent element in range
 * searches the range [first,last) for first occurrence of two consecutive elements that match
 * and return the first of these two elements, or last if no such parir is found.
 * two elements match if they compare equal using function fn.
 * @param {InputIterator<T>} first1 input iterators to the initial positions of the searched sequence.
 * @param {InputIterator<T>} last1 input iterators to the final positions of the searched sequence.
 * @param {function} fn binary function that accepts two elements as arguments, and returns a value convertible to bool. 
 * the returned value indicates whether the elements are considered to match in the context of this function.
 * @return {ForwardIterator<T>} an iterator to the first element of the first pair of matching consecutive elements in the range [first,last).
 * if no such pair is found, the function returns last.
 */
export function adjacent_find<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, fn?: (x: T, y: T) => boolean): ForwardIterator<T> {
  first = (first.copy() as ForwardIterator<T>)
  if (!first.equals(last)) {
    const next = first.copy()
    next.next()
    while (!next.equals(last)) {
      if (fn && fn(first.value, next.value)) return first
      else if (first.value === next.value) return first;
      first.next(); next.next()
    }
  }
  return last.copy() as ForwardIterator<T>
}

/**
 * @description count appearnces of value in range
 * return the number of elements in the range [first, last) that compare equla to val.
 * @param {InputIterator<T>} first input iterators to the initial positions of the searched sequence.
 * @param {InputIterator<T>} last input iterators to the final positions of the searched sequence.
 * @param {function | val} pred Unary function that accepts an element in the range as argument and return a value convertiable to boolean.
 * @return {number} count appearnces of value in range
 */
export function count<T>(first: InputIterator<T>, last: InputIterator<T>, val: T): number;
export function count<T>(first: InputIterator<T>, last: InputIterator<T>, fn: (v: T) => boolean): number;
export function count<T>(...args: any[]): number {
  let first = args[0].copy(), last = args[1], pred = args[2], ret = 0;
  while (!first.equals(last)) {
    if (typeof pred === 'function') {
      if (pred(first.value)) ret++;
    } else {
      if (first.value === pred) ret++
    }
    first.next()
  }
  return ret
}

/**
 * @description Count appearnces of value in range
 * return the number of elements in the range [first, last) that fn(val) return true.
 * @param {InputIterator<T>} first input iterators to the initial positions of the searched sequence.
 * @param {InputIterator<T>} last input iterators to the final positions of the searched sequence.
 * @param {function} pred Unary function that accepts an element in the range as argument and return a value convertiable to boolean.
 * @return {number} count appearnces of value in range
 */
export function count_if<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  fn: (val: T) => boolean
): number {
  let ret = 0
  while (!first.equals(last)) {
    if (fn(first.value)) ret++
    first.next()
  }
  return ret
}

/**
 * @description return first position where two ranges differ
 * compares the elements in the range [first1, last1) with those in the range beginning at first2,
 * and returns the first element of both sequences that does not match.
 * the function return a pair of the first in each range that dose not match.
 * @param {InputIterator<T>} first1 input iterators to the initial positions of the first sequence.
 * @param {InputIterator<T>} last1 input iterators to the final positions of the first sequence.
 * @param {InputIterator<T>} first2 input iterators to the initial positions of the second sequence.
 * @param {function} fn binary function that accepts two elements as arguments, and returns a value convertible to bool. 
 * @return {number} first position where two ranges differ
 */
export function mismatch<T>(
  first1: InputIterator<T>,
  last1: InputIterator<T>,
  first2: InputIterator<T>,
  fn?: (x: T, y: T) => boolean
): [InputIterator<T>, InputIterator<T>] {
  first1 = first1.copy(), first2 = first2.copy(), last1 = last1.copy();
  if (fn) {
    while (!first1.equals(last1) && fn(first1.value, first2.value)) {
      first1.next(); first2.next()
    }
  } else {
    while (!first1.equals(last1) && first1.value === first2.value) {
      first1.next(); first2.next()
    }
  }
  return [first1, first2]
}

/**
 * @description test whether the elements in two ranges are equal
 * Compares the elements in the range [first1, last1) with those in range beginning at first2
 * and returns true if all of the elements in both ranges match.
 * @param {InputIterator<T>} first1 input iterators to the initial positions of the first sequence.
 * @param {InputIterator<T>} last1 input iterators to the final positions of the first sequence.
 * @param {InputIterator<T>} first2 input iterator to the initial position of the second sequence. 
 * @param {function} [fn] binary function that accepts two elements as arguments, and returns a value convertible to bool. 
 * @return {Boolean} whether the elements in two ranges are equal
 */
export function equal<T>(
  first1: InputIterator<T>,
  last1: InputIterator<T>,
  first2: InputIterator<T>,
  fn?: (a: T, b: T) => boolean
): boolean {
  first1 = first1.copy(); first2 = first2.copy();
  while (!first1.equals(last1)) {
    if (fn && !fn(first1.value, first2.value)) return false
    else if (first1.value !== first2.value) return false
    first1.next()
    first2.next()
  }
  return true
}

/**
 * @description test whether range is premutation of another
 * compares the elements in the range [first1, last1) with those in the range beginning at first2,
 * and returns true if all of the elements in both ranges match, even in a diffrent order.
 * @param {InputIterator<T>} first1 input iterators to the initial positions of the first sequence.
 * @param {InputIterator<T>} last1 input iterators to the final positions of the first sequence.
 * @param {InputIterator<T>} first2 input iterator to the initial position of the second sequence. 
 * @param {function} [fn] binary function that accepts two elements as argument (one of each of the two sequences, in the same order), and returns a value convertible to bool.
 * @return {*}
 */
export function is_premutation<T>(
  first1: InputIterator<T>,
  last1: InputIterator<T>,
  first2: InputIterator<T>,
  fn?: (a: T, b: T) => boolean
): boolean {
  first1 = first1.copy(); first2 = first2.copy();
  [first1, first2] = mismatch(first1, last1, first2)

  if (first1.equals(last1)) return true

  const last2 = first2.copy()
  const dis = distance(first1, last1.copy())

  advance(last2, dis)
  for (const it1 = first1.copy(); !it1.equals(last1); it1.next()) {
    let fitr = find(first1, it1, it1.value)
    if (fitr.equals(it1)) {
      const n = count(first2, last2, it1.value)
      if (n == 0 || count(it1, last1, it1.value) !== n) return false
    }
  }
  return true
}

/**
 * @description searches the range [first1, last1) for the first occurrence of the sequence defined by [first2, last2),
 * and return the first element, or last1 if no occurrences are found.
 *
 * the element in both ranges are compared sequentially use operator === (or fn): A subsequence of [first1, last1)
 * in considered a match only when this is true for all the elements of [first2, last2).
 *
 * this function return the first of such occurrences.
 * @param {ForwardIterator} first1 forward iterators to the initial  positions of the searched sequence. The range used is [first1,last1).
 * @param {ForwardIterator} last1 forward iterators to final positions of the searched sequence. The range used is [first1,last1). 
 * @param {ForwardIterator} first2 forward iterators to the initial positions of the sequence to be searched for. The range used is [first2,last2).
 * @param {ForwardIterator} last2 forward iterators to and final positions of the sequence to be searched for. The range used is [first2,last2).
 * @param {function} [fn] binary function that accepts two elements as arguments (one of each of the two sequences, in the same order), and returns a value convertible to bool. 
 * @return {ForwardIterator<T>}
 */
export function search<T>(
  first1: ForwardIterator<T>,
  last1: ForwardIterator<T>,
  first2: ForwardIterator<T>,
  last2: ForwardIterator<T>,
  fn?: (a: T, b: T) => boolean
): ForwardIterator<T> {
  first1 = (first1.copy() as ForwardIterator<T>); last1 = (last1.copy() as ForwardIterator<T>);
  first2 = (first2.copy() as ForwardIterator<T>); last2 = (last2.copy() as ForwardIterator<T>);
  if (first2.equals(last2)) return first1

  while (!first1.equals(last1)) {
    const it1 = first1.copy(), it2 = first2.copy();
    if (fn) {
      while (fn(it1.value, it2.value)) {
        it1.next(); it2.next();
        if (it1.equals(last1)) return last1
        if (it2.equals(last2)) return first1
      }
    } else {
      while (it1.value === it2.value) {
        it1.next(); it2.next();
        if (it1.equals(last1)) return last1
        if (it2.equals(last2)) return first1
      }
    }
    first1.next()
  }
  return last1
}

/**
 * @description search range for elements
 * searches the range [first,last) for a sequence of count elements, each comparing equal to val (or for which pred returns true).
 * the function returns an iterator to the first of such elements, or last if no such sequence is found.
 * @param {ForwardIterator} first forward iterators to the initial of the searched sequence. The range used is [first,last).
 * @param {ForwardIterator} last forward iterators to final positions of the searched sequence. The range used is [first,last).
 * @param {number} count Minimum number of successive elements to match. size shall be (convertible to) an number type.
 * @param {T} val 
 * @param {function} [fn] binary function that accepts two elements as arguments (one of each of the two sequences, in the same order), and returns a value convertible to bool. 
 * @return {ForwardIterator<T>}
 */
export function search_n<T>( first: ForwardIterator<T>, last: ForwardIterator<T>, count: number, val: T): ForwardIterator<T>;
export function search_n<T>( first: ForwardIterator<T>, last: ForwardIterator<T>, count: number, val: T, fn?: (x: T, y: T) => boolean): ForwardIterator<T>;
export function search_n<T>(...args: any[]): ForwardIterator<T> {
  let first = args[0].copy(), last = args[1].copy(), count = args[2], val = args[3], pred = args[4];
  let it, limit, i
  limit = first.copy()

  const dis = distance(first, last)
  advance(limit, dis)
  while (!first.equals(limit)) {
    it = first
    i = 0
    if(pred) {
      while (pred(it.value, val)) {
        it.next()
        if (++i === count) return first
      }
    } else {
      while (it.value === val) {
        it.next()
        if (++i === count) return first
      }
    }
    first.next()
  }
  return last
}
