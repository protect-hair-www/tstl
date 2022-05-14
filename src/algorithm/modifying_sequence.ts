/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:24:40
 * @LastEditTime: 2022-05-14 20:55:09
 * @LastEditors: kalai
 * @Description: Modifying sequence operations
 * @FilePath: /tstl/src/algorithm/modifying_sequence.ts
 */
import {
  InputIterator,
  OutputIterator,
  BidirectionalIterator,
  RandomAccessIterator,
  ForwardIterator,
  distance,
  advance,
  iter_swap,
  iter_move
} from '../iterator'
import { jsCopy } from '../utils/index'
import { adjacent_find } from './none_modifying_sequence';

/**
 * @description Copy range of elements
 * Copies the elements in the range [first, last) into the range beginning at result.
 * The function returns an iterator to the end of the destination range (which points to the element following the last element copied).
 * The range shall not overlap in such way that the result points to an element in the range [first, last). for such cases, use copy_backward.
 * @param {InputIterator} first Input iterator to the initial position in a sequence to be copied. The range used is [first,last).
 * @param {InputIterator} last Input iterator to the final position in a sequence to be copied. The range used is [first,last).
 * @param {OutputIterator} result Output iterator to the initial position in the destination sequence. This shall not point to any element in the range [first,last).
 * @param {Boolean} deep whether use deep copy (for object) 
 * @return {OutputIterator<T>}  An iterator to the end of the destination range where elements have been copied.
 */
export function copy<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  result: OutputIterator<T>,
  deep: boolean = false
): OutputIterator<T> {
  let _first = first.copy(), _last = last.copy();
  while (!_first.equals(_last)) {
    const copyed_val = deep ? jsCopy(_first.value) : _first.value;
    result.value = copyed_val
    result.next()
    _first.next()
  }
  return result
}

/**
 * @description Copy elements
 * Copies the first n elements from the range begining at first into the range begeinning at result.
 * The function return an iterator to the end of the destination range (which points to one pats at last elmenet copied).
 * If n is negative, the function does nothing.
 * If the range overlap, some of the elments in the range pointed by result may have undefined but valid values.
 * @param {InputIterator} first Input iterator to the initial in a sequence to be copied. The range used is [first,last).
 * @param {number} n Number of elements to copy. If this value is negative, the function does nothing.
 * @param {OutputIterator} result Output iterator to the initial position in the destination sequence of at least n elements.
 * @param {Boolean} deep whether use deep copy (for object) 
 * @return {OutputIterator<T>} An iterator to the end of the destination range where elements have been copied.
 */
export function copy_n<T>(
  first: InputIterator<T>,
  n: number,
  result: OutputIterator<T>,
  deep: boolean = false
): OutputIterator<T> {
  let _first = first.copy();
  while (n > 0 && _first.hasNext()) {
    const copyed_val = deep ? jsCopy(_first.value) : _first.value;
    result.value = copyed_val;
    result.next()
    _first.next()
    --n
  }
  return result
}

/**
 * @description Copy range of elements
 * Copies the elements in the range [first, last) for which fn returns true to the range beginning at result.
 * @param {InputIterator} first Input iterator to the initial position in a sequence to be copied. The range used is [first,last).
 * @param {InputIterator} last Input iterator to the final position in a sequence to be copied. The range used is [first,last).
 * @param {OutputIterator} result Output iterator to the initial position in the destination sequence. This shall not point to any element in the range [first,last).
 * @param {function} fn Unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @param {Boolean} deep whether use deep copy (for object) 
 * @return {OutputIterator} An iterator pointing to the element that follows the last element written in the result sequence.
 */
export function copy_if<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  result: OutputIterator<T>,
  fn: (v: T) => boolean,
  deep: boolean = false
): OutputIterator<T> {
  let _first = first.copy(), _last = last.copy();
  while (!_first.equals(_last)) {
    const val = _first.value
    if (fn(val)) {
      const copyed_val = deep ? jsCopy(_first.value) : _first.value;
      result.value = copyed_val
      result.next()
    }
    _first.next()
  }
  return result
}

