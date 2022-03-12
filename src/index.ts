/*
 * @Author: hzheyuan
 * @Date: 2019-01-29 08:32:32
 * @LastEditTime: 2022-03-12 15:59:53
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
import { Queue, Stack } from '@/adapter'
import { makeHeap } from '@/algorithm'

export {
    // sequence container
    Vector,
    List,
    Deque,

    // asssociative container
    Set,
    Map,
    MultiSet,
    MultiMap,

    // adapter
    Stack,
    Queue,

    // algorithm
    makeHeap
}