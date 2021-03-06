/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:25:04
 * @LastEditTime: 2022-05-10 17:39:31
 * @LastEditors: kalai
 * @Description: Sorting(doing)
 * 整个排序的逻辑是：当数据量大的时候使用快拍，分段递归排序。一旦分段后的数据量小于某个阈值时，为了避免递归调用引起的额外开销，采用插入排序。
 * 同时如果递归层次过深，还会采用堆排序。
 * Sorting operations
 * @FilePath: \tstl\src\algorithm\sorting.ts
 */
import { RandomAccessIterator, ForwardIterator, BidirectionalIterator, distance, advance, iter_swap} from '../iterator'
import { CompFunType, less } from '../functor/'
import { rotate, copy_backward } from './modifying_sequence'
import { makeHeap, popHeap, sortHeap, _pop_heap } from '../algorithm/heap';
import { lower_bound, upper_bound } from './binary_search';
import { lg } from '../utils/'

// 阈值，最小分段的阈值。当分段区间的长度小于该值时，使用拆入排序进行排序
const THRESHOLD = 16

function _unguarded_linear_insert<T>(last: RandomAccessIterator<T>, val: T, comp: CompFunType = less) {
    let _last = last.copy();
    let next = last.copy();
    next.prev();
    while(comp(val, next.value)) {
        _last.value = next.value 
        _last = next.copy();
        next.prev();
    }
    _last.setValue(val);
}

/**
 * @description: helper function for linear insert sort
 * 
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {CompFunType} comp
 * @return {*}
 */
function _linear_insert<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    let val = _last.value;
    // 插入时，先和前面以排序列的第一个元素进行比较
    if(comp(val, _first.value)) {
        // 如果比第一个还小，则将以排序的数据整体向后移动一位，然后将该元素放于起始位置
        // 如果按照js的特性，对整体移动做不了什么优化，但这里还是保留这部分逻辑，后续看看有什么办法可以优化一下
        const next = _last.copy()
        next.next()
        copy_backward(_first, _last, next)
        _first.value = val
    } else {
        // 否则使用普通插入
        _unguarded_linear_insert(_last, val, comp)
    }
}

/**
 * @description interanlly insert sort auxiliary
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {CompFunType} comp
 * @return {*}
 */
export function _insert_sort<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    if(_first.equals(_last)) return

    let _itr = _first.copy();
    for(_itr.next(); !_itr.equals(_last); _itr.next()) {
        _linear_insert(_first, _itr, comp)
    }
}

/**
 * @description: midian helper function for merger sort
 * @param {T} a
 * @param {T} b
 * @param {T} c
 * @param {CompFunType} comp
 * @return {*}
 */
export function _median<T>(a: T, b: T, c: T, comp: CompFunType = less): T {
    if(comp(a, b)) {
        if(comp(b, c)) return b
        else if(comp(a, c)) return c
        else return a
    } 
    else if(comp(a, c)) return a
    else if(comp(b, c)) return c
    else return b
}

/**
 * @description quick sort get pivot
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {T} pivot
 * @param {CompFunType} comp
 * @return {*}
 */
export function _unguarded_partition<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, pivot: T, comp: CompFunType = less): RandomAccessIterator<T> {
    let _first = first.copy(), _last = last.copy();
    while(true) {
        while(comp(_first.value, pivot)) _first.next();
        _last.prev();

        while(comp(pivot, _last.value)) _last.prev();
        if(!(_first.cur < _last.cur)) return _first;
        iter_swap(_first, _last);
        _first.next();
    } 
}

export function _introsort_loop<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, depth_limit: number, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    // 判断分区大小，如果小于阈值，则直接退出
    while(distance(_first, _last) > THRESHOLD) {
        const dis = distance(_first, _last)
        // 如果递归深度大于 depth_limit，此时采用堆排序，避免递归过深
        if(depth_limit === 0) {
            partial_sort(_first, _last, _last, comp) 
            return
        }
        // 更新递归深度
        --depth_limit;
        // [_first, _last)的中间位置，作为pivot的值
        const midIter = _first.copy()
        advance(midIter, dis >> 1)
        // 取 first, mid, last的中间值作为pivot的值
        const end = _last.copy();
        end.prev();
        const pivot = _median(_first.value, midIter.value, end.value)
        // 计算pivot位置
        const _cut = _unguarded_partition(_first, _last, pivot, comp)
        // 递归处理右子序列
        _introsort_loop(_cut, _last, depth_limit, comp)
        // 下一次循环处理左子序列
        _last = _cut.copy();
    }
}

