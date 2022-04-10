/*
 * @Author: hzheyuan
 * @Date: 2022-04-06 10:38:25
 * @LastEditTime: 2022-04-10 18:40:32
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

    addAll(eles: Iterable<E>): boolean;
    addAll(index: number, eles: Iterable<E>): boolean;
    addAll(...args: any[]): boolean {
        const len = args.length;
        if(len === 2) {
            let modified = false, index = args[0], c = args[1];
            const iter = this.listIterator(index)
            for(let e of c) {
                iter.add(e)
                modified = true
            }
            return modified
        } else {

        }
        return false
    }

    remove(e: E): boolean;
    remove(index: number): E;
    remove(filter: (e: E) => boolean): boolean;
    remove(arg: any): boolean | E {
        if(typeof arg === 'number') {
            try {
                return this._removeByIndex(arg);
            } catch (error) {
                throw new Error('throw new IndexOutOfBoundsException')
            }
        }
        return false
    }

    // remove(): E;
    // remove(e: E): boolean;
    // remove(index: number): E;
    // remove(...args: any[]): boolean | E { 
    //     if(args.length === 1 && typeof args[0] === 'number') {
    //         return this._removeByIndex(args[0]);
    //     }
    //     return true
    // }

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