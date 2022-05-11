/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:25:45
 * @LastEditTime: 2022-05-11 15:31:04
 * @LastEditors: kalai
 * @Description: merge
 * Operations on sorted ranges
 * @FilePath: \tstl\src\algorithm\merge.ts
 */
import { CompFunType, less } from '../functor/'
import { lower_bound, upper_bound } from './binary_search';
import { rotate, copy } from './modifying_sequence'
import { distance, InputIterator, OutputIterator, BidirectionalIterator, iter_swap, advance } from './../iterator';

/**
 * @description merge auxilibary function
 * @param {BidirectionalIterator} first Bidirectional iterator to the initial position in the first sorted sequence to merge. 
 * @param {BidirectionalIterator} middle Bidirectional iterator to the initial position of the second sorted sequence.
 * @param {BidirectionalIterator} last Bidirectional iterator to the past-the-end position of the second sorted sequence.
 * @param {number} len1
 * @param {number} len2
 * @param {CompFunType} comp Binary function that accepts two arguments of the types pointed by the input iterators, and returns a value convertible to bool. 
 * @return {*}
 */
function _merge_aux<T>(first: BidirectionalIterator<T>, middle: BidirectionalIterator<T>, last: BidirectionalIterator<T>, len1: number, len2: number, comp: CompFunType = less) {
    let _first = first.copy(), _middle = middle.copy(), _last = last.copy();
    if (len1 === 0 || len2 === 0) return
    if (len1 + len2 === 2) {
        if (comp(_middle.value, _first.value)) iter_swap(_first, _middle)
        return
    }
    let _first_cut = _first.copy(), _second_cut = _middle.copy()
    let len11 = 0, len22 = 0
    if (len1 > len2) {
        len11 = len1 >> 1;
        advance(_first_cut, len11)
        _second_cut = lower_bound(_middle, _last, _first_cut.value, comp) as BidirectionalIterator<T>;
        len22 = distance(_middle, _second_cut)
    } else {
        len22 = len2 >> 1
        advance(_second_cut, len22)
        _first_cut = upper_bound(_first, _middle, _second_cut.value, comp) as BidirectionalIterator<T>
        len11 = distance(_first, _first_cut)
    }

    let _new_middle: BidirectionalIterator<T> = rotate(_first_cut, _middle, _second_cut) as BidirectionalIterator<T>;
    _merge_aux(_first, _first_cut, _new_middle, len11, len22, comp)
    _merge_aux(_new_middle, _second_cut, _last, len1 - len11, len2 - len22, comp)
}

/**
 * @description inplace auxilibary function
 * @param {BidirectionalIterator} first Bidirectional iterator to the initial position in the first sorted sequence to merge. 
 * @param {BidirectionalIterator} middle Bidirectional iterator to the initial position of the second sorted sequence.
 * @param {BidirectionalIterator} last Bidirectional iterator to the past-the-end position of the second sorted sequence.
 * @return {*}
 */
export function _inplace_merge_aux<T>(first: BidirectionalIterator<T>, middle: BidirectionalIterator<T>, last: BidirectionalIterator<T>) {
    let _first = first.copy(), _middle = middle.copy(), _last = last.copy()
    let len1 = distance(_first, _middle)
    let len2 = distance(_middle, _last)
    _merge_aux(_first, _middle, _last, len1, len2)
}

/**
 * @description Merge consecutive sorted ranges
 * Merges two consecutive sorted ranges: [first,middle) and [middle,last), putting the result into the combined sorted range [first,last).
 * @param {BidirectionalIterator} first Bidirectional iterator to the initial position in the first sorted sequence to merge. 
 * @param {BidirectionalIterator} middle Bidirectional iterator to the initial position of the second sorted sequence.
 * @param {BidirectionalIterator} last Bidirectional iterator to the past-the-end position of the second sorted sequence.
 * @param {Function} fn Binary function that accepts two arguments of the types pointed by the iterators, and returns a value convertible to bool.
 * @return {void}
 */
export function inplace_merge<T>(first: BidirectionalIterator<T>, middle: BidirectionalIterator<T>, last: BidirectionalIterator<T>) {
    let _first = first.copy(), _middle = middle.copy(), _last = last.copy()
    if (_first.equals(_middle) || _middle.equals(_last)) return
    _inplace_merge_aux(_first, _middle, _last)
}

/**
 * @description merge sorted ranges
 * Combines the elements in the sorted ranges [first1,last1) and [first2,last2), into a new range beginning at result with all its elements sorted.
 * @param {InputIterator} first1 Input iterator to the final position of the first sorted sequence. 
 * @param {InputIterator} last1 Input iterator to the initial position of the first sorted sequence. 
 * @param {InputIterator} first2 Input iterator to the initial position of the second sorted sequence.
 * @param {InputIterator} last2  Input iterator to the final position of the second sorted sequence. 
 * @param {InputIterator} result Output iterator to the initial position of the range where the resulting combined range is stored.
 * @param {Function} fn Binary function that accepts two arguments of the types pointed by the iterators, and returns a value convertible to bool.
 * @return {OutputIterator} An iterator pointing to the past-the-end element in the resulting sequence.
 */
