/*
 * @Author: hzheyuan
 * @Date: 2022-03-11 17:06:16
 * @LastEditTime: 2022-03-11 17:08:01
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\src\Iterator\types.ts
 */

// interface IteratorYieldResult<TYield> {
//     done?: false;
//     value: TYield;
// }

// interface IteratorReturnResult<TReturn> {
//     done: true;
//     value: TReturn;
// }

// type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;

// interface Iterator<T, TReturn = any, TNext = undefined> {
//     // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
//     next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
//     return?(value?: TReturn): IteratorResult<T, TReturn>;
//     throw?(e?: any): IteratorResult<T, TReturn>;
// }

// interface Iterable<T> {
//     [Symbol.iterator](): Iterator<T>;
// }

// interface IterableIterator<T> extends Iterator<T> {
//     [Symbol.iterator](): IterableIterator<T>;
// }