export function _unguarded_insertion_sort<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    for(let i = _first.copy(); !i.equals(_last); i.next()) {
        _unguarded_linear_insert(i, i.value, comp)
    }
}

/**
 * @description: heap sort
 * 当递归深度超过限制时，使用堆排序，避免递归上的开销
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} middle
 * @param {RandomAccessIterator} last
 * @param {CompFunType} comp
 * @return {*}
 */
export function _partial_sort<T>(first: RandomAccessIterator<T>, middle: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _middle = middle.copy(), _last = last.copy()
    _heap_select(_first, _middle, _last, comp)
    sortHeap(_first, _middle, comp) 
}


function _heap_select<T>(first: RandomAccessIterator<T>, middle: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _middle = middle.copy(), _last = last.copy()
    makeHeap(_first, _middle, comp)
    let i = _middle.copy();
    for(; i.getIndex() < _last.getIndex(); i.next()) {
        if(comp(i.value, _first.value)) {
           _pop_heap(_first, _middle, i, comp)
        }
    }
}

/**
 * @description: insertion sort internally helper function
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {CompFunType} comp
 * @return {*}
 */
export function _final_insertion_sort<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(),  _last = last.copy();
    if(distance(_first, _last) > THRESHOLD) {
        const _end = _first.copy();
        advance(_end, THRESHOLD);

        _insert_sort(_first, _end, comp)
        _unguarded_insertion_sort(_end, _last, comp)
    } else {
        _insert_sort(_first, _last, comp)
    }
} 

/**
 * @description Partially sort elements in range
 * Rearranges the elements in the range [first,last), 
 * in such a way that the elements before middle are the smallest elements in the entire range and are sorted in ascending order, 
 * while the remaining elements are left without any specific order.
 * @param {RandomAccessIterator} first Random-access iterator to the initial position of the sequence to be partially sorted.
 * @param {RandomAccessIterator} middle Random-access iterator pointing to the element within the range [first,last) that is used as the upper boundary of the elements that are fully sorted.
 * @param {RandomAccessIterator} last Random-access iterators to the final position of the sequence to be partially sorted.
 * @param {CompFunType} comp Binary function that accepts two elements in the range as arguments, and returns a value convertible to bool.
 * @return {Void} void
 */
export function partial_sort<T>(first: RandomAccessIterator<T>, middle: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _middle = middle.copy(), _last = last.copy();
    _partial_sort(_first, _middle, _last, comp);
}

/**
 * @description Sort elements in range
 * Sorts the elements in the range [first,last) into ascending order.
 * The elements are compared using operator< for the first version, and comp for the second.
 * @param {RandomAccessIterator} first Random-access iterator to the initial position of the sequence to be sorted. 
 * @param {RandomAccessIterator} last Random-access iterator to the final position of the sequence to be sorted. 
 * @param {CompFunType} comp Binary function that accepts two elements in the range as arguments, and returns a value convertible to bool.
 * @return {Void} void
 */
export function sort<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    if(!_first.equals(_last)) {
        let depth_limit = lg(distance(_first, _last) << 1) 
        _introsort_loop(_first, _last, depth_limit, comp)
        _final_insertion_sort(_first, _last, comp)
        // _unguarded_insertion_sort(_first, _last)
    }
}

/**
 * @description Check whether range is sorted
 * Returns true if the range [first,last) is sorted into ascending order.
 * @param {ForwardIterator} first Forward iterator to the initial positions of the sequence. 
 * @param {ForwardIterator} last Forward iterator to the final position of the sequence. 
 * @param {CompFunType} comp Binary function that accepts two elements in the range as arguments, and returns a value convertible to bool.
 * @return {Boolean} true if the range [first,last) is sorted into ascending order, false otherwise.
 */
