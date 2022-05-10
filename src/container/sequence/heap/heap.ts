/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:57:28
 * @LastEditTime: 2022-05-10 14:27:51
 * @LastEditors: kalai
 * @Description: Heap
 *
 * Heap is a algothim.
 *
 * A heap is a way to organize the elements of range that allows for fast retrieval of element
 * with highest value at any monent(with pop_heap), even repeatedly for fast insertion of new element(with push_heap).
 *
 * The element with highest value is always pointed by fisrt. The order of the other elements depends on the particular
 * implementation.
 *
 * The elements are compared use operator "<" (for the fisrt version), or comp(for the second): the element with
 * the highest value is an element for which this would return false when compared to every other element in the range.
 *
 * The standard container adapter priority_queue call make_heap, push_heap and pop_heap automatically to maintain
 * heap properties for a container.
 *
 * @FilePath: /tstl/src/container/sequence/heap/heap.ts
 */
import { advance, distance, RandomAccessIterator, random_itr_distance } from '../../../iterator'
import { CompFunType, less } from '../../../functor'

/**
 * @description heap heapify
 * @param {RandomAccessIterator} first
 * @param {number} holeIndex
 * @param {number} len
 * @param {function} comp
 * @return {*}
 */
function heapify<T>(
  first: RandomAccessIterator<T>,
  holeIndex: number,
  len: number,
  v: T,
  comp: CompFunType = less
) {
  // console.log('heapify', first.getKey(), holeIndex, len);
  const topIndex = holeIndex
  let rightChild = (holeIndex << 1) + 2

  while (rightChild < len) {
    const l = first.increment(rightChild - 1, false),
      r = first.increment(rightChild, false)
    if (comp(r.getValue(), l.getValue())) rightChild--
    const largerValue = first.increment(rightChild, false).getValue()
    first.increment(holeIndex, false).setValue(largerValue)
    holeIndex = rightChild
    rightChild = (rightChild + 1) << 1
  }
  if (rightChild === len) {
    const rv = first.increment(rightChild - 1, false).getValue()
    first.increment(holeIndex, false).setValue(rv)
    holeIndex = rightChild - 1
  }
  _push_heap(first, holeIndex, topIndex, v, comp)
}

/**
 * @description Push element into heap range
 * Given a heap in the range [first,last-1),
 * this function extends the range considered a heap to [first,last)
 * by placing the value in (last-1) into its corresponding location within it.
 *
 * A range can be organized into a heap by calling make_heap.
 * After that, its heap properties are preserved if elements are added and removed from it using push_heap and pop_heap, respectively.
 * @param {RandomAccessIterator} first
 * @param {number} holeIndex
 * @param {number} topIndex
 * @param {T} v
 * @param {CompFunType} comp
 * @return {*}
 */
export function push_heap<T>(
  first: RandomAccessIterator<T>,
  last: RandomAccessIterator<T>,
  comp: CompFunType = less
) {
  // console.log(first.getKey(), last.getKey(), random_itr_distance(first, last) - 1, last.getValue())
  const value = last.decrement(1, false).getValue(),
    dis = distance(first, last)
  _push_heap(first, dis - 1, 0, value, comp)
}

/**
 * @description heap push_heap iteranlly implementation
 * @param {RandomAccessIterator} first
 * @param {number} holeIndex
 * @param {number} topIndex
 * @param {T} v
 * @param {CompFunType} comp
 * @return {*}
 */
function _push_heap<T>(
  first: RandomAccessIterator<T>,
  holeIndex: number,
  topIndex: number,
  v: T,
  comp: CompFunType = less
) {
  let parent = (holeIndex - 1) >> 1
  while (holeIndex > topIndex && comp(first.increment(parent, false).getValue(), v)) {
    const pv = first.increment(parent, false).getValue()
    first.increment(holeIndex, false).setValue(pv)
    holeIndex = parent
    parent = (holeIndex - 1) >> 1
  }
  first.increment(holeIndex, false).setValue(v)
}

/**
 * @description rearrenges the elements in heap range [first, last) in such a way that the past
 * considered a heap is shortended by one: The element with highest value is moved to (last - 1)
 *
 * While the element with highest value is moved from first to (last - 1) (which now is out of heap),
 * the other elements are reorganized in such a way that the range [first, last) preserves the properties of a heap.
 *
 * A range can be organized into a heap calling makeHeap. after that, its heap properties are perserved if elements are
 * added and removed from its using pushHeap and popHeap, respectively.
 *
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {CompFunType} comp
 * @return {*}
 */