/**
 * @description copy range of elements backward
 * copies the elements in the range [first, last) starting from the end into range terminating as result.
 * the function returns an iterator to the first element in the destination range.
 * the resulting range has the elements in the exact same order as [first, last). to reverse their order see reverse_copy.
 * the function begins by copying (last-1) into (result-1), and then follows backward by the elements preceding these, until first is reached (and including it).
 * @param {InputIterator} first BidirectionalIterator iterator to the initial position in a sequence to be copied. The range used is [first,last).
 * @param {InputIterator} last BidirectionalIterator iterator to the final position in a sequence to be copied. The range used is [first,last).
 * @param {OutputIterator} result Bidirectional iterator to the past-the-end position in the destination sequence.
 * @param {Boolean} deep whether use deep copy (for object) 
 * @return {BidirectionalIterator} An iterator to the first element of the destination sequence where elements have been copied.
 */
export function copy_backward<T>(
  first: BidirectionalIterator<T>,
  last: BidirectionalIterator<T>,
  result: BidirectionalIterator<T>,
  deep: boolean = false
): BidirectionalIterator<T> {
  let _first = first.copy()
  let _last = last.copy()
  while (!_last.equals(_first) && result.hasPrev()) {
    result.prev(); _last.prev();
    const copyed_val = deep ? jsCopy(_last.value) : _last.value;
    result.value = copyed_val
  }
  return result
}

/**
 * @description mave range of elements
 * moves the elements in the range [fisrs, last) into the range beginning at result.
 * the move of elements in the range [first, last) in transferred to the elements pointed by result.
 * after the call, the elements in range [first, last) are left in an unspcified but valid state(undefined).
 * the ranges shall not overlap in such a way that result pointers to an element in the range [first, last).
 * for such cases, see move_backward.
 * @param {InputIterator} first Input iterator to the initial position in a sequence to be copied. The range used is [first,last).
 * @param {InputIterator} last Input iterator to the final position in a sequence to be copied. The range used is [first,last).
 * @param {OutputIterator} result Output iterator to the initial position in the destination sequence. This shall not point to any element in the range [first,last).
 * @return {OutputIterator<T>}  An iterator to the end of the destination range where elements have been copied. 
 */
export function move<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  result: OutputIterator<T>
): OutputIterator<T> {
  let _first = first.copy(), _last = last.copy();
  while (!_first.equals(_last)) {
    result.setValue(iter_move(_last))
  }
  return result
}

export function swap<T>(x: T, y: T) {
  let temp = x
  x = y
  y = temp
}

/**
 * @description Exchange values of two ranges
 * Exchanges the values of each of the elements in the range [first, last) with those of their respective elements in the range beginning at first2.
 * @param {ForwardIterator} first Forward iterators to the initial and final positions in one of the sequences to be swapped. The range used is [first, last), 
 * which contains all the elements between first and last, including the element pointed by first but not the element pointed by last.
 * @param {ForwardIterator} last Forward iterators to the initial and final positions in one of the sequences to be swapped. The range used is [first, last), 
 * which contains all the elements between first and last, including the element pointed by first but not the element pointed by last.
 * @param {ForwardIterator} first2 Forward iterator to the initial position in the other sequence to be swapped. 
 * The range used includes the same number of elements as the range [first,last). The two ranges shall not overlap.
 * @return {*} An iterator to the last element swapped in the second sequence.
 */
export function swap_range<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, first2: ForwardIterator<T>): ForwardIterator<T> {
  let _first = first.copy(), _last = last.copy(), _first2 = first2.copy();  
  for(; !_first.equals(_last) && _first2.hasNext(); _first.next(), _first2.next()) {
    iter_swap(_first, _first2);
  }
  return _first2;
}

