/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:24:58
 * @LastEditTime: 2022-05-12 10:44:09
 * @LastEditors: kalai
 * @Description: Partition(doing)
 * Partitioning operations
 * @FilePath: \tstl\src\algorithm\paritions.ts
 */
import { rotate, copy_backward } from './modifying_sequence'
import { find_if_not, none_of } from './none_modifying_sequence'
import { InputIterator, BidirectionalIterator, ForwardIterator, OutputIterator, iter_swap, advance, distance } from '../iterator/';

/**
 * @description test whether range is partitoned
 * return true if all the elements in the range [first, last) for which fn returns true
 * precede those which it returns false.
 * if the range is empty, the function returns true
 * @param {InputIterator} first Input iterator to the initial position of the sequence. The range used is [first,last).
 * @param {InputIterator} last Input iterator to the final position of the sequence. The range used is [first,last)
 * @param {function} fn Unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @return {Boolean} true if all the elements in the range [first,last) for which fn returns true precede those for which it returns false.
 */
export function is_partitioned<T>(first: InputIterator<T>, last: InputIterator<T>, fn: (v: T) => boolean): boolean {
    let _first = first.copy(), _last = last.copy();
    _first = find_if_not(_first, _last, fn);
    if(_first.equals(_last)) return true;
    _first.next()
    return none_of(_first, _last, fn);
}

/**
 * @description partition range in two
 * rearranges the elements from the range [first, last), in such a way that all the elements for which fn returns
 * true precede all those for which it returns false. the iterator returned points to the first element of the second group.
 * the relative ordering whihin each group is not necessarily the same as before the call.
 * see stable_partition for a function with a similar but with stable ordering within each group.
 * @param {BidirectionalIterator} first Forward iterator to the initial position of the sequence to partition. 
 * @param {BidirectionalIterator} last Forward iterator to the final position of the sequence to partition. 
 * @param {function} fn Unary function that accepts an element in the range as argument, and returns a value convertible to bool. 
 * @return {BidirectionalIterator} An iterator that points to the first element of the second group of elements (those for which fn returns false), or last if this group is empty.
 */
// export function partition<T>(first: BidirectionalIterator<T>, last: BidirectionalIterator<T>, fn: (v: T) => boolean): BidirectionalIterator<T> {
//     let _first = first.copy(), _last = last.copy();
//     while (!_first.equals(_last)) {
//         while (fn(_first.getValue())) {
//             _first.next();
//             if (_first.equals(_last)) return _first;
//         }
//         do {
//             _last.prev();
//             if (_first.equals(_last)) return _first;
//         } while (!fn(_last.getValue()));
//         iter_swap(_first, _last)
//     }
//     return _first;
// }
export function partition<T>(first: BidirectionalIterator<T>, last: BidirectionalIterator<T>, fn: (v: T) => boolean): BidirectionalIterator<T> {
    let _first = first.copy(), _last = last.copy();
    while(true) {
        while(true) {
            if(_first.equals(_last)) return _first
            else if(fn(_first.value)) _first.next()
            else break;
        }
        _last.prev();
        while(true) {
            if(_first.equals(_last)) return _first
            else if(!fn(_last.value)) _last.prev()
            else break;
        }
        iter_swap(_first, _last);
        _first.next();
    }
}


/**
 * @description Partition range in two - stable ordering
 * Rearranges the elements in the range [first,last), in such a way that all the elements for which fn returns true
 * @param {BidirectionalIterator} first Bidirectional iterator to the initial position of the sequence to partition. 
 * @param {BidirectionalIterator} last Bidirectional iterator to the initial position of the sequence to partition. 
 * @param {function} fn Unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @return {BidirectionalIterator} An iterator that points to the first element of the second group of elements (those for which fn returns false), or last if this group is empty.
 */
export function stable_partition<T>(first: BidirectionalIterator<T>, last: BidirectionalIterator<T>, fn: (v: T) => boolean) {
    let _first = first.copy(), _last = last.copy();
    let dis = distance(_first, _last)
    return _inplace_stable_partition(_first, _last, fn, dis)
}

export function _inplace_stable_partition<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, fn: (v: T)=>boolean, len: number): ForwardIterator<T> {
    let _first = first.copy(), _last = last.copy();
    if(len === 1) return fn(_first.getValue()) ? _last : _first;
    let _middle = _first.copy();
    advance(_middle, len >> 1);
    let _left = _inplace_stable_partition(_first, _middle, fn, len >> 1);
    let _right = _inplace_stable_partition(_middle, _last, fn, len - (len >> 1));
    return rotate(_left, _middle, _right);
}

// export function _stable_parition_adaptive<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, fn: (v: T)=>boolean, len: number, inplace: boolean = false) {
//     let _first = first.copy(), _last = last.copy();
//     if(!inplace) {
//         let _result = _first.copy();
//     } else {

//     }
// }

/**
 * @description partition range in two
 * copies the elements in the range [first, last) for which fn returns true into the range pointed by result_true,
 * and those for which it does not into the range pointed by result_false
 * @param {InputIterator} first Input iterators to the initial position of the range to be copy-partitioned. 
 * @param {InputIterator} last Bidirectional iterators to final position of the sequence to partition. 
 * @param {OutputIterator} result_true Output iterator to the initial position of the range where the elements for which fn returns true are stored.
 * @param {OutputIterator} result_false Output iterator to the initial position of the range where the elements for which fn returns false are stored.
 * @param {function} fn Unary function that accepts an element pointed by InputIterator as argument, and returns a value convertible to bool.
 * @return {Tuple} A tuple of iterators with the end of the generated sequences pointed by result_true and result_false, respectivelly.
 */
export function partition_copy<T>(first: InputIterator<T>, last: InputIterator<T>, result_true: OutputIterator<T>, result_false: OutputIterator<T>, fn: (v: T) => boolean) { 
    let _first = first.copy(), _last = last.copy();
    while(!_first.equals(_last)) {
        if(fn(_first.getValue())) {
            result_true.setValue(_first.getValue())
            result_true.next()
        } else {
            result_false.setValue(_first.getValue())
            result_false.next()
        }
        _first.next()
    }
    return [result_true, result_false];
}


/**
 * @description: get partition point
 * return an iterator to the first element in the partitioned range [first, last) for which fn returns false, indicating its partition point.
 * the elements in the range shall already be patitioned, as if parition had been called with same arguments.
 * the function optimizes the number of comparisions performed by comparing non-consecutive elements of the sorted range, 
 * which is specially efficient for random-access iterators.
 * @param {ForwardIterator} first Forward iterator to the initial position of the partitioned sequence.
 * @param {ForwardIterator} last Forward iterator to the final position of the partitioned sequence.
 * @param {function} fn Unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @return {*} n iterator to the first element in the partitioned range [first,last) for which fn is not true, or last if it is not true for any element.
 */
export function partition_point<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, fn: (v: T) => boolean): ForwardIterator<T> {
    let _first = first.copy(), _last = last.copy()
    let len = distance(_first, _last);
    while(len > 0) {
        let _half = len >> 1
        let _middle = _first.copy()
        advance(_middle, _half)
        if(fn(_middle.getValue())) {
            _first = _middle.copy()
            _first.next()
            len = len - _half - 1
        } else {
            len = _half
        }
    }
    return _first;
}
