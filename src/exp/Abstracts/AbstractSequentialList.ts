/*
 * @Author: hzheyuan
 * @Date: 2022-04-06 10:38:25
 * @LastEditTime: 2022-04-06 23:03:01
 * @LastEditors: hzheyuan
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


    remove(): boolean;
    remove(e: E): boolean;
    remove(index: number): boolean;
    remove(...args: any[]): boolean {
        let len = args.length
        if(len === 1 && typeof args[0] === 'number') {
            this._removeByIndex(args[0])
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