export function merge<T>(
    first1: InputIterator<T>,
    last1: InputIterator<T>, 
    first2: InputIterator<T>, 
    last2: InputIterator<T>,
    result: OutputIterator<T>,
    comp: CompFunType = less
): OutputIterator<T> {
    let _first1 = first1.copy(), _last1 = last1.copy(), _first2 = first2.copy(), _last2 = last2.copy()
    while (!_first1.equals(last1) && !_first2.equals(_last2)) {
        if (comp(_first2.value, _first1.value)) {
            result.value = _first2.value
            _first2.next()
        } else {
            result.value = _first1.value
            _first1.next()
        }
        result.next()
    }
    return copy(_first2, _last2, copy(_first1, _last1, result))
}

/**
 * @description Union of two sorted ranges
 * Constructs a sorted range beginning in the location pointed by result with the set union of the two sorted ranges [first1,last1) and [first2,last2).
 * The union of two sets is formed by the elements that are present in either one of the sets, or in both. 
 * Elements from the second range that have an equivalent element in the first range are not copied to the resulting range.
 * @param {InputIterator} first1 Input iterator to the final position of the first sorted sequence. 
 * @param {InputIterator} last1 Input iterator to the initial position of the first sorted sequence. 
 * @param {InputIterator} first2 Input iterator to the initial position of the second sorted sequence.
 * @param {InputIterator} last2  Input iterator to the final position of the second sorted sequence. 
 * @param {InputIterator} result Output iterator to the initial position of the range where the resulting combined range is stored.
 * @param {Function} fn Binary function that accepts two arguments of the types pointed by the iterators, and returns a value convertible to bool.
 * @return {OutputIterator} An iterator to the end of the constructed range.
 */
export function set_union<T>(
    first1: InputIterator<T>,
    last1: InputIterator<T>, 
    first2: InputIterator<T>, 
    last2: InputIterator<T>,
    result: OutputIterator<T>,
    comp: CompFunType = less
) { 
    let _first1 = first1.copy(), _last1 = last1.copy(), _first2 = first2.copy(), _last2 = last2.copy()
    while(!_first1.equals(_last1) && !_first2.equals(_last2)) {
        if(comp(_first1.value, _first2.value)) {
            result.value = _first1.value
            _first1.next()
        } else if(comp(_first2.value, _first1.value)) {
            result.value = _first2.value
            _first2.next()
        } else {
            result.value = _first1.value
            _first1.next()
            _first2.next()
        }
        result.next()
    }
    return copy(_first2, _last2, copy(_first1, _last1, result))
}

/**
 * @description Intersection of two sorted ranges
 * Constructs a sorted range beginning in the location pointed by result with the set intersection of the two sorted ranges [first1,last1) and [first2,last2).
 * The intersection of two sets is formed only by the elements that are present in both sets. 
 * The elements copied by the function come always from the first range, in the same order.
 * @param {InputIterator} first1 Input iterator to the final position of the first sorted sequence. 
 * @param {InputIterator} last1 Input iterator to the initial position of the first sorted sequence. 
 * @param {InputIterator} first2 Input iterator to the initial position of the second sorted sequence.
 * @param {InputIterator} last2  Input iterator to the final position of the second sorted sequence. 
 * @param {InputIterator} result Output iterator to the initial position of the range where the resulting combined range is stored.
 * @param {Function} fn Binary function that accepts two arguments of the types pointed by the iterators, and returns a value convertible to bool.
 * @return {OutputIterator} An iterator to the end of the constructed range.
 */
export function set_intersection<T>(
    first1: InputIterator<T>,
    last1: InputIterator<T>, 
    first2: InputIterator<T>, 
    last2: InputIterator<T>,
    result: OutputIterator<T>,
    comp: CompFunType = less
) {
    let _first1 = first1.copy(), _last1 = last1.copy(), _first2 = first2.copy(), _last2 = last2.copy()
    while(!_first1.equals(_last1) && !_first2.equals(_last2)) {
        if(comp(_first1.value, _first2.value)) {
            _first1.next()
        } else if(comp(_first2.value, _first1.value)) {
            _first2.next()
        } else {
            result.value = _first1.value
            _first1.next()
            _first2.next()
            result.next()
        }
    }
    return result
}

