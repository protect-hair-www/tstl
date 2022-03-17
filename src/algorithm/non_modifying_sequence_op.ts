/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:24:22
 * @LastEditTime: 2022-03-17 15:27:32
 * @LastEditors: hzheyuan
 * @Description: non modifying sequence operations
 * @FilePath: \tstl\src\algorithm\non_modifying_sequence_op.ts
 */
import { InputIterator, ForwardIterator, input_itr_distance, advance } from '../Iterator'

/**
 * @description: test condition on all elements in range
 * return true if fn return true for all the elements in the range [first, last) or if the range is empty, and false otherwise.
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {function} fn
 * @return {*}
 */
export function all_of<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  fn: (v: T) => boolean
): boolean {
  while (first !== last) {
    if (!fn(first.getValue())) return false
    first.next()
  }
  return true
}

/**
 * @description: same with all_of
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {function} fn
 * @return {*}
 */
export function every<T>(first: InputIterator<T>, last: InputIterator<T>, fn: (v: T) => boolean) {
  return all_of(first, last, fn)
}

/**
 * @description: test if any element in range fulfills condition
 * return true if fn returns true for any of the elements  in the range [first, last), and false otherwise
 * if [first, last) is empty range, return false
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {function} fn
 * @return {*}
 */
export function any_of<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  fn: (v: T) => boolean
): boolean {
  while (first !== last) {
    if (fn(first.getValue())) return true
    first.next()
  }
  return false
}

/**
 * @description: same as any_of
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {function} fn
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
 * @description: test if no in range fulfills condition
 * return true if fn returns false for all of the elements in the range [first, last), or if the range is empty, and false otherwise.
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {function} fn
 * @return {*}
 */
export function none_of<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  fn: (v: T) => boolean
): boolean {
  while (first !== last) {
    if (fn(first.getValue())) return false
    first.next()
  }
  return true
}

/**
 * @description: find value in range
 * return the first element in the range[first, last) that compares euqal to val. if no such element is found, return last.
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {T} val
 * @return {*}
 */
export function find<T>(first: InputIterator<T>, last: InputIterator<T>, val: T): T {
  while (first !== last && first.getValue() !== val) first.next()
  return first.getValue()
}

/**
 * @description: find value in range
 * return the first element in the range[first, last) that fn return true. if no such element is found, return last.
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {function} fn
 * @return {*}
 */
export function find_if<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  fn: (v: T) => boolean
): T {
  while (first !== last && fn(first.getValue())) first.next()
  return first.getValue()
}

/**
 * @description: find element in range negative condition
 * return the first element in the range [first, last) for which fn returns false, if no such element is found, return last.
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {function} fn
 * @return {*}
 */
export function find_if_not<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  fn: (v: T) => boolean
): T {
  while (first !== last && fn(first.getValue())) {
    if (!fn(first.getValue())) return first.getValue()
  }
  return last.getValue()
}

/**
 * @description: find last subsequence in range
 * searches the range [first1, last2) for the last occurrence of the sequence difined by [first2, last2), and returns
 * its first element, or last1 if no occurrence are found.
 *
 * the elements in both ranges are compared sequentially using fn: a subsequence of [first1, last1) is considered a match
 * only when this is true for all elements of [first2, last2).
 *
 * this function returns the last of such occurrence. For an algorithm that return this first instead.
 * @param {*}
 * @return {*}
 */
export function find_end<T>(
  first1: ForwardIterator<T>,
  last1: ForwardIterator<T>,
  first2: ForwardIterator<T>,
  last2: ForwardIterator<T>,
  fn: (x: T, y: T) => boolean
): T {
  if (first2 === last2) return last1.getValue()
  let ret = last1
  while (first1 !== last1) {
    const it1 = first1,
      it2 = first2
    while (fn(it1.getValue(), it2.getValue())) {
      it1.next(), it2.next()
      if (it2 === last2) {
        ret = first1
        break
      }
      if (it1 == last1) return ret.getValue()
    }
    first1.next()
  }
  return ret.getValue()
}

/**
 * @description: find element from set in range
 *
 * return the first element in the range [first1, last1) that match any of the element in [first2, last2).
 * if no such element if found, the function returns last1.
 *
 * the elements in [first1, last1) are sequentially compared to each of the values in [first2, last2) using
 * fn, util a pair matches.
 *
 * @param {*}
 * @return {*}
 */
export function find_first_of<T>(
  first1: ForwardIterator<T>,
  last1: ForwardIterator<T>,
  first2: ForwardIterator<T>,
  last2: ForwardIterator<T>,
  fn: (x: T, y: T) => boolean
): T {
  while (first1 !== last1) {
    for (const it = first2; it !== last2; it.next()) {
      if (fn(it.getValue(), first1.getValue())) return first1.getValue()
    }
  }
  return last1.getValue()
}

/**
 * @description: find eqaul adjacent element in range
 * searches the range [first,last) for first occurrence of two consecutive elements that match
 * and return the first of these two elements, or last if no such parir is found.
 * two elements match if they compare equal using function fn.
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @param {function} fn
 * @return {*}
 */
