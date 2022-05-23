/*
 * @Author: hzheyuan
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/functor/comparable.ts
 */
export interface Comparable<T> {
    equals(t: T): boolean;
    less(t: T): boolean;
}
/**
 * @description return the first element having the largest value 
 * @return {T} return undefined if there are no elements 
 */
export function maxWith<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number,
): T | undefined {
    let max: T | undefined = undefined;
    let isFirst = true;

    for (const cur of array) {
        if (isFirst || comparator(cur, <T>max) > 0) {
            max = cur;
            isFirst = false;
        }
    }
    return max;
}

/**
 * @description return the first element having the smallest value 
 * @return {T} return undefined if there are no elements 
 */
export function minWith<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number,
  ): T | undefined {
    let min: T | undefined = undefined;
    let isFirst = true;
  
    for (const cur of array) {
      if (isFirst || comparator(cur, <T> min) < 0) {
        min = cur;
        isFirst = false;
      }
    }
  
    return min;
  }

/**
 * @description applies the given selector to all elements of the given collection
 * and return the max value of all the elements. if arr is empty return undefined.
 * ref: https://github.com/denoland/deno_std/blob/main/collections/max_of.ts
 * @return {T}
 */
export function maxOf<T>(
    array: readonly T[],
    selector: (el: T) => number,
): number | undefined;

export function maxOf<T>(
    array: readonly T[],
    selector: (el: T) => bigint,
): bigint | undefined;

export function maxOf<T, S extends ((el: T) => number) | ((el: T) => bigint)>(
    array: readonly T[],
    selector: S,
): ReturnType<S> | undefined {
    let maximumValue: ReturnType<S> | undefined = undefined;

    for (const i of array) {
        const currentValue = selector(i) as ReturnType<S>;

        if (maximumValue === undefined || currentValue > maximumValue) {
            maximumValue = currentValue;
            continue;
        }

        if (Number.isNaN(currentValue)) {
            return currentValue;
        }
    }

    return maximumValue;
}

/**
 * @description applies the given selector to all elements of the given collection
 * and return the min value of all the elements. if arr is empty return undefined.
 * ref: https://github.com/denoland/deno_std/blob/main/collections/max_of.ts
 * @return {T}
 */
export function minOf<T>(
    array: readonly T[],
    selector: (el: T) => number,
): number | undefined;

export function minOf<T>(
    array: readonly T[],
    selector: (el: T) => bigint,
): bigint | undefined;

export function minOf<T, S extends ((el: T) => number) | ((el: T) => bigint)>(
    array: readonly T[],
    selector: S,
): ReturnType<S> | undefined {
    let minimumValue: ReturnType<S> | undefined = undefined;

    for (const i of array) {
        const currentValue = selector(i) as ReturnType<S>;

        if (minimumValue === undefined || currentValue < minimumValue) {
            minimumValue = currentValue;
            continue;
        }

        if (Number.isNaN(currentValue)) {
            return currentValue;
        }
    }

    return minimumValue;
}