/**
 * @description transform range
 * Applies an operation sequentially to the elements of one (1) or two(2) ranges and stores the result
 * In the range that begins at result.
 *  (1) Unary operation: applies op to each of the elments in range [first1, last1)
 *      and stores the value returned by each operation in the range that begins at result.
 *  (2) Binary operation: call binary_op using each of the elements in the range [first1, last1) at first
 *      arguments, and the respective argument in the range that begins at first2 as second argument. the value
 *      returned by each call is stored in the range that begins at result.
 * @param {InputIterator} first1 Input iterator to the initial position in a sequence to be copied. The range used is [first,last).
 * @param {InputIterator} last1 Input iterator to the final position in a sequence to be copied. The range used is [first,last).
 * @param {InputIterator} first2 Input iterator to the initial position of the second range. The range includes as many elements as [first1,last1)
 * @param {OutputIterator} result Output iterator to the initial position in the destination sequence. This shall not point to any element in the range [first,last).
 * @param {Function} fn Unary function or binary function that accepts element of the type pointed to by InputIterator as argument, and returns some result value convertible to the type pointed to by OutputIterator.
 * @return {OutputIterator<T>}  An iterator to the end of the destination range where elements have been copied. 
 */
export function transform<T>(first1: InputIterator<T>, last1: InputIterator<T>, result: OutputIterator<T>, fn:(v: T)=>T): OutputIterator<T>
export function transform<T>(first1: InputIterator<T>, last1: InputIterator<T>, first2: InputIterator<T>, result: OutputIterator<T>, fn:(x: T, y: T)=>T): OutputIterator<T>;
export function transform<T>(...args: any[]) {
  let argLen = args.length
  let _first1 = args[0].copy(), _last1 = args[1].copy()
  let _result, pred1, pred2, _first2;
  if(argLen === 4) {
    _result = args[2].copy()
    pred1 = args[3]
  } else {
    _first2 = args[2].copy()
    _result = args[3].copy()
    pred2 = args[4]
  }
  while (!_first1.equals(_last1)) {
    let val
    if(pred1) {
      val = pred1(_first1.value)
    } else {
      val = pred2(_first1.value, _first2.value)
      _first2.next()
    }
    _result.value = val
    _result.next()
    _first1.next()
  }
  return _result
}

/**
 * @description replace value in range
 * assign new_val to all the elements in the range [first, last) that compare equal to old_val
 * the functions use operator === to compare the individual elements to old_val.
 * @param {ForwardIterator} first Forward iterator to the initial position in a sequence of elements that support being assigned a value of type T
 * @param {ForwardIterator} last Forward iterator to the final position in a sequence of elements that support being assigned a value of type T
 * @param {OutputIterator} result Output iterator to the initial position in the destination sequence. This shall not point to any element in the range [first,last).
 * @param {T | Function} old_val Value to be replaced or a unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @param {T} new_val Replacement value
 * @return {T} An iterator pointing to the element that follows the last element written in the result sequence.
 */
export function replace<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, old_val: T, new_val: T): void 
export function replace<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, fn: (v: T)=>boolean, new_val: T): void 
export function replace<T>(...args: any[]): void {
  let _first = args[0].copy(), _last = args[1].copy()
  let pred = args[2], _new_val = args[3]

  while (!_first.equals(_last)) {
    if(typeof pred === 'function') {
      if(pred(_first.value)) _first.value = _new_val;
    } else {
      if (_first.value === pred) _first.value = _new_val
    }
    _first.next()
  }
}

/**
 * @description replace value in range
 * assign new_val to all the elements in the range [first, last) which fn returns true.
 * @param {ForwardIterator} first Forward iterator to the initial position in a sequence of elements that support being assigned a value of type T
 * @param {ForwardIterator} last Forward iterator to the final position in a sequence of elements that support being assigned a value of type T
 * @param {OutputIterator} result Output iterator to the initial position in the destination sequence. This shall not point to any element in the range [first,last).
 * @param {Function} old_val A unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @param {T} new_val Replacement value
 * @return {T} An iterator pointing to the element that follows the last element written in the result sequence.
 */
