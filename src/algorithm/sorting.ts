/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:25:04
 * @LastEditTime: 2022-03-26 18:54:35
 * @LastEditors: hzheyuan
 * @Description: Sorting
 * todo
 * @FilePath: /tstl/src/algorithm/sorting.ts
 */
import {
    InputIterator,
    OutputIterator,
    BidirectionalIterator,
    RandomAccessIterator,
    ForwardIterator,
    distance,
    advance,
    itr_move,
    itr_swap
  } from '../iterator'
import { CompFunType, less } from '../functor/'
import { lg } from '../utils/'
import { copy_backward } from './modifying_sequence_op'
import { makeHeap, popHeap, sortHeap } from '../algorithm/heap';
const THRESHOLD = 16

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
        itr_swap(_first, _last);
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


export function stable_sort() {}
export function nth_element() {}
