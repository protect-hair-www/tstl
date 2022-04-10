/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 18:17:16
 * @LastEditTime: 2022-04-10 19:25:15
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/exp/ArrayList/Iterator.ts
 */
import { IBaseIterator }  from '../Iterators/IBaseIterator'
import { ArrayList } from './index';
export class Iterator<E> implements IBaseIterator<E> {
    cntr: ArrayList<E>;
    cursor: number      // index of next element to return
    lastRet:number = -1;    // index of last element returned; -1 if no such
    expectedModCount = 0;

    constructor(cursor: number, cntr: ArrayList<E>) {
        this.cursor = cursor;
        this.cntr = cntr
    }

    public hasNext(): boolean {
        // console.log(this.cursor, this.cntr.cntr)
        return this.cursor !== this.cntr.cotr.length
    }

    public next(): IteratorResult<E> {
        let i = this.cursor, len = this.cntr.cotr.length
        if(i >= len) return {done: true, value: undefined}
        else {
            this.cursor = i + 1
            this.lastRet = i
            return {value: this.cntr.cotr[this.lastRet], done: false}
        }
    }

    public remove(): void {
        this.cntr.remove(this.cursor)
    }
}