export function replace_if<T>(
  first: ForwardIterator<T>,
  last: ForwardIterator<T>,
  fn: (v: T) => boolean,
  new_val: T
): void {
  let _first = first.copy(), _last = last.copy()
  while (!_first.equals(_last)) {
    if (fn(_first.value)) _first.value = new_val
    _first.next()
  }
}

/**
 * @description copy range replacing value
 * copies the elements in the range [first, last) to the range beginning at result, replacing the apprarance of old_val by new_val.
 * the function use operator "===" to compare the individual elements to old_val.
 * the ranges shall not overlap in such a way result points to an elements in the range [first, last)
 * @param {ForwardIterator} first Forward iterator to the initial position in a sequence of elements that support being assigned a value of type T
 * @param {ForwardIterator} last Forward iterator to the final position in a sequence of elements that support being assigned a value of type T
 * @param {T | Function} old_val Value to be replaced or a unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @param {T} new_val Replacement value
 * @return {T} An iterator pointing to the element that follows the last element written in the result sequence.
 */
export function replace_copy<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, result: OutputIterator<T>, old_val: T, new_val: T, deep?: boolean): void 
export function replace_copy<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, result: OutputIterator<T>, fn: (v: T)=>boolean, new_val: T, deep?: boolean): void 
export function replace_copy<T>(...args: any[]): OutputIterator<T> {
  let _first = args[0].copy(), _last = args[1].copy()
  let _result = args[2], pred = args[3], _new_val = args[4]
  let _deep = args[5];
  while (!_first.equals(_last)) {
    let val, copyed_val;
    if(typeof pred === 'function') {
      val = pred(_first.value) ? _new_val : _first.value
      copyed_val = _deep ? jsCopy(val) : val;
    } else {
      val = pred === _first.value ? _new_val : _first.value
      copyed_val = _deep ? jsCopy(val) : val;
    }
    _result.setValue(copyed_val)
    _result.next()
    _first.next()
  }
  return _result
}

/**
 * @description copy range replacing value
 * copies the elements in the range [first, last) to the range beginning at result, replacing the apprarance of old_val by new_val.
 * the function use operator "===" to compare the individual elements to old_val.
 * the ranges shall not overlap in such a way result points to an elements in the range [first, last)
 * @param {ForwardIterator} first Forward iterator to the initial position in a sequence of elements that support being assigned a value of type T
 * @param {ForwardIterator} last Forward iterator to the final position in a sequence of elements that support being assigned a value of type T
 * @param {Function} old_val A unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @param {T} new_val Replacement value
 * @return {T} An iterator pointing to the element that follows the last element written in the result sequence. 
 */
export function replace_copy_if<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  result: OutputIterator<T>,
  fn: (v: T) => boolean,
  new_val: T
): OutputIterator<T> {
  let _first = first.copy(), _last = last.copy();
  while (!_first.equals(_last)) {
    const val = first.value
    result.setValue(fn(val) ? new_val : first.value)
    result.next()
    _first.next()
  }
  return result
}

/**
 * @description fill range with value
 * Assigns val to the elements in the range [first, last)
 * @param {InputIterator} first Input iterator to the initial position in a sequence to be copied. The range used is [first,last).
 * @param {InputIterator} last Input iterator to the final position in a sequence to be copied. The range used is [first,last).
 * @param {T} val Value to assign to the elements in the filled range.
 * @return {*} void
 */
export function fill<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, val: T) {
  let _first = first.copy(), _last = last.copy();
  while (!_first.equals(_last)) {
    _first.value = val
    _first.next()
  }
}

