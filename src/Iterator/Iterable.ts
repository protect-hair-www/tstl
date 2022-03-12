/*
 * @Author: hzheyuan
 * @Date: 2022-03-10 23:20:17
 * @LastEditTime: 2022-03-12 15:52:32
 * @LastEditors: hzheyuan
 * @Description: Iterable Interface
 * 
 * Javascript，iterable object have to implementation「@@iterator」method，Javascript can access the property with [Symbol.iterator]
 * Normally Javascript iterable objeact have three iterable property:
 *  (1) keys
 *  (2) values
 *  (3) entries
 * @FilePath: /tstl/src/Iterator/Iterable.ts
 */
export interface TSTLIterable<T> extends Iterable<T> {
    /** Iterator */
    [Symbol.iterator](): IterableIterator<T>;

    /** Returns an iterable of key, value pairs for every entry in the array */
    entries(): IterableIterator<[number, T]>;

    /** Returns an iterable of keys in the array */
    keys(): IterableIterator<number>;

    /** Returns an iterable of values in the array */
    values(): IterableIterator<T>;
}