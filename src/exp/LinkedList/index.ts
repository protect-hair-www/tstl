
/*
 * @Author: hzheyuan
 * @Date: 2022-04-06 10:36:58
 * @LastEditTime: 2022-04-06 11:09:31
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\src\exp\LinkedList\index.ts
 */
import { AbstractSequentialList } from "../Abstracts/AbstractSequentialList";
import { IRandomAccess } from '../Interface/IRandomAccess'
import { ICloneable } from './../Interface/ICloneable';
import { IList } from './../Interface/IList';
import { ListNode } from './ListNode'

export class LinkedList<E> extends AbstractSequentialList<E> implements IList<E>, ICloneable, IRandomAccess {
    _size: number = 0
    first: ListNode<E>
    last: ListNode<E>

    public size(): number {
        return this._size
    }

    private linkFirst(e: E): void {
        let f = this.first
        let newNode = new ListNode(e)
        if(f === null) {
            this.last = newNode
        } else {
            f.prev = newNode
        }
        this._size++
        this.modCount++
    }
}