/**
 * @description fill range with value
 * Assigns val to the first n elements of the range pointed by first
 * @param {ForwardIterator} first Output iterators to the initial position in a sequence of at least n elements that support being assigned a value of type T.
 * @param {number} n Number of elements to fill.
 * @param {T} val Value to be used to fill the range.
 * @return {OutputIterator} An iterator pointing to the element that follows the last element filled.
 */
export function fill_n<T>(first: ForwardIterator<T>, n: number, val: T) {
  let _first = first.copy();
  while (n > 0 && _first.hasNext()) {
    _first.setValue(val)
    _first.next()
    --n
  }
  return _first
}

/**
 * @description Generate values for range with function
 * assigns the value returned by successive call to gen to the elements in the range [first, last)
 * @param {ForwardIterator} first Forward iterator to the initial position in a sequence. The range affected is [first,last).
 * @param {ForwardIterator} last Forward iterator to the final position in a sequence. The range affected is [first,last)
 * @param {function} gen Generator function that is called with no arguments and returns some value of a type convertible to those pointed by the iterators.
 * @return {*} void
 */
export function generate<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, gen: (index: number) => T) {
  let _first = first.copy(), _last = last.copy();
  while (!_first.equals(_last)) {
    _first.setValue(gen(_first.cur))
    _first.next()
  }
}

/**
 * @description Generate values for range with function
 * assigns the value returned by successive call to gen to the first n elements of the sequence by pointed first.
 * @param {ForwardIterator} first Forward iterator to the initial position in a sequence. The range affected is [first,last).
 * @param {Number} n Number of values to generate, shall be (convertible to) an integral type.
 * @param {function} gen Generator function that is called with no arguments and returns some value of a type convertible to those pointed by the iterators.
 * @return {*} void
 */
export function generate_n<T>(first: OutputIterator<T>, n: number, gen: (idx: number) => T) {
  let _first = first.copy();
  while (n > 0) {
    _first.setValue(gen(_first.cur))
    _first.next()
    --n
  }
}

/**
 * @description remove value from range
 * Transforms the range [first, last) into a range with all the elements that compare equal to val removed,
 * and returns an iterator to the new end of that range.
 * The function uses operator === or a unary function to compare the individual elements to val.
 * @param {ForwardIterator} first Forward iterator to the initial position in a sequence of move-assignable elements supporting being compared to a value of type T.
 * @param {ForwardIterator} last Forward iterator to the final position in a sequence of move-assignable elements supporting being compared to a value of type T.
 * @param {T | Function} old_val Value to be replaced or a unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @return {ForwardIterator} An iterator to the element that follows the last element not removed.
 */
export function remove<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, val: T): ForwardIterator<T>
export function remove<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, fn: (v: T)=>boolean): ForwardIterator<T>
export function remove<T>(...args: any[]): ForwardIterator<T> {
  let _first = args[0].copy(), _last = args[1].copy();
  let _pred = args[2]
  const result: ForwardIterator<T> = _first.copy()
  while (!_first.equals(_last)) {
    let condition = typeof _pred === 'function' ? _pred(_first.value) : _first.value === _pred;
    if (condition) {
      if (!result.equals(_first)) {
        result.setValue(iter_move(_first))
      }
      result.next()
    }
    _first.next()
  }
  return result
}

/**
 * @description remove value from range
 * transforms the range [first, last) into a range with all the elements for which fn returns true,
 * and returns an iterator to the new end of that range.
 * @param {ForwardIterator} first Forward iterator to the initial position in a sequence of move-assignable elements supporting being compared to a value of type T.
 * @param {ForwardIterator} last Forward iterator to the final position in a sequence of move-assignable elements supporting being compared to a value of type T.
 * @param {Function} fn A unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @return {ForwardIterator} An iterator to the element that follows the last element not removed.
 */