/**
 * @description Difference of two sorted ranges
 * Constructs a sorted range beginning in the location pointed by result with the set difference of the sorted range [first1,last1) with respect to the sorted range [first2,last2).
 * The difference of two sets is formed by the elements that are present in the first set, but not in the second one. 
 * The elements copied by the function come always from the first range, in the same order.
 * @param {InputIterator} first1 Input iterator to the final position of the first sorted sequence. 
 * @param {InputIterator} last1 Input iterator to the initial position of the first sorted sequence. 
 * @param {InputIterator} first2 Input iterator to the initial position of the second sorted sequence.
 * @param {InputIterator} last2  Input iterator to the final position of the second sorted sequence. 
 * @param {InputIterator} result Output iterator to the initial position of the range where the resulting combined range is stored.
 * @param {Function} fn Binary function that accepts two arguments of the types pointed by the iterators, and returns a value convertible to bool.
 * @return {OutputIterator} An iterator to the end of the constructed range.
 */
export function set_difference<T>(
    first1: InputIterator<T>,
    last1: InputIterator<T>, 
    first2: InputIterator<T>, 
    last2: InputIterator<T>,
    result: OutputIterator<T>,
    comp: CompFunType = less
) {
    let _first1 = first1.copy(), _last1 = last1.copy(), _first2 = first2.copy(), _last2 = last2.copy()
    while(!_first1.equals(_last1) && !_first2.equals(_last2)) {
        if(comp(_first1.value, _first2.value)) {
            result.value = _first1.value
            _first1.next()
            result.next()
        } else if(comp(_first2.value, _first1.value)) {
            _first2.next()
        } else {
            _first1.next()
            _first2.next()
        }
    }
    return copy(_first1, _last1, result)
}

/**
 * @description Symmetric difference of two sorted ranges
 * Constructs a sorted range beginning in the location pointed by result with the set symmetric difference of the two sorted ranges [first1,last1) and [first2,last2).
 * The symmetric difference of two sets is formed by the elements that are present in one of the sets, 
 * but not in the other. Among the equivalent elements in each range, those discarded are those that appear before in the existent order before the call. 
 * The existing order is also preserved for the copied elements.
 * @param {InputIterator} first1 Input iterator to the final position of the first sorted sequence. 
 * @param {InputIterator} last1 Input iterator to the initial position of the first sorted sequence. 
 * @param {InputIterator} first2 Input iterator to the initial position of the second sorted sequence.
 * @param {InputIterator} last2  Input iterator to the final position of the second sorted sequence. 
 * @param {InputIterator} result Output iterator to the initial position of the range where the resulting combined range is stored.
 * @param {Function} fn Binary function that accepts two arguments of the types pointed by the iterators, and returns a value convertible to bool.
 * @return {OutputIterator} An iterator to the end of the constructed range.
 */
export function set_symmetric_diffrence<T>(
    first1: InputIterator<T>,
    last1: InputIterator<T>, 
    first2: InputIterator<T>, 
    last2: InputIterator<T>,
    result: OutputIterator<T>,
    comp: CompFunType = less
) { 
    let _first1 = first1.copy(), _last1 = last1.copy(), _first2 = first2.copy(), _last2 = last2.copy()
    while(!_first1.equals(_last1) && !_first2.equals(_last2)) {
        if(comp(_first1.value, _first2.value)) {
            result.value = _first1.value
            _first1.next()
            result.next()
        } else if(comp(_first2.value, _first1.value)) {
            result.value = _first2.value
            _first2.next()
            result.next()
        } else {
            _first1.next()
            _first2.next()
        }
    }
    return copy(_first2, _last2, copy(_first1, _last1, result))
}

/**
 * @description Test whether sorted range includes another sorted range
 * Returns true if the sorted range [first1,last1) contains all the elements in the sorted range [first2,last2).
 * @param {InputIterator} first1 Input iterator to the initial position of the first sorted sequence (which is tested on whether it contains the second sequence). 
 * @param {InputIterator} last1 Input iterator to the final position of the first sorted sequence (which is tested on whether it contains the second sequence). 
 * @param {InputIterator} first2 Input iterator to the initial position of the second sorted sequence (which is tested on whether it is contained in the first sequence). 
 * @param {InputIterator} last2 Input iterator to the final position of the second sorted sequence (which is tested on whether it is contained in the first sequence). 
 * @param {CompFunType} comp Binary function that accepts two elements as arguments (one from each of the two sequences, in the same order), and returns a value convertible to bool.
 * @return {Boolean} true if every element in the range [first2,last2) is contained in the range [first1,last1), false otherwise.
 */
export function includes<T>(first1: InputIterator<T>, last1: InputIterator<T>, first2: InputIterator<T>, last2: InputIterator<T>, comp: CompFunType = less) {
    let _first1 = first1.copy(), _last1 = last1.copy(), _first2 = first2.copy(), _last2 = last2.copy()
    while(!_first1.equals(_last1) && !_first2.equals(_last2)) {
        if(comp(_first2.value, _first1.value)) return false
        else if(!comp(_first1.value, _first2.value)) _first2.next()
        _first1.next();
    }
    return _first2.equals(_last2)
}