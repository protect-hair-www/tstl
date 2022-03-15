/*
 * @Author: hzheyuan
 * @Date: 2022-03-11 17:06:16
 * @LastEditTime: 2022-03-14 16:26:25
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

// interface VectorInterface<T> extends TSTLIterable<T> {
//     cntr: T[]
//     start: number
//     finish: number
// }
// interface VectorConstructor {
//     new(arrayLength?: number): any[];
//     new <T>(arrayLength: number): T[];
//     new <T>(...items: T[]): T[];
//     (arrayLength?: number): any[];
//     <T>(arrayLength: number): T[];
//     <T>(...items: T[]): T[];
//     // isVector(arg: any): arg is any[];
//     readonly prototype: any[];
// }
// function createVector<T>(ctor: VectorConstructor, arrayLength: number): VectorInterface<T> {
//     return new ctor()
// }
