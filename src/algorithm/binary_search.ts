/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:25:37
 * @LastEditTime: 2022-05-10 18:24:53
 * @LastEditors: kalai
 * @Description: binary seach (operating on partitioned/stoted ranges)
 * @FilePath: \tstl\src\algorithm\binary_search.ts
 */
import { distance, ForwardIterator, advance } from '../Iterator/index'
import { CompFunType, less } from '../functor/'

/**
 * @description return iterator to lower bound
 * return an iterator pointing to the first element in the range [first, last) which does not compare less than val
 * @param {ForwardIterator} first Forward iterator to the initial position of a sorted (or properly partitioned) sequence. 
 * @param {ForwardIterator} last Forward iterator to the final position of a sorted (or properly partitioned) sequence. 
 * @param {T} val Value of the lower bound to search for in the range.
 * @param {Function} comp A Binary function that accepts two arguments (the first of the type pointed by ForwardIterator, and the second, always val), and returns a value convertible to bool.
 * @return {ForwardIterator} An iterator to the lower bound of val in the range.
 */
export function lower_bound<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, val: T, comp: CompFunType = less): ForwardIterator<T>  {
    let _first = first.copy(), _last = last.copy();
    let _middle, _half = 0;
    let len = distance(_first, _last);
    while(len > 0) {
        _half = len >> 1;
        _middle = _first.copy();
        advance(_middle, _half)
        if(comp(_middle.value, val)) {
            _first = _middle;
            _first.next(); 
            len = len - _half + 1;
        } else {
            len = _half;
        }
    }
    return _first;
}

/**
 * @description return iterator to lower bound
 * return an iterator pointing to the first element in the range [first, last) which does not compare greater than val
 * @param {ForwardIterator} first Forward iterator to the initial position of a sorted (or properly partitioned) sequence. 
 * @param {ForwardIterator} last Forward iterator to the final position of a sorted (or properly partitioned) sequence. 
 * @param {T} val Value of the upper bound to search for in the range.
 * @param {Function} comp A Binary function that accepts two arguments (the first of the type pointed by ForwardIterator, and the second, always val), and returns a value convertible to bool.
 * @return {ForwardIterator} An iterator to the lower bound of val in the range.
 */
export function upper_bound<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, val: T, comp: CompFunType = less): ForwardIterator<T>  {
    let _first = first.copy(), _last = last.copy();
    let len = distance(_first, _last);

    let _middle, _half = 0;

    while(len > 0) {
        _half = len >> 1;
        _middle = _first.copy();
        advance(_middle, _half)
        if(comp(val, _middle.value)) {
            len = _half;
        } else {
            _first = _middle;
            _first.next(); 
            len = len - _half - 1;
        }
    }
    return _first;
}

/**
 * @description get subrange of equal ranges
 * returns the bounds of the subrange that includes all the elements of the range [first,last) with values equivalent to val.
 * @param {ForwardIterator} first Forward iterator to the initial position of a sorted (or properly partitioned) sequence. 
 * @param {ForwardIterator} last Forward iterator to the final position of a sorted (or properly partitioned) sequence. 
 * @param {T} val Value of the subrange to search for in the range.
 * @param {Function} comp A Binary function that accepts two arguments (the first of the type pointed by ForwardIterator, and the second, always val), and returns a value convertible to bool.
 * @return {Tuple} A tuple, whose member pair::first is an iterator to the lower bound of the subrange of equivalent values, and pair::second its upper bound.
 */
export function equal_range<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, val: T, comp: CompFunType = less): [ForwardIterator<T>, ForwardIterator<T>]  {
    let lower = lower_bound(first, last, val, comp)
    let upper = upper_bound(first, last, val, comp)
    return [lower, upper]
}

/**
 * @description test if value in sorted sequence
 * returns true if any element in the range [first,last) is equivalent to val, and false otherwise.
 * @param {ForwardIterator} first Forward iterator to the initial position of a sorted (or properly partitioned) sequence. 
 * @param {ForwardIterator} last Forward iterator to the final position of a sorted (or properly partitioned) sequence. 
 * @param {T} val Value to search for in the range.
 * @param {Function} comp A Binary function that accepts two arguments (the first of the type pointed by ForwardIterator, and the second, always val), and returns a value convertible to bool.
 * @return {boolean} true if an element equivalent to val is found, and false otherwise.
 */
export function binaray_search<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, val: T): boolean  {
    let _first = first.copy(), _last = last.copy();
    let _lower = lower_bound(_first, _last, val);
    return _lower.cur !== last.cur && !(val < _lower.getValue());
}
