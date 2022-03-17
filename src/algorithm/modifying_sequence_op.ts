/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:24:40
 * @LastEditTime: 2022-03-17 15:27:25
 * @LastEditors: hzheyuan
 * @Description: Modifying sequence operations
 * TODO
 * @FilePath: \tstl\src\algorithm\modifying_sequence_op.ts
 */
import {
  InputIterator,
  OutputIterator,
  BidirectionalIterator,
  ForwardIterator,
  itr_move,
  itr_swap
} from '../Iterator'
import { RandomAccessIterator, random_itr_distance } from './../Iterator/random_access_iterator'
import { jsCopy } from '../utils/index'

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
  while (n > 0) {
    result.setValue(first.getValue())
    result.next()
    first.next()
    --n
  }
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
  while (first !== last) {
    const val = first.getValue()
    if (fn(val)) {
      result.setValue(val)
      result.next()
    }
    first.next()
  }
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
  while (last !== first) {
    first.prev()
    last.prev()
    first.setValue(last.getValue())
  }
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
  first: InputIterator<T>,
  last: InputIterator<T>,
  result: OutputIterator<T>
): OutputIterator<T> {
  while (first !== last) {
    result.setValue(itr_move(last))
  }
  return result
}

// swap todo
export function swap() {}
export function swap_range() {}
// export function iter_swap() {}

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
) {
  while (first1 !== last1) {
    const val = fn(first1.getValue())
    result.setValue(val)
    result.next()
    first1.next()
  }
  return result
}

/**
 * @description: replace value in range
 * assign new_val to all the elements in the range [first, last) that compare equal to old_val
 * the functions use operator === to compare the individual elements to old_val.
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @param {T} old_val
 * @param {T} new_val
 * @return {*}
 */
export function replace<T>(
  first: ForwardIterator<T>,
  last: ForwardIterator<T>,
  old_val: T,
  new_val: T
): void {
  while (first !== last) {
    if (first.getValue() === old_val) first.setValue(new_val)
    first.next()
  }
}

/**
 * @description: replace value in range
 * assign new_val to all the elements in the range [first, last) which fn returns true.
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @param {T} old_val
 * @param {T} new_val
 * @return {*}
 */
export function replace_if<T>(
  first: ForwardIterator<T>,
  last: ForwardIterator<T>,
  fn: (v: T) => boolean,
  new_val: T
): void {
  while (first !== last) {
    if (fn(first.getValue())) first.setValue(new_val)
    first.next()
  }
}

/**
 * @description: copy range replacing value
 * copies the elements in the range [first, last) to the range beginning at result, replacing the apprarance of old_val by new_val.
 * the function use operator "===" to compare the individual elements to old_val.
 * the ranges shall not overlap in such a way result points to an elements in the range [first, last)
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {OutputIterator} result
 * @param {T} old_val
 * @param {T} new_val
 * @return {*}
 */
export function replace_copy<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  result: OutputIterator<T>,
  old_val: T,
  new_val: T
): OutputIterator<T> {
  while (first !== last) {
    const val = first.getValue()
    result.setValue(val === old_val ? new_val : first.getValue())
    result.next()
    first.next()
  }
  return result
}

/**
 * @description: copy range replacing value
 * copies the elements in the range [first, last) to the range beginning at result, replacing the apprarance of old_val by new_val.
 * the function use operator "===" to compare the individual elements to old_val.
 * the ranges shall not overlap in such a way result points to an elements in the range [first, last)
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {OutputIterator} result
 * @param {*} fn
 * @param {T} new_val
 * @return {*}
 */
export function replace_copy_if<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  result: OutputIterator<T>,
  fn: (v: T) => boolean,
  new_val: T
): OutputIterator<T> {
  while (first !== last) {
    const val = first.getValue()
    result.setValue(fn(val) ? new_val : first.getValue())
    result.next()
    first.next()
  }
  return result
}

/**
 * @description: fill range with value
 * Assigns val to the elements in the range [first, last)
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @param {T} val
 * @return {*}
 */
export function fill<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, val: T) {
  while (first !== last) {
    first.setValue(val)
    first.next()
  }
}

