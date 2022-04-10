/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:00:16
 * @LastEditTime: 2022-04-10 19:32:42
 * @LastEditors: kalai
 * @Description: The root interface in the collection hierarchy.  
 * A collection represents a group of objects, known as its elements. 
 * Some collections allow duplicate elements and others do not.  Some are ordered and others unordered. 
 * @FilePath: /tstl/src/exp/Interface/ICollection.ts
 */
import type { IBaseIterator } from '../Iterators/'

export interface ICollection<E> extends Iterable<E> {
    /**
     * Returns the number of elements in this collection. 
     * @return the number of elements in this collection
     */
    size(): number

    /**
     * Returns {@code true} if this collection contains no elements.
     *
     * @return {@code true} if this collection contains no elements
     */
    isEmpty(): boolean

    /**
     * Returns {@code true} if this collection contains the specified element.
     * More formally, returns {@code true} if and only if this collection
     * contains at least one element {@code e} such that
     * {@code Objects.equals(o, e)}.
     */
    contains(e: E): boolean

    /**
     * Returns {@code true} if this collection contains all of the elements
     * in the specified collection.
     */
    containsAll(eles: Iterable<E>)

    /**
     * Returns an iterator over the elements in this collection.
     */
    iterator(): IBaseIterator<E>

    /**
     * Ensures that this collection contains the specified element (optional
     * operation). 
     * @param {E}
     */
    add(e: E): boolean
    // add(index: number, e: E): boolean

    /**
     * Adds all of the elements in the specified collection to this collection
     * (optional operation). 
     */
    addAll(elements: Iterable<E>): boolean

    /**
     * Removes a single instance of the specified element from this
     * collection, if it is present (optional operation). 
     */
    remove(e: E): boolean

    /**
     * Removes a single instance of the specified element from this
     * collection, if the filter function return ture. 
     */
    remove(filter: (e: E)=> boolean): boolean

    /**
     * Removes all of the elements of this collection that satisfy the given
     * predicate.
     */
    removeIf(filter: (e: E)=> boolean): boolean

    /**
     * Removes all of this collection's elements that are also contained in the
     * specified collection (optional operation). 
     */
    removeAll(c: ICollection<E>): boolean

    /**
     * Retains only the elements in this collection that are contained in the
     * specified collection (optional operation).  In other words, removes from
     * this collection all of its elements that are not contained in the
     * specified collection
     */
    retainAll(c: ICollection<E>): boolean

    /**
     * Removes all of the elements from this collection (optional operation).
     * The collection will be empty after this method returns.
     */
    clear(): void

    /** Compares the specified object with this collection for equality.  */
    equals?(e: E): boolean

    /** Returns the hash code value for this collection.  */
    hashCode?(): number

    /**
     * Creates a {@link Spliterator} over the elements in this collection.
     */
    spliterator()

    /**
     * Returns an array containing all of the elements in this collection.
     */
    toArray(): E[]

    /**
     * Returns an array containing all of the elements in this collection;
     * the runtime type of the returned array is that of the specified array.
     * If the collection fits in the specified array, it is returned therein.
     * Otherwise, a new array is allocated with the runtime type of the
     * specified array and the size of this collection.
     */
    toArray<T>(fn:(e: E) => T): T[]
}