export function is_sorted<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    if(_first. equals(_last)) return true;
    let next = _first.copy();
    for(next.next(); !next.equals(_last); _first.equals(next), next.next()) {
        if(comp(next.value, _first.value)) return false;
    }
    return true;
}

/**
 * @description Find first unsorted element in range
 * Returns an iterator to the first element in the range [first,last) which does not follow an ascending order.
 * The range between first and the iterator returned is sorted.
 * @param {ForwardIterator} first Forward iterator to the initial position in a sequence.
 * @param {ForwardIterator} last Forward iterator to the final position in a sequence. T
 * @param {CompFunType} comp Binary function that accepts two elements in the range as arguments, and returns a value convertible to bool.
 * @return {ForwardIterator} An iterator to the first element in the range which does not follow an ascending order, or last if all elements are sorted or if the range contains less than two elements.
 */
export function is_sort_until<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, comp: CompFunType = less): ForwardIterator<T> {
    let _first = first.copy(), _last = last.copy();
    if(_first.equals(_last)) return _last;
    let next = _first.copy();
    for(next.next(); !next.equals(_last); _first = next.copy(), next.next()) {
        if(comp(next.value, _first.value)) return next
    }
    return next;
}

/**
 * @description nth element internally implemetation
 * 从某个序列中找到第 n 小的元素 K，并将 K 移动到序列中第 n 的位置处。
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} nth
 * @param {RandomAccessIterator} last
 * @param {CompFunType} comp
 * @return {*}
 */
function _nth_element<T>(first: RandomAccessIterator<T>, nth: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _nth = nth.copy(), _last = last.copy();
    while(distance(_first, _last) > 3) {
        const dis = distance(_first, _last);
        const midIter = _first.copy()
        advance(midIter, dis >> 1)
        // 取 first, mid, last的中间值作为pivot的值
        const end = _last.copy();
        end.prev();
        const pivot = _median(_first.value, midIter.value, end.value)
        const _cut = _unguarded_partition(_first, _last, pivot, comp);

        if(_cut.getIndex() <= _nth.getIndex()) _first = _cut
        else _last = _cut
    }
    _insert_sort(_first, _last, comp)
}

/**
 * @description Sort element in range
 * Rearranges the elements in the range [first,last), in such a way that the element at the nth position is the element that would be in that position in a sorted sequence.
 * The other elements are left without any specific order, except that none of the elements preceding nth are greater than it, and none of the elements following it are less.
 * @param {RandomAccessIterator} first Random-access iterator to the initial position of the sequence to be used.
 * @param {RandomAccessIterator} nth Random-access iterator pointing to the location within the range [first,last) that will contain the sorted element.
 * @param {RandomAccessIterator} last Random-access iterator to the final position of the sequence to be used.
 * @param {CompFunType} comp Binary function that accepts two elements in the range as arguments, and returns a value convertible to bool.
 * @return {Void} void
 */
export function nth_element<T>(first: RandomAccessIterator<T>, nth: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _nth = nth.copy(), _last = last.copy();
    if(_first.getIndex() === _last.getIndex() || nth.getIndex() === _last.getIndex()) return;
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


/**
 * @description stable sort auxiliary function
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {CompFunType} comp
 * @return {*}
 */
function _stable_sort_aux<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    _inplace_stable_sort(first, last)
}

/**
 * @description Sort elements preserving order of equivalents
 * Sorts the elements in the range [first,last) into ascending order, like sort, but stable_sort preserves the relative order of the elements with equivalent values.
 * @param {RandomAccessIterator} first Random-access iterator to the initial position of the sequence to be sorted. 
 * @param {RandomAccessIterator} last Random-access iterator to the final position of the sequence to be sorted. 
 * @param {CompFunType} comp Binary function that accepts two elements in the range as arguments, and returns a value convertible to bool.
 * @return {Void} void
 */
export function stable_sort<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
    let _first = first.copy(), _last = last.copy();
    _stable_sort_aux(_first, _last)
}