export function remove_if<T>(
  first: ForwardIterator<T>,
  last: ForwardIterator<T>,
  fn: (v: T) => boolean
): ForwardIterator<T> {
  let _first = first.copy(), _last = last.copy();
  const result: ForwardIterator<T> = first
  while (!_first.equals(_last)) {
    if (!fn(_first.getValue())) {
      if (!result.equals(_first)) {
        result.setValue(iter_move(first))
      }
      result.next()
    }
    _first.next()
  }
  return result
}

/**
 * @description copy range removing value
 * copies the elements in the range [first, last) to the range beginning at result, except those elements that compare equal to val.
 * the resulting range is short than [first, last) by as many elements as matches in the sequence, which are "removed".
 * @param {InputIterator} first Forward iterator to the initial position in a sequence of move-assignable elements supporting being compared to a value of type T.
 * @param {InputIterator} last Forward iterator to the final position in a sequence of move-assignable elements supporting being compared to a value of type T.
 * @param {OutputIterator} result Output iterator to the initial position of the range where the resulting sequence is stored.
 * @param {T | Function} fn A unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @return {OutputIterator} An iterator pointing to the end of the copied range, which includes all the elements in [first,last) except those that compare equal to val.
 */
export function remove_copy<T>( first: ForwardIterator<T>, last: ForwardIterator<T>, result: OutputIterator<T>, val: T): ForwardIterator<T>
export function remove_copy<T>( first: ForwardIterator<T>, last: ForwardIterator<T>, result: OutputIterator<T>, fn: (v: T)=>boolean): ForwardIterator<T>
export function remove_copy<T>(...args: any[]): OutputIterator<T> {
  let _first = args[0].copy(), _last = args[1].copy()
  let result = args[2], pred = args[3]
  while (!_first.equals(_last)) {
    let condition = typeof pred === 'function' ? pred(_first.value) : pred === _first.value
    if (condition) {
      result.setValue(_first.value)
      result.next()
    }
    _first.next()
  }
  return result
}

/**
 * @description copy range removing value
 * copies the elements in the range [first, last) to the range beginning at result, except those elements for which fn returns true.
 * the resulting range is short than [first, last) by as many elements as matches in the sequence, which are "removed".
 * @param {InputIterator} first Forward iterator to the initial position in a sequence of move-assignable elements supporting being compared to a value of type T.
 * @param {InputIterator} last Forward iterator to the final position in a sequence of move-assignable elements supporting being compared to a value of type T.
 * @param {OutputIterator} result Output iterator to the initial position of the range where the resulting sequence is stored.
 * @param {Function} fn A unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @return {OutputIterator} An iterator pointing to the end of the copied range, which includes all the elements in [first,last) except those that compare equal to val.
 */
export function remove_copy_if<T>(
  first: InputIterator<T>,
  last: InputIterator<T>,
  result: OutputIterator<T>,
  fn: (v: T) => boolean
): OutputIterator<T> {
  let _first = first.copy(), _last = last.copy();
  while (!_first.equals(_last)) {
    if (!fn(_first.value)) {
      result.setValue(_first.value)
      result.next()
    }
    _first.next()
  }
  return result
}

/**
 * @description remove consecutive duplicates in range
 * removes all but the first element from every consecutive group of equivalent elements in the range [first,last).
 * Fhe function cannot alter the properties of the object containing the range of elements (i.e., it cannot alter the size of an array or a container).
 * The relative order of the elements not removed is preserved, while the elements between.
 * The returned iterator and last are left in a valid but unspecified state.
 * The function uses operator === to compare the pairs of elements.
 * @param {ForwardIterator} first Forward iterator to the initial position of the sequence of move-assignable elements. 
 * @param {ForwardIterator} last Forward iterator to the final position of the sequence of move-assignable elements. 
 * @param {Function} [fn] Value to be replaced or a unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @return {ForwardIterator} An iterator to the element that follows the last element not removed.
 */
