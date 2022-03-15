/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:24:40
 * @LastEditTime: 2022-03-15 14:01:21
 * @LastEditors: hzheyuan
 * @Description: Modifying sequence operations
 * TODO
 * @FilePath: \tstl\src\algorithm\modifying_sequence_op.ts
 */
import { InputIterator, OutputIterator, BidirectionalIterator } from '@/Iterator'
import { jsCopy } from '@/utils/index'

/**
 * @description: Copy range of elements
 * copies the elements in the range [first, last) into the range beginning at result.
 * the function returns an iterator to the end of the destination range (which points to the element following the last element copied).
 * the range shall not overlap in such way that the result points to an element in the range [first, last). for such cases, use copy_backward.
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {OutputIterator} result
 * @return {*}
 */
export function copy<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  result: OutputIterator<T>
): OutputIterator<T> {
  while (first !== last) {
    const copyed_val = jsCopy(first.getValue())
    result.setValue(copyed_val)
    result.next
    first.next()
  }
  return result
}

/**
 * @description: Copy elements
 * copies the first n elements from the range begining at first into the range begeinning at result.
 * the function return an iterator to the end of the destination range (which points to one pats at last elmenet copied).
 * if n is negative, the function does nothing.
 * if the range overlap, some of the elments in the range pointed by result may have undefined but valid values.
 * @param {InputIterator} first
 * @param {number} n
 * @param {OutputIterator} result
 * @return {*}
 */
export function copy_n<T>(
  first: InputIterator<T>,
  n: number,
  result: OutputIterator<T>
): OutputIterator<T> {
  return result
}

/**
 * @description: Copy range of elements
 * copies the elements in the range [first, last) for which fn returns true to the range beginning at result.
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {OutputIterator} result
 * @return {*}
 */
export function copy_if<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  result: OutputIterator<T>,
  fn: (v: T) => boolean
): OutputIterator<T> {
  return result
}

/**
 * @description: copy range of elements backward
 * copies the elements in the range [first, last) starting from the end into range terminating as result.
 * the function returns an iterator to the first element in the destination range.
 * the resulting range has the elements in the exact same order as [first, last). to reverse their order see reverse_copy.
 * the function begins by copying (last-1) into (result-1), and then follows backward by the elements preceding these, until first is reached (and including it).
 * @param {BidirectionalIterator} first
 * @param {BidirectionalIterator} last
 * @param {BidirectionalIterator} result
 * @return {*}
 */
export function copy_backward<T>(
  first: BidirectionalIterator<T>,
  last: BidirectionalIterator<T>,
  result: BidirectionalIterator<T>
): BidirectionalIterator<T> {
  return result
}

/**
 * @description: mave range of elements
 * moves the elements in the range [fisrs, last) into the range beginning at result.
 * the move of elements in the range [first, last) in transferred to the elements pointed by result.
 * after the call, the elements in range [first, last) are left in an unspcified but valid state.
 * the ranges shall not overlap in such a way that result pointers to an element in the range [first, last).
 * for such cases, see move_backward.
 * @param {OutputIterator} first
 * @param {OutputIterator} last
 * @param {OutputIterator} result
 * @return {*}
 */
export function move<T>(
  first: OutputIterator<T>,
  last: OutputIterator<T>,
  result: OutputIterator<T>
): OutputIterator<T> {
  return result
}

// swap todo
export function swap() {}
export function swap_range() {}
export function iter_swap() {}

/**
 * @description: transform range
 * Applies an operation sequentially to the elements of one (1) or two(2) ranges and stores the result
 * in the range that begins at result.
 *  (1) unary operation: applies op to each of the elments in range [first1, last1)
 *      and stores the value returned by each operation in the range that begins at result.
 *  (2) binary operation: call binary_op using each of the elements in the range [first1, last1) at first
 *      arguments, and the respective argument in the range that begins at first2 as second argument. the value
 *      returned by each call is stored in the range that begins at result.
 * @param {InputIterator} first1
 * @param {InputIterator} last1
 * @param {OutputIterator} result
 * @param {*} fn
 * @return {*}
 */
export function transform<T>(
  first1: InputIterator<T>,
  last1: InputIterator<T>,
  result: OutputIterator<T>,
  fn
) {}

export function replace() {}
export function replace_copy() {}
export function replace_copy_if() {}
export function fill() {}
export function fill_n() {}
export function generate() {}
export function generate_n() {}
export function remove() {}
export function remove_if() {}
export function remove_copy() {}
export function remove_copy_if() {}
export function unique() {}
export function unique_copy() {}
export function reverse() {}
export function reverse_copy() {}
export function rotate() {}
export function rotate_copy() {}
export function random_shuffle() {}
export function shuffle() {}
