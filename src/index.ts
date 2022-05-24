/*
 * @Author: hzheyuan
 * @Date: 2019-01-29 08:32:32
 * @LastEditTime: 2022-05-24 14:22:55
 * @LastEditors: kalai
 * @Description: TSSTL library main entry
 * @FilePath: \tstl\src\index.ts
 */
import { Vector, List, Deque } from './container/sequence/index'
import { Set, Map, MultiSet, MultiMap } from './container/associative/index'
import { Tree, _RBTNode, _Entry } from './container/tree/index'
import { PriorityQueue } from './container/sequence/'
import { Queue, Stack } from './adapter'
import { less, greater } from './functor'
import { makeHeap, popHeap, pushHeap, sortHeap, isHeap, isHeapUntil } from './algorithm'
import { advance, distance, iter_move, iter_swap } from './Iterator/index'
import { immCreator } from './utils/'
import {
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
  search_n
} from './algorithm'

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
} from './algorithm'

import {
  is_partitioned,
  partition,
  partition_copy,
  partition_point,
  stable_partition
} from './algorithm';

import {
  lower_bound,
  upper_bound,
  equal_range,
  binaray_search
} from './algorithm'

import {
  min,
  max,
  min_element,
  max_element,
  minmax_element
} from './algorithm'

import {
  sort,
  stable_sort,
  partial_sort,
  is_sorted,
  is_sort_until,
  nth_element
} from './algorithm'

import {
  merge,
  inplace_merge,
  includes,
  set_union,
  set_difference,
  set_intersection,
  set_symmetric_diffrence
} from './algorithm'

export {
  // associative underlying data structrue
  // developing stage export, later will be remve
  Tree as _RBTree,
  _RBTNode,
  _Entry,
  // sequence container
  Vector,
  List,
  Deque,
  PriorityQueue,
  // asssociative container
  Set,
  Map,
  MultiSet,
  MultiMap,
  // adapter
  Stack,
  Queue,

  // iter
  distance,
  advance,
  iter_move,
  iter_swap,

  // algorithm
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
  inplace_merge,
  includes,
  set_union,
  set_difference,
  set_intersection,
  set_symmetric_diffrence,

  // functor
  less,
  greater,

  immCreator as _immCreator
}
