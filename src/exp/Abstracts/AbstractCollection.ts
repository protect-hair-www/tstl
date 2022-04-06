/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:09:58
 * @LastEditTime: 2022-04-06 10:48:15
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\src\exp\Abstracts\AbstractCollection.ts
 */
import { ICollection } from '../Interface/ICollection'
import { Iterator }  from '../Iterators/Iterator'
export abstract class AbstractCollection<E> implements ICollection<E> {
    public abstract size(): number;
    public abstract iterator: Iterator<E>;

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

    abstract add(e: E):boolean
    abstract add(index: number, e: E):boolean

    abstract remove(index: number): boolean;
    abstract removeIf(): boolean;
    abstract clear();
    abstract addAll(elements: Iterable<E>): boolean;
    abstract removeAll(): boolean;
    abstract hashCode(): number;
    abstract equals(e: E): boolean;
    [Symbol.iterator]
}