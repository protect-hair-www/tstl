/*
 * @Author: hzheyuan
 * @Date: 2019-01-29 08:32:32
 * @LastEditTime: 2022-03-13 17:55:22
 * @LastEditors: hzheyuan
 * @Description: TSSTL library main entry
 * @FilePath: /tstl/src/index.ts
 */

import {
    Vector,
    List,
    Deque
} from '@/container/sequence/index'
import {
    Set,
    Map,
    MultiSet,
    MultiMap
} from '@/container/associative/index'
import { PriorityQueue }  from '@/container/sequence/'
import { Queue, Stack } from '@/adapter'
import {
    makeHeap,
    popHeap,
    pushHeap,
    sortHeap,
    isHeap,
    isHeapUntil
} from '@/algorithm'

import { less, greater } from '@/fanctor'

export {
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

    // algorithm
    makeHeap,
    popHeap,
    pushHeap,
    sortHeap,
    isHeap,
    isHeapUntil,

    // functor
    less,
    greater
}