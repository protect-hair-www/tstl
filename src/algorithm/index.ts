/*
 * @Author: hzheyuan
 * @Date: 2022-03-12 10:58:55
 * @LastEditTime: 2022-03-28 22:22:33
 * @LastEditors: hzheyuan
 * @Description: Algorithms
 *
 * Algorithms defines a collection of functions especially designed to be used on ranges of elements.
 * A range is any sequence of objects that can be accessed through iterators or pointers,
 * such as an array or an instance of some containers. Notice though, that algorithms operate
 * through iterators directly on the values, not affecting in any way the structure of any possible
 * container (it never affects the size or storage allocation of the container).
 *
 * @FilePath: /tstl/src/algorithm/index.ts
 */
import { 
  makeHeap, 
  popHeap,
  pushHeap,
  sortHeap,
  isHeap,
  isHeapUntil
} from './heap'

import {
  all_of,
  any,
  every,
  any_of,
  none_of,

  for_each,

  find,
  find_if,
  find_if_not,
  find_end,
  find_first_of,

  adjacent_find,
  count,
  count_if,
  mismatch,
  equal,
  is_premutation,
  search,
  search_n
} from './none_modifying_sequence'

import {
  copy,
  copy_if,
  copy_n, 
  copy_backward, 
  move, 
  swap, 
  swap_range,
  transform,
  replace,
  replace_copy,
  replace_copy_if,
  fill,
  fill_n,
  generate,
  generate_n,
  remove,
  reverse_copy,
  remove_copy_if,
  unique,
  unique_copy,
  reverse,
  remove_copy,
  rotate,
  rotate_copy,
  random_shuffle,
  shuffle
} from './modifying_sequence'

import {
  is_partitioned,
  partition,
  partition_copy,
  partition_point,
  stable_partition
}  from './paritions';

import {
  lower_bound, 
  upper_bound,
  equal_range,
  binaray_search
} from './binary_search'

import {
  min,
  max,
  min_element,
  max_element,
  minmax_element
} from './min_max'

import {
  sort,
  stable_sort,
  partial_sort,
  is_sorted,
  is_sort_until,
  nth_element
} from './sorting'

import {
  merge,
  replace_merge,
  includes,
  set_union,
  set_difference,
  set_intersection,
  set_symmetric_diffrence
} from './merge'

export {
  // heap
  makeHeap,
  popHeap,
  pushHeap,
  sortHeap,
  isHeap,
  isHeapUntil,

  // none modifying sequence operations
  find,
  find_if,
  find_if_not,
  find_end,
  find_first_of,
  all_of,
  any,
  every,
  any_of,
  none_of,
  for_each,
  adjacent_find,
  count,
  count_if,
  mismatch,
  equal,
  is_premutation,
  search,
  search_n,

  // modifying sequences operations
  copy,
  copy_if,
  copy_n, 
  copy_backward, 
  move, 
  swap, 
  swap_range,
  transform,
  replace,
  replace_copy,
  replace_copy_if,
  fill,
  fill_n,
  generate,
  generate_n,
  remove,
  reverse_copy,
  remove_copy_if,
  unique,
  unique_copy,
  reverse,
  remove_copy,
  rotate,
  rotate_copy,
  random_shuffle,
  shuffle,

  // partition
  is_partitioned,
  partition,
  partition_copy,
  partition_point,
  stable_partition,

  // binary search
  lower_bound,
  upper_bound,
  equal_range,
  binaray_search,

  // minmax
  min,
  max,
  min_element,
  max_element,
  minmax_element,

  // sort
  sort,
  stable_sort,
  partial_sort,
  is_sorted,
  is_sort_until,
  nth_element,

  // merge
  merge,
  replace_merge,
  includes,
  set_union,
  set_difference,
  set_intersection,
  set_symmetric_diffrence
}
