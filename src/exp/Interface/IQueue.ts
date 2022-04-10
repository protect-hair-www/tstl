/*
 * @Author: kalai
 * @Date: 2022-04-10 12:40:23
 * @LastEditTime: 2022-04-10 15:13:01
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/exp/Interface/Queue.ts
 */

import { ICollection } from './ICollection';
export interface IQueue<E> extends ICollection<E> {
    offer(e: E): boolean
    poll(): E
    element(): E
    peek(): E
}