/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:24:58
 * @LastEditTime: 2022-03-29 16:58:56
 * @LastEditors: hzheyuan
 * @Description: Partition
 * Partitioning operations
 * @FilePath: \tstl\src\algorithm\paritions.ts
 */
import { InputIterator, BidirectionalIterator, ForwardIterator, OutputIterator, iter_swap } from '../iterator/';

/**
 * @description test whether range is partitoned
 * return true if all the elements in the range [first, last) for which fn returns true
 * precede those which it returns false.
 * if the range is empty, the function returns true
 * @param {InputIterator} first Input iterator to the initial position of the sequence. The range used is [first,last).
 * @param {InputIterator} last Input iterator to the final position of the sequence. The range used is [first,last)
 * @param {function} fn Unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @return {Boolean} true if all the elements in the range [first,last) for which fn returns true precede those for which it returns false.
 */
export function is_partitioned<T>(first: InputIterator<T>, last: InputIterator<T>, fn: (v: T) => boolean): boolean {
    while (first !== last && fn(first.getValue())) first.next();
    while (first !== last) {
        if (fn(first.getValue())) return false;
        first.next()
    }
    return true;
}

/**
 * @description partition range in two
 * rearranges the elements from the range [first, last), in such a way that all the elements for which fn returns
 * true precede all those for which it returns false. the iterator returned points to the first element of the second group.
 * the relative ordering whihin each group is not necessarily the same as before the call.
 * see stable_partition for a function with a similar but with stable ordering within each group.
 * @param {BidirectionalIterator} first Forward iterator to the initial position of the sequence to partition. 
 * @param {BidirectionalIterator} last Forward iterator to the final position of the sequence to partition. 
 * @param {function} fn Unary function that accepts an element in the range as argument, and returns a value convertible to bool. 
 * @return {BidirectionalIterator} An iterator that points to the first element of the second group of elements (those for which fn returns false), or last if this group is empty.
 */
export function partition<T>(first: BidirectionalIterator<T>, last: BidirectionalIterator<T>, fn: (v: T) => boolean): BidirectionalIterator<T> {
    while (first !== last) {
        while (fn(first.getValue())) {
            first.next();
            if (first === last) return first;
        }
        do {
            last.prev();
            if (first === last) return first;
        } while (!fn(last.getValue()));
        iter_swap(first, last)
    }
    return first;
}


/**
 * @description Partition range in two - stable ordering
 * Rearranges the elements in the range [first,last), in such a way that all the elements for which fn returns true
 * @param {BidirectionalIterator} first Bidirectional iterator to the initial position of the sequence to partition. 
 * @param {BidirectionalIterator} last Bidirectional iterator to the initial position of the sequence to partition. 
 * @param {function} fn Unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @return {BidirectionalIterator} An iterator that points to the first element of the second group of elements (those for which fn returns false), or last if this group is empty.
 */
export function stable_partition<T>(first: BidirectionalIterator<T>, last: BidirectionalIterator<T>, fn: (v: T) => boolean) {
    // let len = itr_distance(first, last);
        // return fn(first.getValue() ? last : first;
    // let middle = first
    // advance(middle, len / 2)
    // return rotate(stable_partition(first, middle, fn), middle, stable_partition(middle, last, fn));
}

/**
 * @description partition range in two
 * copies the elements in the range [first, last) for which fn returns true into the range pointed by result_true,
 * and those for which it does not into the range pointed by result_false
 * @param {InputIterator} first Input iterators to the initial position of the range to be copy-partitioned. 
 * @param {InputIterator} last Bidirectional iterators to final position of the sequence to partition. 
 * @param {OutputIterator} result_true Output iterator to the initial position of the range where the elements for which fn returns true are stored.
 * @param {OutputIterator} result_false Output iterator to the initial position of the range where the elements for which fn returns false are stored.
 * @param {function} fn Unary function that accepts an element pointed by InputIterator as argument, and returns a value convertible to bool.
 * @return {Tuple} A tuple of iterators with the end of the generated sequences pointed by result_true and result_false, respectivelly.
 */
export function partition_copy<T>(first: InputIterator<T>, last: InputIterator<T>, result_true: OutputIterator<T>, result_false: OutputIterator<T>, fn: (v: T) => boolean) { 
    while(first !== last) {
        if(fn(first.getValue())) {
            result_true.setValue(first.getValue())
            result_true.next()
        } else {
            result_false.setValue(first.getValue())
            result_false.next()
        }
        first.next()
    }
    return [result_true, result_false];
}


/**
 * @description: get partition point
 * return an iterator to the first element in the partitioned range [first, last) for which fn returns false, indicating its partition point.
 * the elements in the range shall already be patitioned, as if parition had been called with same arguments.
 * the function optimizes the number of comparisions performed by comparing non-consecutive elements of the sorted range, 
 * which is specially efficient for random-access iterators.
 * @param {ForwardIterator} first Forward iterator to the initial position of the partitioned sequence.
 * @param {ForwardIterator} last Forward iterator to the final position of the partitioned sequence.
 * @param {function} fn Unary function that accepts an element in the range as argument, and returns a value convertible to bool.
 * @return {*} n iterator to the first element in the partitioned range [first,last) for which fn is not true, or last if it is not true for any element.
 */
export function partition_point<T>(first: ForwardIterator<T>, last: ForwardIterator<T>, fn: (v: T) => boolean): ForwardIterator<T> {
    // let n = input_itr_distance(first, last);
    // while(n > 0) {
    //     let it = first, step = n / 2;
    //     advance(it, step);
    //     if(fn(it.getValue())) {first.increase(it); n -= step+1}
    //     else n = step;
    // }
    return first;
}