export function pop_heap<T>(
  first: RandomAccessIterator<T>,
  last: RandomAccessIterator<T>,
  comp: CompFunType = less
): T {
  const _first = first.copy(), _last = last.copy(), _result = _last.copy();
  return _pop_heap_aux(_first, _last, _result, comp)
}

/**
 * @description pop_heap iteranlly implementation
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {CompFunType} comp
 * @return {*}
 */
export function _pop_heap<T>(
  first: RandomAccessIterator<T>,
  last: RandomAccessIterator<T>,
  result: RandomAccessIterator<T>,
  comp: CompFunType = less
): T {
  const _first = first.copy(),  _last = last.copy(), _result = result.copy()

  // _last.prev()
  // const res = _first.getValue()
  const dis = distance(_first, _last);
  const value = _result.getValue()
  
  _result.setValue(_first.getValue())
  // _last.setValue(res)
  heapify(first, 0, dis, value, comp)
  return result.value
}

function _pop_heap_aux<T>(
  first: RandomAccessIterator<T>,
  last: RandomAccessIterator<T>,
  result: RandomAccessIterator<T>,
  comp: CompFunType = less
) {
  last.prev();
  result.prev();
  return _pop_heap(first, last, result, comp)
}

/**
 * @description make_heap
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {function} comp
 * @return {*}
 */
export function make_heap<T>(
  first: RandomAccessIterator<T>,
  last: RandomAccessIterator<T>,
  comp: CompFunType = less
) {
  const _first = first.copy(), _last = last.copy();
  const len = distance(_first, _last)
  if (len < 2) return
  const parent = (len - 2) >> 1
  // test
  // let v = first.increment(parent, false).getValue();
  // heapify(first, parent, len, v, comp)
  // v = first.increment(1, false).getValue();
  // heapify(first, 1, len, v, comp)

  for (let i = parent; i >= 0; i--) {
    const v = _first.increment(i, false).getValue()
    heapify(_first, i, len, v, comp)
  }
}

/**
 * @description: Sort elements of heap
 *
 * Sorts the elements in the heap range [first,last) into ascending order.
 * The elements are compared using operator< for the first version, and comp for the second,
 * which shall be the same as used to construct the heap.
 *
 * The range loses its properties as a heap.
 * @param {RandomAccessIterator} first
 * @param {RandomAccessIterator} last
 * @param {CompFunType} comp
 * @return {*}
 */
export function sort_heap<T>(
  first: RandomAccessIterator<T>,
  last: RandomAccessIterator<T>,
  comp: CompFunType = less
) {
  while (distance(first, last) > 1) {
    pop_heap(first, last, comp)
    last.prev()
  }
}

/**
 * @description test if range is heap
 * Return true if the range [first, last) froms heap, as if constructed with make_heap
 * The elements are compared using operator < for the first version, and comp for the second
 * @param {*}
 * @return {*}
 */
export function is_heap<T>(
  first: RandomAccessIterator<T>,
  last: RandomAccessIterator<T>,
  comp: CompFunType = less
) {
  let parent = 0,
    child = 1,
    dis = distance(first, last)

  for (; child < dis; ++child) {
    if(comp(first.at(parent), first.at(child))) return false;
    if((child & 1) === 0) ++parent; 
  }

  return true;
}

function _is_heap_until<T>(first: RandomAccessIterator<T>, n: number, comp: CompFunType = less) {
  let _first = first.copy();
  let parent = 0;
  for(let child = 1; child < n; ++child) {
    if(comp(advance(_first.copy(), parent).value, advance(_first.copy(), child).value)) {
      return child;
    }
    if((child & 1) === 0) ++parent
  }
  return n
}

/**
 * @description Find first element not in heap order
 * @param {RandomAccessIterator} first Random-access iterators to the initial positions in a sequence. The range checked is [first,last)
 * @param {RandomAccessIterator} last Random-access iterators to the final positions in a sequence. The range checked is [first,last)
 * @param {CompFunType} comp Binary function that accepts two elements in the range as arguments, and returns a value convertible to bool.
 * @return {RandomAccessIterator} An iterator to the first element in the range which is not in a valid position for the range to be a heap, 
 * or last if all elements are validly positioned or if the range contains less than two elements.
 */
export function is_heap_until<T>(first: RandomAccessIterator<T>, last: RandomAccessIterator<T>, comp: CompFunType = less) {
  let _first = first.copy(), _last = last.copy(), dis = distance(_first, _last);
  let n = _is_heap_until(_first, dis, comp)
  return advance(_first, n)
}
