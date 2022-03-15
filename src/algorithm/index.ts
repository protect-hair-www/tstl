/*
 * @Author: hzheyuan
 * @Date: 2022-03-12 10:58:55
 * @LastEditTime: 2022-03-14 23:43:41
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
import { makeHeap, popHeap, pushHeap, sortHeap, isHeap, isHeapUntil } from './heap'

import {
  find,
  find_end,
  find_first_of,
  all_of,
  any,
  every,
  any_of,
  adjacent_find,
  count,
  count_if,
  mismatch,
  equal,
  is_premutation,
  search,
  search_n
} from './non_modifying_sequence_op'

export {
  makeHeap,
  popHeap,
  pushHeap,
  sortHeap,
  isHeap,
  isHeapUntil,
  find,
  find_end,
  find_first_of,
  all_of,
  any,
  every,
  any_of,
  adjacent_find,
  count,
  count_if,
  mismatch,
  equal,
  is_premutation,
  search,
  search_n
}
