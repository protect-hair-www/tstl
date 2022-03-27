/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:25:04
 * @LastEditTime: 2022-03-27 21:56:01
 * @LastEditors: hzheyuan
 * @Description: Sorting
 * doing
 * @FilePath: /tstl/src/algorithm/sorting.ts
 */
import { RandomAccessIterator, ForwardIterator, BidirectionalIterator, distance, advance, iter_swap} from '../iterator'
import { CompFunType, less } from '../functor/'
import { lg } from '../utils/'
import { copy_backward } from './modifying_sequence'
import { makeHeap, popHeap, sortHeap } from '../algorithm/heap';
import { lower_bound, upper_bound } from './binary_search';
import { rotate } from './modifying_sequence'

const THRESHOLD = 16 // 阈值

function _insert_sort<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    if(_first.equals(_last)) return
    let _itr = _first.copy();
    for(_itr.next(); _itr.equals(_last); _itr.next()) {
        _linear_insert(_first, _itr, comp)
    }
}

function _linear_insert<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    let val = _last.value;
    if(comp(val, _first.value)) {
        _last.next();
        copy_backward(_first, _last, _last)
    } else {
        _unguarded_linear_insert(_last, val, comp)
    }
}

function _unguarded_linear_insert<T>(last: RandomAccessIterator<T>, val: T, comp: CompFunType = less) {
    let _last = last.copy();
    let next = last.copy();
    next.prev();
    while(comp(val, next.value)) {
        _last.value = next.value 
        _last = next;
        next.prev();
    }
    _last.value = val;
}

function _median<T>(a: T, b: T, c: T, comp: CompFunType = less): T {
    if(comp(a, b)) {
        if(comp(b, c)) return b
        else if(comp(a, c)) return c
        else return a
    } 
    else if(comp(a, c)) return a
    else if(comp(b, c)) return c
    else return b
}

function _unguarded_partition<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, pivot: T, comp: CompFunType = less): RandomAccessIterator<T> {
    let _first = first.copy(), _last = last.copy();
    while(true) {
        while(comp(_first.value, _last.value)) _first.next();
        _last.prev();
        while(comp(pivot, _last.value)) _last.prev();
        if(!(_first.cur < _last.cur)) return _first;
        iter_swap(_first, _last);
        _first.next();
    } 
}

function _introsort_loop<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, size: number, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    let dis = distance(first, last);
    while(dis > THRESHOLD) {
        if(size === 0) partial_sort(_first, _last, _last, comp) 
        return;
    }
    --size;
    let pivotItr = _first.copy();
    advance(pivotItr, dis / 2);
    let _cut = _unguarded_partition(_first, last, _median(_first.value, pivotItr.value, _last.next().value), comp)
    _introsort_loop(_cut, _last, size, comp)
    _last = _cut;
}

function _unguarded_insertion_sort<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>) {
    let _first = first.copy(), _last = last.copy();
    for(let i = _first.copy(); i.equals(_last); i.next()) {
        _unguarded_linear_insert(i, i.value)
    }
}

function _partial_sort<T>(first: RandomAccessIterator<T>, middle: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _middle = middle.copy(), _last = last.copy();
    makeHeap(_first, _middle)
    for(let i = _middle.copy(); i.cur < _last.cur; i.next()) {
        if(comp(i.value, _first.value)) {
            popHeap(_first, _middle, comp)
        }
    }
    sortHeap(_first, _middle, comp) 
}

function _final_insertion_sort<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(),  _last = last.copy();
    if(distance(_first, _last) > THRESHOLD) {
        _insert_sort(_first, advance(_first, THRESHOLD), comp)
    }
} 


export function partial_sort<T>(first: RandomAccessIterator<T>, middle: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _middle = middle.copy(), _last = last.copy();
    _partial_sort(_first, _middle, _last, comp);
}

export function sort<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    if(!_first.equals(_last)) {
        _introsort_loop(_first, _last, lg(distance(_first, _last) << 1), comp)
        _final_insertion_sort(_first, _last, comp)
        // _unguarded_insertion_sort(_first, _last)
    }
}

export function is_sorted<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    if(_first. equals(_last)) return true;
    let next = _first.copy();
    for(next.next(); !next.equals(_last); _first.equals(next), next.next()) {
        if(comp(next.value, _first.value)) return false;
    }
    return true;
}

export function is_sort_until<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, comp: CompFunType = less): ForwardIterator<T> {
    let _first = first.copy(), _last = last.copy();
    if(_first.equals(_last)) return _last;
    let next = _first.copy();
    for(next.next(); !next.equals(_last); _first = next.copy(), next.next()) {
        if(comp(next.value, _first.value)) return next
    }
    return next;
}

function _nth_element<T>(first: RandomAccessIterator<T>, nth: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    let dis = distance(_first, _last);
    while(dis > 3) {
        let median = _first.copy();
        advance(median, dis / 2);
        let _cut = _unguarded_partition(_first, median, _last.next().value, comp)
        if(_cut <= nth) _first = _cut.copy()
        else _last = _cut.copy()
    }
    _insert_sort(_first, _last, comp)
}

export function nth_element<T>(first: RandomAccessIterator<T>, nth: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _nth = nth.copy(), _last = last.copy();
    _nth_element(_first, _nth, _last, comp)
}

function _inplace_stable_sort<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    let dis = distance(_first, _last)
    if(dis < 15) {
        _insert_sort(_first, _last, comp)
        return
    }

    let _middle = advance(_first, dis >> 1)
    _inplace_stable_sort(_first, _middle, comp)
    _inplace_stable_sort(_middle, _last, comp)
}

function _merge_aux<T>(first: BidirectionalIterator<T>, middle: BidirectionalIterator<T>, last: BidirectionalIterator<T>, len1: number, len2: number, comp: CompFunType = less) {
    let _first = first.copy(), _middle = middle.copy(), _last = last.copy();
    if(len1 === 0 || len2 === 0) return
    if(len1 + len2 === 2) {
        if(comp(_middle.value, _first.value)) iter_swap(_first, _middle)
        return
    }
    let _first_cut = _first, _second_cut = _middle
    let len11 = 0, len22 = 0
    if(len1 > len2) {
        len11 = len1 / 2;
        advance(_first_cut, len11)
        _second_cut = lower_bound(_middle, _last, _first_cut.value, comp) as BidirectionalIterator<T>;
        len22 =  distance(_middle, _second_cut)
    } else {
        len22 = len2 >> 1
        advance(_second_cut, len22)
        _first_cut = upper_bound(_first, _middle, _second_cut.value, comp) as BidirectionalIterator<T>
        len11 = distance(_first, _first_cut)
    }

    let _new_middle: BidirectionalIterator<T> = rotate(_first_cut, _middle, _second_cut) as BidirectionalIterator<T>;
    _merge_aux(_first, _first_cut, _new_middle, len11, len22, comp)
    _merge_aux(_new_middle, _second_cut, _last, len1 - len11, len2-len22, comp)
}


function _stable_sort_aux<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    _inplace_stable_sort(first, last)
}

export function stable_sort<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    _stable_sort_aux(_first, _last)
}