/**
 * @description: fill range with value
 * Assigns val to the first n elements of the range pointed by first
 * @param {ForwardIterator} first
 * @param {number} n
 * @param {T} val
 * @return {*}
 */
export function fill_n<T>(first: ForwardIterator<T>, n: number, val: T) {
  while (n > 0) {
    first.setValue(val)
    first.next()
    --n
  }
  return first
}

/**
 * @description: Generate values for range with function
 * assigns the value returned by successive call to gen to the elements in the range [first, last)
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @param {function} gen
 * @return {*}
 */
export function generate<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, gen: () => T) {
  while (first !== last) {
    first.setValue(gen())
    first.next()
  }
}

/**
 * @description: Generate values for range with function
 * assigns the value returned by successive call to gen to the first n elements of the sequence by pointed first.
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @param {function} gen
 * @return {*}
 */
export function generate_n<T>(first: OutputIterator<T>, n: number, gen: () => T) {
  while (n > 0) {
    first.setValue(gen())
    first.next()
    --n
  }
}

/**
 * @description: remove value from range
 * transforms the range [first, last) into a range with all the elements that compare equal to val removed,
 * and returns an iterator to the new end of that range.
 * the function uses operator === to compare the individual elements to val.
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @param {T} val
 * @return {*}
 */
export function remove<T>(
  first: ForwardIterator<T>,
  last: ForwardIterator<T>,
  val: T
): ForwardIterator<T> {
  const result: ForwardIterator<T> = first
  while (first !== last) {
    if (first.getValue() !== val) {
      if (result !== first) {
        result.setValue(itr_move(first))
      }
      result.next()
    }
    first.next()
  }
  return result
}

/**
 * @description: remove value from range
 * transforms the range [first, last) into a range with all the elements for which fn returns true,
 * and returns an iterator to the new end of that range.
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @param {T} val
 * @return {*}
 */
export function remove_if<T>(
  first: ForwardIterator<T>,
  last: ForwardIterator<T>,
  fn: (v: T) => boolean
): ForwardIterator<T> {
  const result: ForwardIterator<T> = first
  while (first !== last) {
    if (!fn(first.getValue())) {
      if (result !== first) {
        result.setValue(itr_move(first))
      }
      result.next()
    }
    first.next()
  }
  return result
}

/**
 * @description: copy range removing value
 * copies the elements in the range [first, last) to the range beginning at result, except those elements that compare equal to val.
 * the resulting range is short than [first, last) by as many elements as matches in the sequence, which are "removed".
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {OutputIterator} result
 * @param {T} val
 * @return {*}
 */
export function remove_copy<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  result: OutputIterator<T>,
  val: T
): OutputIterator<T> {
  while (first !== last) {
    if (first.getValue() === val) {
      result.setValue(first.getValue())
      result.next()
    }
    first.next()
  }
  return result
}

/**
 * @description: copy range removing value
 * copies the elements in the range [first, last) to the range beginning at result, except those elements for which fn returns true.
 * the resulting range is short than [first, last) by as many elements as matches in the sequence, which are "removed".
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {OutputIterator} result
 * @param {T} val
 * @return {*}
 */
export function remove_copy_if<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  result: OutputIterator<T>,
  fn: (v: T) => boolean
): OutputIterator<T> {
  while (first !== last) {
    if (!fn(first.getValue())) {
      result.setValue(first.getValue())
      result.next()
    }
    first.next()
  }
  return result
}
/**
 * @description: remove consecutive duplicates in range
 * removes all but the first element from every consecutive group of equivalent elements in the range [first,last).
 * the function cannot alter the properties of the object containing the range of elements (i.e., it cannot alter the size of an array or a container).
 * the relative order of the elements not removed is preserved, while the elements between
 * the returned iterator and last are left in a valid but unspecified state.
 * the function uses operator === to compare the pairs of elements
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @return {*}
 */
export function unique<T>(first: ForwardIterator<T>, last: ForwardIterator<T>): ForwardIterator<T> {
  if (first === last) return last
  const result: ForwardIterator<T> = first
  while (first.next() && first !== last) {
    if (result.getValue() !== first.getValue()) {
      result.next()
      result.setValue(first.getValue())
    }
  }
  result.next()
  return result
}

