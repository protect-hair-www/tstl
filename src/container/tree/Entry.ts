/*
 * @Author: hzheyuan
 * @Date: 2022-03-02 16:26:37
 * @LastEditTime: 2022-03-02 17:05:29
 * @LastEditors: hzheyuan
 * @Description: A map entry (key-value pair)
 * @FilePath: \tstl\src\container\tree\Entry.ts
 */
interface EntryInterface<K, V> {
    _key: K
    _value: V
    get key(): K
    set key(k: K)
    equals(): boolean
    getKey(): K
    getValue(): V
    setValue(v: V): V
}

export class Entry<K, V> implements EntryInterface<K, V> {
    _key: K
    _value: V

    constructor(k: K, v: V) {
        this._key = k
        this._value = v
    }

    get key() {
        return this._key
    }

    getKey(): K {
        return this._key
    }

    set key(k: K) {
        this._key = k
    }

    get value() {
        return this._value
    }

    getValue(): V {
        return this._value
    }

    set value(v: V) {
        this._value = v
    }

    setValue(v: V): V {
        this._value = v
        return this._value
    }

    equals(): boolean {
        return true        
    }
}