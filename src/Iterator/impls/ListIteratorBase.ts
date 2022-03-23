/*
 * @Author: hzheyuan
 * @Date: 2022-03-04 11:08:24
 * @LastEditTime: 2022-03-23 16:27:22
 * @LastEditors: hzheyuan
 * @Description: list container iterator
 * @FilePath: \tstl\src\Iterator\impls\ListIteratorBase.ts
 */
import { ListNode } from '../../container/sequence/list/ListNode'
import { BidirectionalIterator, IteratorTags, IteratorTypes } from '../index'

export abstract class ListIteratorBase<T> implements BidirectionalIterator<T> {
    readonly tag: IteratorTags = IteratorTags.BIDIRECTIONAL_ITERATOR
    _cur: ListNode<T>

    constructor(cur) {
        this._cur = cur
    }

    get cur() {
        return this._cur
    }

    set cur(x) {
        this._cur = x
    }

    /**
     * @description: access node value (getter)
     * @param {*}
     * @return {*}
     */
    get value() {
        return this.cur.getValue()
    }

    /**
     * @description: get the list node saved value
     * @param {*}
     * @return {*}
     */
    getValue() {
        return this.cur.getValue()
    }

    /**
     * @description: set value
     * @param {T} v
     * @return {*}
     */
    setValue(v: T) {
        this.cur.value = v
    }

    /**
     * @description: check equal
     * @param {I} itr
     * @return {*}
     */
    abstract equals<T, I extends IteratorTypes<T>>(itr: I): boolean

    /**
     * @description: get list element node
     * @param {*}
     * @return {*}
     */
    getNode(): ListNode<T> {
        return this._cur
    }

    /**
     * @description: check has next element
     * @param {*}
     * @return {*}
     */
    hasNext(): boolean {
        return this._cur.getValue() !== null
    }

    /**
     * @description: test whether has previous elemenmt
     * @param {*}
     * @return {*}
     */
    abstract hasPrev(): boolean

    /**
     * @description: move to previous element
     * @param {*}
     * @return {*}
     */
    abstract prev(...args: any): IteratorResult<T, any>

    /**
     * @description: goto next (interanlly implementation)
     * @param {*}
     * @return {*}
     */
    abstract increment(n: number, c: boolean): BidirectionalIterator<T>;

    /**
     * @description: goto prev (internally implementation)
     * @param {*}
     * @return {*}
     */
    abstract decrement(n: number, c: boolean): BidirectionalIterator<T>;

    //   /**
    //    * @description: return next iterator
    //    * @param {*}
    //    * @return {*}
    //    */
    //   nextItr(): LinkListIterator<T> {
    //     return new LinkListIterator(this._cur.next)
    //   }

    //   /**
    //    * @description: return prev iterator
    //    * @param {*}
    //    * @return {*}
    //    */
    //   prevItr(): LinkListIterator<T> {
    //     return new LinkListIterator(this._cur.prev)
    //   }

    /**
     * @description: iterator increment and return the element
     * @param {*}
     * @return {*}
     */
    public next(): IteratorResult<T> {
        // this.increment()
        // return this._cur.getValue()
        if (this.hasNext()) {
            const node = { done: false, value: this.cur.getValue() }
            this._cur = this._cur.next
            return node
        } else {
            return { done: true, value: undefined }
        }
    }

    /**
     * @description: js iterator protocol
     * @param {*}
     * @return {*}
     */
    [Symbol.iterator]() {
        return this
    }
}

