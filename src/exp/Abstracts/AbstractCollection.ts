/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:09:58
 * @LastEditTime: 2022-04-05 16:11:49
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/exp/Abstracts/AbstractCollection.ts
 */
import { ICollection } from '../Interface/ICollection'
export abstract class AbstractCollection<E> implements ICollection<E> {
    public abstract size(): number;
    public abstract iterator: Iterator<E, any, undefined>;

    public isEmpty(): boolean {
        return this.size() === 0
    }

    public contains(e: E): boolean {
        let it = this.iterator
        if(it == null) {
            // while(it.done)
        }
        return false
    }

    abstract add(e: E): boolean;
    abstract remove(index: number): boolean;
    abstract removeIf(): boolean;
    abstract clear();
    abstract addAll(elements: Iterable<E>): boolean;
    abstract removeAll(): boolean;
    abstract hashCode(): number;
    abstract equals(e: E): boolean;
    [Symbol.iterator]
}