export function adjacent_find<T>(
  first: ForwardIterator<T>,
  last: ForwardIterator<T>,
  fn: (a: T, b: T) => boolean
): T {
  if (first !== last) {
    const next = first
    next.next()
    while (next !== last) {
      if (fn(first.getValue(), next.getValue())) return first.getValue()
      first.next()
      next.next()
    }
  }
  return last.getValue()
}

/**
 * @description: Count appearnces of value in range
 * return the number of elements in the range [first, last) that compare equla to val.
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {function} fn
 * @return {*}
 */
export function count<T>(first: InputIterator<T>, last: InputIterator<T>, val: T): number {
  let ret = 0
  while (first !== last) {
    if (first.getValue() === val) ret++
    first.next()
  }
  return ret
}

/**
 * @description: Count appearnces of value in range
 * return the number of elements in the range [first, last) that fn(val) return true.
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {function} fn
 * @return {*}
 */
export function count_if<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  fn: (val: T) => boolean
): number {
  let ret = 0
  while (first !== last) {
    if (fn(first.getValue())) ret++
    first.next()
  }
  return ret
}

/**
 * @description: return first position where two ranges differ
 * compares the elements in the range [first1, last1) with those in the range beginning at first2,
 * and returns the first element of both sequences that does not match.
 * the function return a pair of the first in each range that dose not match.
 * @param {*}
 * @return {*}
 */
export function mismatch<T>(
  first1: InputIterator<T>,
  last1: InputIterator<T>,
  first2: InputIterator<T>,
  last2: InputIterator<T>
): [T, T] {
  while (first1.getValue() !== last1.getValue() && first1.getValue() !== last2.getValue()) {
    first1.next()
    first2.next()
  }
  return [first1.getValue(), first2.getValue()]
}

/**
 * @description: test whether the elements in two ranges are equal
 * Compares the elements in the range [first1, last1) with those in range beginning at first2
 * and returns true if all of the elements in both ranges match.
 * @param {InputIterator} first1
 * @param {InputIterator} last1
 * @param {InputIterator} first2
 * @return {*}
 */
export function equal<T>(
  first1: InputIterator<T>,
  last1: InputIterator<T>,
  first2: InputIterator<T>,
  fn: (a: T, b: T) => boolean
): boolean {
  while (first1 !== last1) {
    if (!fn(first1.getValue(), first2.getValue())) return false
    first1.next()
    first2.next()
  }
  return true
}

/**
 * @description: test whether range is premutation of another
 * compares the elements in the range [first1, last1) with those in the range beginning at first2,
 * and returns true if all of the elements in both ranges match, even in a diffrent order.
 * @param {InputIterator} first1
 * @param {InputIterator} last1
 * @param {InputIterator} first2
 * @param {function} fn
 * @return {*}
 */
export function is_premutation<T>(
  first1: InputIterator<T>,
  last1: InputIterator<T>,
  first2: InputIterator<T>,
  fn: (a: T, b: T) => boolean
): boolean {
  if (first1 === last1) return true
  const last2 = first2
  const dis = input_itr_distance(first1, last1)
  advance(last2, dis)
  for (const it1 = first1; it1 != last1; it1.next()) {
    if (find(first1, it1, it1.getValue()) === it1.getValue()) {
      const n = count(first2, last2, it1.getValue())
      if (n == 0 || count(it1, last1, it1.getValue()) !== n) return false
    }
  }
  return true
}

/**
 * @description: searches the range [first1, last1) for the first occurrence of the sequence defined by [first2, last2),
 * and return the first element, or last1 if no occurrences are found.
 *
 * the element in both ranges are compared sequentially use operator === (or fn): A subsequence of [first1, last1)
 * in considered a match only when this is true for all the elements of [first2, last2).
 *
 * this function return the first of such occurrences.
 * @param {ForwardIterator} first1
 * @param {ForwardIterator} last1
 * @param {ForwardIterator} first2
 * @param {ForwardIterator} last2
 * @return {*}
 */
export function search<T>(
  first1: ForwardIterator<T>,
  last1: ForwardIterator<T>,
  first2: ForwardIterator<T>,
  last2: ForwardIterator<T>
): T {
  if (first2 === last2) return first1.getValue()
  while (first1 !== last2) {
    const it1 = first1,
      it2 = first2
    while (it1.getValue() === it2.getValue()) {
      it1.next()
      it2.next()
      if (it1 === last1) return last1.getValue()
      if (it2 === last2) return first1.getValue()
    }
    first1.next()
  }
  return last1.getValue()
}

/**
 * @description: search range for elements
 * searches the range [first,last) for a sequence of count elements, each comparing equal to val (or for which pred returns true).
 * the function returns an iterator to the first of such elements, or last if no such sequence is found.
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @param {number} count
 * @param {T} val
 * @return {*}
 */
export function search_n<T>(
  first: ForwardIterator<T>,
  last: ForwardIterator<T>,
  count: number,
  val: T
): ForwardIterator<T> {
  let it, limit, i
  limit = first

  const dis = input_itr_distance(first, last)
  advance(limit, dis)
  while (first !== limit) {
    it = first
    i = 0
    while (it.getValue() === val) {
      it.next()
      if (++i === count) return first
    }
    first.next()
  }
  return last
}
