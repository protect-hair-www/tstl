/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:25:37
 * @LastEditTime: 2022-03-21 15:13:41
 * @LastEditors: hzheyuan
 * @Description: binary seach (operating on partitioned/stoted ranges)
 * @FilePath: \tstl\src\algorithm\binary_search.ts
 */
import { distance, ForwardIterator, advance } from '../Iterator/index'

/**
 * @description: return iterator to lower bound
 * return an iterator pointing to the first element in the range [first, last) which does not compare less than val
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @param {T} val
 * @return {*}
 */
export function lower_bound<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, val: T): ForwardIterator<T>  {
    let it: ForwardIterator<T>, n = distance(first, last), step = 0;
    while(n > 0) {
        it = first, step = n / 2;
        advance(it, step)
        if(it.getValue() < val) {
            it.next(); first = it;
            n -= step + 1;
        } else {
            n = step;
        }
    }
    return first;
}

/**
 * @description: return iterator to lower bound
 * return an iterator pointing to the first element in the range [first, last) which does not compare greater than val
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @param {T} val
 * @return {*}
 */
export function upper_bound<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, val: T): ForwardIterator<T>  {
    let it: ForwardIterator<T>, n = distance(first, last), step = 0;
    while(n > 0) {
        it = first, step = n / 2;
        advance(it, step);
        if(!(val < it.getValue())) {it.next(); first = it; n -= step + 1;}
        else n = step;
    }
    return first;
}

/**
 * @description: get subrange of equal ranges
 * returns the bounds of the subrange that includes all the elements of the range [first,last) with values equivalent to val.
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @param {T} val
 * @return {*}
 */
export function equal_range<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, val: T): [ForwardIterator<T>, ForwardIterator<T>]  {
    let lower = lower_bound(first, last, val)
    let upper = upper_bound(first, last, val)
    return [lower, upper]
}


/**
 * @description: test if value in sorted sequence
 * returns true if any element in the range [first,last) is equivalent to val, and false otherwise.
 * @param {ForwardIterator} first
 * @param {ForwardIterator} last
 * @param {T} val
 * @return {*}
 */
export function binaray_search<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, val: T): boolean  {
    let lower = lower_bound(first, last, val);
    return lower === last && (val < first.getValue());
}
