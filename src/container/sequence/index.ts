/*
 * @Author: hzheyuan
 * @Date: 2022-03-12 14:20:30
 * @LastEditTime: 2022-03-23 13:32:34
 * @LastEditors: hzheyuan
 * @Description:
 * @FilePath: \tstl\src\container\sequence\index.ts
 */
import { Vector } from './vector/'
import { List } from './list/'
import { Deque } from './deque/'
import { PriorityQueue } from './priority_queue/'
export type _Sequence<T> = Vector<T> | List<T> | Deque<T>
export { Vector, List, Deque, PriorityQueue }
