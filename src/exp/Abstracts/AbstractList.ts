import { AbstractCollection } from "./AbstractCollection"
import { IList } from '../Interface/IList'
/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:39:35
 * @LastEditTime: 2022-04-05 16:06:31
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/exp/Abstracts/AbstractList.ts
 */
export abstract class AbstractList<E> extends AbstractCollection<E> implements IList<E> {
    protected modCount: number = 0
    public add(e: E): boolean {
        return true
    }

    abstract get(index: number): E;

    abstract set(index: number, element: E): E;
    addAt(index: number, element: E): void {
        
    }
    indexOf(element: E): number {
        return 1        
    }
    lastIndexOf(elemet: E): number {
        return this.size()
    }
    abstract subList(fromIndex: number, toIndex: number): IList<E>;
    abstract of(el: E): IList<E>;
}