export function unique<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, fn?: (x: T, y: T)=>boolean): ForwardIterator<T> {
  let _first = first.copy(), _last = last.copy()
  let _ad_first = adjacent_find(_first, _last, fn)
  return unique_copy(_ad_first, _last, _ad_first)
}

/**
 * @description remove consecutive duplicates in range
 * copies the elements in the range [first,last) to the range beginning at result,
 * except consecutive duplicates (elements that compare equal to the element preceding).
 * only the first element from every consecutive group of equivalent elements in the range [first,last) is copied.
 * @param {ForwardIterator} first Forward iterator to the initial position of the sequence of move-assignable elements. 
 * @param {ForwardIterator} last Forward iterator to the final position of the sequence of move-assignable elements. 
 * @param {OutputIterator} result Output iterator to the initial position of the range where the resulting sequence is stored.
 * @param {Function} [fn] Value to be replaced or a unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @return {ForwardIterator} An iterator to the element that follows the last element not removed.
 */
export function unique_copy<T>(
  first: ForwardIterator<T>,
  last: ForwardIterator<T>,
  result: OutputIterator<T>,
  fn?: (x: T, y: T) => boolean
): OutputIterator<T> {
  let _first = first.copy(), _last = last.copy()
  let _value = _first.getValue()
  result.setValue(_value)
  _first.next();

  while(!_first.equals(_last)) {
    const condition = fn ? !fn(_value, _first.getValue()) : result.getValue() !== _first.getValue();
    if(condition) {
      _value = _first.getValue();
      result.next();
      result.setValue(_value);
    }
    _first.next()
  }
  result.next();
  return result;
}

/**
 * @description reverse range
 * reverse the order of the elements in the range [first, last).
 * the function call itr_swap to swap the elements to thir new locations.
 * @param {BidirectionalIterator} first Bidirectional iterators to the initial positions of the sequence to be reversed.
 * @param {BidirectionalIterator} last Bidirectional iterators to final positions of the sequence to be reversed.
 * @return {*} void
 */
export function reverse<T>(first: BidirectionalIterator<T>, last: BidirectionalIterator<T>) {
  let _first = first.copy(), _last = last.copy()
  while (!_first.equals(_last)) {
    _last.prev();
    if(_first.equals(_last)) break;
    iter_swap(_first, _last)
    _first.next()
  }
}

/**
 * @description copy range reverse
 * copies the elements in the range [first,last) to the range beginning at result, but in reverse order.
 * @param {BidirectionalIterator} first Bidirectional iterator to the initial position of the sequence to be copied. 
 * @param {BidirectionalIterator} last Bidirectional iterator to the final position of the sequence to be copied. 
 * @param {OutputIterator} result Output iterator to the initial position of the range where the reversed range is stored.
 * @return {OutputIterator} An output iterator pointing to the end of the copied range, which contains the same elements in reverse order.
 */
export function reverse_copy<T>(
  first: BidirectionalIterator<T>,
  last: BidirectionalIterator<T>,
  result: OutputIterator<T>
): OutputIterator<T> {
  let _first = first.copy(), _last = last.copy()
  while (!_first.equals(_last)) {
    _last.prev()
    result.setValue(_last.value)
    result.next()
  }
  return result
}

/**
 * @description rotate left the elements in range
 * rotates the order of the elements in the range [first,last), in such a way that the element pointed by middle becomes the new first element.
 * @param {ForwardIterator} first Forward iterator to the initial position of the sequence to be rotated left. 
 * @param {ForwardIterator} middle Forward iterator pointing to the element within the range [first,last) that is moved to the first position in the range.
 * @param {ForwardIterator} last Forward iterator to the final position of the sequence to be rotated left. 
 * @return {ForwardIterator} An iterator pointing to the element that now contains the value previously pointed by first.
 */
