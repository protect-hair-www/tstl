/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:57:21
 * @LastEditTime: 2022-03-04 11:11:53
 * @LastEditors: hzheyuan
 * @Description: 序列式容器vector，连续的存储空间，js中数组array满足需求，这里之间基于array实现
 * @FilePath: \tstl\src\container\sequence\vector\vector.ts
 */
import { VCIterator } from './iterator'

export class Vector<T> {
    container: Array<T>

    _begin: number = 0
    _end: number = 0

    constructor() {
        this.container = new Array<T>()
    }

    get front() {
        return this.container[this._begin]
    }

    get back() {
        return this.container[this._end]
    }

    get begin() {
        return this._begin
    }

    get end() {
        return this._end
    }

    getValue() {

    }

    size() {

    }

    empty() {

    }

    resize() {

    }

    reserve() {

    }

    at() {

    }

    push_back() {

    }

    pop_back() {

    }

    insert() {

    }

    swap() {

    }

    clear() {

    }

    emplace() {

    }

    emplace_back() {

    }
}
