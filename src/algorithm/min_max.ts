import { ForwardIterator } from './../iterator/forward_iterator';
/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:26:08
 * @LastEditTime: 2022-03-29 17:01:08
 * @LastEditors: hzheyuan
 * @Description: min max
 * todo
 * @FilePath: \tstl\src\algorithm\min_max.ts
 */


import { CompFunType, less } from './../functor/relational';

/**
 * @description return the smallest
 * returns the smallest of a and b. if both are equivalent, a is returned.
 * @param {T} a value to compare
 * @param {T} b value to compare
 * @param {Function} [comp] Binary function that accepts two elements in the range as arguments, and returns a value convertible to bool.
 * @return {T} The lesser of the values passed as arguments.
 */
export function min<T>(a: T, b: T): boolean;
export function min<T>(a: T, b: T, compare: CompFunType): boolean;
export function min<T>(a: T, b: T, compare?: CompFunType) {
    if(compare) {
        return compare(a, b) ? a : b
    }
    return !(b < a) ? a : b
}


/**
 * @description return the largest
 * returns the largest of a and b. If both are equivalent, a is returned.
 * @param {T} a value to compare
 * @param {T} b value to compare
 * @param {Function} [comp] Binary function that accepts two elements in the range as arguments, and returns a value convertible to bool.
 * @return {T} The larger lesser of the values passed as arguments.
 */
export function max<T>(a: T, b: T): boolean;
export function max<T>(a: T, b: T, compare: CompFunType): boolean;
export function max<T>(a: T, b: T, compare?: CompFunType) {
    if(compare) {
        return compare(a, b) ? a : b
    }
    return (b < a) ? a : b
}

export function minmax() {}

/**
 * @description return smallest element in range
 * returns an iterator pointing to the element with the smallest value in the range [first,last).
 * @param {ForwardIterator} first Input iterator to the initial position of the sequence to compare. 
 * @param {ForwardIterator} last Input iterator to the final position of the sequence to compare. 
 * @param {Function} [comp] Binary function that accepts two elements in the range as arguments, and returns a value convertible to bool.
 * @return {ForwardIterator} An iterator to smallest value in the range, or last if the range is empty.
 */
export function min_element<T>(first: ForwardIterator<T>, last: ForwardIterator<T>): ForwardIterator<T>;
export function min_element<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, compare: CompFunType): ForwardIterator<T>;
export function min_element<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, compare?: CompFunType): ForwardIterator<T> {
    if(first === last) return last;
    let smllest = first;
    while((first.next() && first !== last)) {
        if(compare) {
            if(compare(first.getValue, smllest.getValue())) smllest = first
        } else {
            if(first.getValue() <= smllest.getValue()) smllest = first
        }
    }
    return smllest;
}

/**
 * @description return largest element in range
 * returns an iterator pointing to the element with the largest value in the range [first,last).
 * @param {ForwardIterator} first Input iterator to the initial position of the sequence to compare. 
 * @param {ForwardIterator} last Input iterator to the final position of the sequence to compare. 
 * @param {Function} [comp] Binary function that accepts two elements in the range as arguments, and returns a value convertible to bool.
 * @return {ForwardIterator} An iterator to smallest value in the range, or last if the range is empty.
 */
export function max_element<T>(first: ForwardIterator<T>, last: ForwardIterator<T>): ForwardIterator<T>;
export function max_element<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, compare: CompFunType): ForwardIterator<T>;
export function max_element<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, compare?: CompFunType): ForwardIterator<T> {
    if(first === last) return last;
    let largest = first;
    while((first.next() && first !== last)) {
        if(compare) {
            if(compare(first.getValue, largest.getValue())) largest = first
        } else {
            if(first.getValue() > largest.getValue()) largest = first
        }
    }
    return largest;
}

/**
 * @description return smallest and largest elements in range
 * returns a tuple with an iterator pointing to the element with the smallest value in the range [first,last) as first element, 
 * and the largest as second.
 * @param {ForwardIterator} first Input iterator to the initial position of the sequence to compare. 
 * @param {ForwardIterator} last Input iterator to the final position of the sequence to compare. 
 * @param {Function} [comp] Binary function that accepts two elements in the range as arguments, and returns a value convertible to bool.
 * @return {ForwardIterator} A tuple with an iterator pointing to the element with the smallest value in the range [first,last) as first element, and the largest as second.
 */
export function minmax_element<T>(first: ForwardIterator<T>, last: ForwardIterator<T>): [ForwardIterator<T>, ForwardIterator<T>];
export function minmax_element<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, compare: CompFunType): [ForwardIterator<T>, ForwardIterator<T>];
export function minmax_element<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, compare?: CompFunType): [ForwardIterator<T>, ForwardIterator<T>] {
    if(first === last) return [last, last];
    let smllest = first, largest = first;
    while((first.next() && first !== last)) {
        if(compare) {
            if(compare(first.getValue, smllest.getValue())) smllest = first
            if(compare(first.getValue, largest.getValue())) largest = first
        } else {
            if(first.getValue() <= smllest.getValue()) smllest = first
            if(first.getValue() > largest.getValue()) largest = first
        }
    }
    return [smllest, largest];
}