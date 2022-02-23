/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:54:17
 * @LastEditTime: 2022-02-23 22:50:41
 * @LastEditors: hzheyuan
 * @Description: 关联式容器Map，基础为一颗红黑树
 * @FilePath: /tstl/src/container/associative/map.ts
 */
import { Tree } from '../tree/index'

export class Map<K> {
    _t: Tree<K, K>;

    // 比较器Comparator
    private key_comp: (a: K, b: K) => boolean = (a, b) => ((a as any) - (b as any)) < 0;
    constructor(comparator?: (a: K, b: K) => boolean) {
        if (comparator) this.key_comp = comparator;
        this._t = new Tree<K, K>(this.key_comp);
    }

    public begin() {
        return this._t.iterator().begin
    }

    public end() {
        this._t.iterator().end
    }

    public empty(): boolean {
        return this._t.empty
    }

    public size() {
        return this._t.size
    }

    public count(x: K) {
        return this._t.find(x) === this._t.iterator().end ? 0 : 1
    }

    public insert(x) { 
        this._t.insert_unique(x)
    }

    public find(x) {
        return this._t.find(x)
    }

    public erase(x) { 
        return this._t.erase(x)
    }

    public lower_bound(x: K) { 
        return this._t.lower_bound(x)
    }

    public upper_bound(x: K) {
        return this._t.upper_bound(x)
    }
    
    public clear() {
        this._t.clear()
    }
}