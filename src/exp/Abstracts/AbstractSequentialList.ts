/*
 * @Author: hzheyuan
 * @Date: 2022-04-06 10:38:25
 * @LastEditTime: 2022-04-07 23:48:01
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/exp/Abstracts/AbstractSequentialList.ts
 */
import { AbstractList } from "./AbstractList";
export abstract class AbstractSequentialList<E> extends AbstractList<E> {
    get(index: number): E {
        try {
            return this.listIterator(index).next().value
        } catch (error) {
            throw new Error('')
        }
    }

    set(index: number, e: E): E {
        try {
            let iter = this.listIterator(index)
            let oldVal = iter.next().value
            iter.set(e)
            return oldVal
        } catch (error) {
           throw new Error('') 
        }     
    }

    add(e: E): boolean;
    add(index: number, e: E): boolean;
    add(index: any, e?: any): boolean {
        return true
    }

    remove(): E;
    remove(e: E): boolean;
    remove(index: number): E;
    remove(...args: any[]): boolean | E { 
        if(args.length === 1 && typeof args[0] === 'number') {
            return this._removeByIndex(args[0]);
        }
        return true
    }

    _removeByIndex(index: number): E {
        try {
            let e = this.listIterator(index)
            let outCast = e.next().value
            e.remove()
            return outCast;
        } catch (error) {
           throw new Error('') 
        } 
    }
}