/**
 * @description: remove consecutive duplicates in range
 * copies the elements in the range [first,last) to the range beginning at result,
 * except consecutive duplicates (elements that compare equal to the element preceding).
 * only the first element from every consecutive group of equivalent elements in the range [first,last) is copied.
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @return {*}
 */
export function unique_coy<T>(
  first: ForwardIterator<T>,
  last: ForwardIterator<T>,
  result: OutputIterator<T>
): OutputIterator<T> {
  if (first === last) return last
  result.setValue(first.getValue())
  while (first.next() && first !== last) {
    if ((result as unknown as InputIterator<T>).getValue() !== first.getValue()) {
      result.next()
      result.setValue(first.getValue())
    }
  }
  result.next()
  return result
}

/**
 * @description: reverse range
 * reverse the order of the elements in the range [first, last).
 * the function call itr_swap to swap the elements to thir new locations.
 * @param {BidirectionalIterator} first
 * @param {BidirectionalIterator} last
 * @return {*}
 */
export function reverse<T>(first: BidirectionalIterator<T>, last: BidirectionalIterator<T>) {
  while (first !== last && first !== last.prev()) {
    itr_swap(first, last)
    first.next()
  }
}

/**
 * @description: copy range reverse
 * copies the elements in the range [first,last) to the range beginning at result, but in reverse order.
 * @param {BidirectionalIterator} first
 * @param {BidirectionalIterator} last
 * @param {OutputIterator} result
 * @return {*}
 */
export function reverse_copy<T>(
  first: BidirectionalIterator<T>,
  last: BidirectionalIterator<T>,
  result: OutputIterator<T>
): OutputIterator<T> {
  while (first !== last) {
    last.prev()
    result.setValue(last.getValue())
    result.next()
  }
  return result
}

/**
 * @description: rotate left the elements in range
 * rotates the order of the elements in the range [first,last), in such a way that the element pointed by middle becomes the new first element.
 * @param {ForwardIterator} first
 * @param {ForwardIterator} middle
 * @param {ForwardIterator} last
 * @return {*}
 */
export function rotate<T>(
  first: ForwardIterator<T>,
  middle: ForwardIterator<T>,
  last: ForwardIterator<T>
): void {
  let next: ForwardIterator<T> = middle
  while (first !== next) {
    first.next()
    next.next()
    itr_swap(
      first as unknown as BidirectionalIterator<T>,
      next as unknown as BidirectionalIterator<T>
    )
    if (next === last) next = middle
    else if (first === middle) middle = next
  }
}

/**
 * @description:
 * copy range rotated left
 * copies the elements in the range [first,last) to the range beginning at result,
 * but rotating the order of the elements in such a way that the element pointed by middle becomes the first element in the resulting range.
 * @param {ForwardIterator} first
 * @param {ForwardIterator} middle
 * @param {ForwardIterator} last
 * @return {*}
 */
export function rotate_copy<T>(
  first: ForwardIterator<T>,
  middle: ForwardIterator<T>,
  last: ForwardIterator<T>,
  result: OutputIterator<T>
): OutputIterator<T> {
  copy(middle, last, result)
  return copy(first, middle, result)
}

/**
 * @description: randomly rearrange elements in range
 * rearranges the elements in the range [first,last) randomly.
 * the function swaps the value of each element with that of some other randomly picked element.
 * when provided, the function gen determines which element is picked in every case. Otherwise, the function uses some unspecified source of randomness.
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {function} gen
 * @return {*}
 */
export function random_shuffle<T>(
  first: RandomAccessIterator<T>,
  last: RandomAccessIterator<T>,
  gen: () => T
) {
  const n = random_itr_distance(first, last)
  // for(let i = n-1; i > 0; --i) {
  // }
}

/**
 * @description: randomly rearrange elements in range using generator
 * rearranges the elements in the range [first,last) randomly, using g as uniform random number generator.
 * the function swaps the value of each element with that of some other randomly picked element. The function determines the element picked by calling gen().
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {function} gen
 * @return {*}
 */
export function shuffle<T>(
  first: RandomAccessIterator<T>,
  last: RandomAccessIterator<T>,
  gen: () => T
) {}
