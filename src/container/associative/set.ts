/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:54:17
 * @LastEditTime: 2022-02-22 09:23:58
 * @LastEditors: hzheyuan
 * @Description: 关联式容器Set
 * @FilePath: \tstl\src\container\associative\set.ts
 */
import { Tree } from '../tree/index'

export class Set<V> {
    _tr = new Tree<V, V>();
    constructor() {
        
    }

    public insert() {}
    public erase() {}
    public find() {}
    public count() {}
    public lower_bound(){}
    public upper_bound() {}
    public size() {}
}