export function rotate<T>(
  first: ForwardIterator<T>,
  middle: ForwardIterator<T>,
  last: ForwardIterator<T>
): ForwardIterator<T> {
  let _first = first.copy(), _middle = middle.copy(), _last = last.copy()
  if(_first.equals(_middle)) return _last;
  else if(_last.equals(_middle)) return _first;

  let _first2 = _middle.copy()
  do {
    iter_swap(_first, _first2);
    _first.next(); _first2.next();
    if(_first.equals(_middle)) _middle = _first2.copy();
  } while (!_first2.equals(_last));

  let _ret = _first.copy()
  _first2 = _middle.copy();

  while (!_first2.equals(_last)) {
    iter_swap(_first, _first2);
    _first.next(); _first2.next();
    if(_first.equals(_middle)) _middle = _first2.copy()
    else if(_first2.equals(_last)) _first2 = _middle.copy()
  }

  return _ret
}

/**
 * @description
 * copy range rotated left
 * copies the elements in the range [first,last) to the range beginning at result,
 * but rotating the order of the elements in such a way that the element pointed by middle becomes the first element in the resulting range.
 * @param {ForwardIterator} first Forward iterator to the initial positionsof the range to be copy-rotated. 
 * @param {ForwardIterator} middle Forward iterato pointing to the element within the range [first,last) that is copied as the first element in the resulting range.
 * @param {ForwardIterator} last Forward iterator to the final position of the range to be copy-rotated. 
 * @return {OutputIterator} An output iterator pointing to the end of the copied range.
 */
export function rotate_copy<T>(
  first: ForwardIterator<T>,
  middle: ForwardIterator<T>,
  last: ForwardIterator<T>,
  result: OutputIterator<T>
): OutputIterator<T> {
  let _first = first.copy(), _last = last.copy()
  copy(middle, _last, result)
  return copy(_first, middle, result)
}

/**
 * @description randomly rearrange elements in range
 * rearranges the elements in the range [first,last) randomly.
 * the function swaps the value of each element with that of some other randomly picked element.
 * when provided, the function gen determines which element is picked in every case. Otherwise, the function uses some unspecified source of randomness.
 * @param {RandomAccessIterator} first Random-access iterator to the initial position of the sequence to be shuffled.
 * @param {RandomAccessIterator} last Random-access iterator to the final position of the sequence to be shuffled.
 * @param {function} gen Unary function taking one argument and returning a value, both convertible to/from the appropriate difference type used by the iterators. 
 * @return {*} void
 */
export function random_shuffle<T>(
  first: RandomAccessIterator<T>,
  last: RandomAccessIterator<T>,
  gen?: (n: number) => number 
) {
  let _first = first.copy(), _last = last.copy();
  if(_first.equals(_last)) return;
  _first.next();
  for(; !_first.equals(_last); _first.next()) {
    let len = distance(first, _first);
    let idx = Math.floor(Math.random() * len);
    let iter = _first.increment(idx, false);
    iter_swap(_first, iter)

  }
}

/**
 * @description randomly rearrange elements in range using generator
 * rearranges the elements in the range [first,last) randomly, using g as uniform random number generator.
 * the function swaps the value of each element with that of some other randomly picked element. The function determines the element picked by calling gen().
 * @param {RandomAccessIterator} first Random-access iterator to the initial positions of the sequence to be shuffled.
 * @param {RandomAccessIterator} last Random-access iterator to the final position of the sequence to be shuffled.
 * @param {function} gen A uniform random number generator, used as the source of randomness.
 * @return {*} void
 */
export function shuffle<T>(
  first: RandomAccessIterator<T>,
  last: RandomAccessIterator<T>,
  gen?: () => T
) {
  let _first = first.copy(), _last = last.copy();
  if(_first.equals(_last)) return;
  _first.next();
  for(; !_first.equals(_last); _first.next()) {
    let len = distance(first, _first);
    let idx = Math.floor(Math.random() * len);
    let iter = _first.increment(idx, false);
    iter_swap(_first, iter)
  }
}
