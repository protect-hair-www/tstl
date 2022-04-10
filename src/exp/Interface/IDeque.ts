/*
 * @Author: kalai
 * @Date: 2022-04-10 12:42:28
 * @LastEditTime: 2022-04-10 15:02:08
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/exp/Interface/Deque.ts
 */
import { IQueue } from './Queue'
export interface Deque<E> extends IQueue<E> {
    addFirst(e: E): void
    addLast(e: E): void

    offerFirst(e: E): boolean
    offerLast(e: E): boolean

    removeFirst(): E
    removeLast(): E

    pollFirst(): E
    pollLast(): E

    getFirst(): E
    getLast(): E

    peekFirst(): E
    peekLast(): E

    removeFirstOccurrence(e: E): boolean
    removeLastOccurrence(e: E): boolean

    offer(e: E): boolean
    poll(): E
    element(): E

    peek(): E

    push(e: E): void    
    pop(): E
}