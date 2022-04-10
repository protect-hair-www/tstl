/*
 * @Author: hzheyuan
 * @Date: 2022-04-06 22:09:10
 * @LastEditTime: 2022-04-10 16:43:05
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/exp/LinkedList/Iterator.ts
 */
import { IBaseIterator }  from '../Iterators/IBaseIterator'
import { LinkedListIterator } from './ListIterator'
import { LinkedList } from './index';

export class LinkedIterator<E> implements IBaseIterator<E> {
    private _itr: LinkedListIterator<E>

    constructor(index: number, list: LinkedList<E>) {
        this._itr = new LinkedListIterator(index, list)
    }

    hasNext(): boolean {
        return this._itr.hasNext()    
    }

    next() {
        return this._itr.next()
    }

    remove(): void {
        this._itr.remove() 
    }
}