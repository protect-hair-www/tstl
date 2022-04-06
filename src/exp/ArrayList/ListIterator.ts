/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 18:16:12
 * @LastEditTime: 2022-04-06 23:10:12
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/exp/ArrayList/ListIterator.ts
 */
import { Iterator } from './Iterator'
import { IListIterator  } from '../Iterators/IListIterator'
import { ArrayList } from './index';

export class ListIterator<E> extends Iterator<E> implements IListIterator<E> {
    constructor(cursor: number, cntr: ArrayList<E>) {
        super(cursor, cntr)
    }

    public hasPrevious(): boolean {
        return this.cursor !== 0
    }

    public nextIndex(): number {
        return this.cursor
    }

    public previousIndex(): number {
        return this.cursor - 1
    }

    public previous() {
        let i = this.cursor - 1
        if(i < 0) throw new Error('')
        if(i >= this.cntr.cntr.length) throw new Error('')
        this.cursor = i
        return this.cntr[this.lastRet = i]
    } 

    public set(e: E) {
        if(this.lastRet < 0) throw new Error('')
        try {
            this.cntr.set(this.lastRet, e)
        } catch (error) {
            
        }
    }

    public add() {

    }

    public remove(): void {
        
    }
}