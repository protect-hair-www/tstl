/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 18:17:16
 * @LastEditTime: 2022-04-05 19:00:51
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/exp/Iterators/Iterator.ts
 */
import { BaseIterator }  from './IBaseIterator'
export class Iterator<E> implements BaseIterator<E> {
    cntr: E[];
    cursor: number      // index of next element to return
    lastRet:number = -1;    // index of last element returned; -1 if no such
    expectedModCount = 0;

    constructor(cursor: number, cntr: E[]) {
        this.cursor = cursor;
        this.cntr = cntr
    }

    public hasNext(): boolean {
        return this.cursor !== this.cntr.length
    }

    public next(): IteratorResult<E> {
        let i = this.cursor, len = this.cntr.length
        if(i >= len) return {done: true, value: undefined}
        else {
            this.cursor = i + 1
            this.lastRet = i
            return {value: this.cntr[this.lastRet], done: false}
        }
    }

    public remove(): void {
        
    }
}