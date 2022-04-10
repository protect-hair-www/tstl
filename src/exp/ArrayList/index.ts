/*
 * @Author: hzheyuan
 * @Date: 2022-04-05 15:38:26
 * @LastEditTime: 2022-04-10 20:37:26
 * @LastEditors: kalai
 * @Description: Resizable-array implementation of the {@code List} interface.
 * Implements all optional list operations, and permits all elements, including {@code null}.
 * @FilePath: /tstl/src/exp/ArrayList/index.ts
 */
import { AbstractList }  from '../Abstracts/AbstractList'
import { IList, IUnmodifiable }  from '../Interface/IList'
import { IRandomAccess } from '../Interface/IRandomAccess'
import { ICloneable } from './../Interface/ICloneable';
import { Iterator }  from './Iterator'
import { ListIterator }  from './ListIterator'
import { IBaseIterator, IListIterator } from '../Iterators/'
import { isIterable } from '../../utils/'

export class ArrayList<E> extends AbstractList<E> implements IList<E>, IRandomAccess, ICloneable, IUnmodifiable<E> {
    private _size: number = 0
    private _cotr: E[] = []

    /**
     * @description Constructs a list. There has three versions
     * (1) Constructs a list containing the elements of the specified collection.
     * (2) Constructs an empty list with the specified initial capacity.
     * (3) Constructs an empty list.
     */    
    constructor()
    constructor(c: Iterable<E>)
    constructor(...args: any[]) {
        super()
        const len = args.length, arg = args[0]
        if(len === 1) {
            // Constructs a list containing the elements of the specified collection
            if(isIterable(arg)) {
                this.cotr = Array.from(arg)
            } else if(typeof arg === 'number') {
                // Constructs an empty list with the specified initial capacity.
                this.cotr = new Array(arg)
            }
        } else {
            // Constructs an empty list.
            this.cotr = []
        }
    }

    /**
     * @description Accesst the origin array data 
     * @param {*}
     * @return {*}
     */    
    get cotr() {
        return this._cotr
    }

    /**
     * @description Reset origin array data (internally method) 
     * @param {E} c
     * @return {*}
     */    
    set cotr(c: E[]) {
        this._cotr = c
    }

    /**
     * @description Returns the number of elements in this list.
     * @param {*}
     * @return {number} the number of elements in this list
     */    
    public size(): number {
        return this.cotr.length
    }

    /**
     * @description Returns {@code true} if this list contains no elements.
     * @param {*} 
     * @return {boolean} {@code true} if this list contains no elements
     */    
    public isEmpty(): boolean {
        return this._size === 0
    }

    /**
     * @description Returns the element at the specified position in this list.
     * @param {number} index index of the element to return
     * @return {*} the element at the specified position in this list
     * @throws IndexOutOfBoundsException
     */    
    public get(index: number): E {
        this.checkIndex(index)
        return this.cotr[index]
    }

    /**
     * @description Replaces the element at the specified position in this list with the specified element.
     * @param {number} index index of the element to replace
     * @param {E} e element to be stored at the specified position
     * @return {*} the element previously at the specified position
     * @throws IndexOutOfBoundsException
     */    
    public set(index: number, e: E): E {
        this.checkIndex(index)
        let oldE = this.cotr[index]
        this.cotr[index] = e
        return oldE;
    }

    /**
     * @description Returns an iterator over the elements in this list in proper sequence.
     * @param {*}
     * @return {IBaseIterator<E>} a base iterator
     */    
    public iterator(): IBaseIterator<E> { 
        return new Iterator(0, this);
    }

    /**
     * @description Returns a list iterator over the elements in this list (in propersequence).
     * @param {number} index A specified position of the iterator
     * @return {*} Returns a list iterator 
     */    
    public listIterator(index: number = 0): IListIterator<E> {
        return new ListIterator<E>(index, this)
    }

    /**
     * @description interally add method implemetaion
     * @param {E} e element to add
     * @return {*} void
     */    
    private _add(e: E) {
        this.modCount++
        this.cotr.push(e)
    }

    /**
     * @description interally add at a specificed position 
     * @param {number} index The specified position to add
     * @param {E} e The element to add
     * @return {boolealn} Return true if add successed
     */    
    private _addAt(index: number, e: E): boolean {
        this.modCount++
        this.cotr.splice(index, 0, e)
        return true
    }

    /**
     * @description Appends the specified element to the end of this list.
     * @param {Number} index index at which the specified element is to be inserted
     * @param {E} e element to be appended to this list 
     * @return {Boolean} Return true if success
     */    
    public add(e: E): boolean 
    public add(index: number, e: E): boolean
    public add(...args: any[]): boolean {
        if(args.length === 1) {
            this._add(args[0])
        } else {
            this._addAt(args[0], args[1])
        }
        return true
    }    

    /**
     * @description Appends all of the elements in the specified collection to this list, has two versions:
     * (1) Appends all of the elements the end of this list.
     * (2) Inserts all of the elements in the specified collection into this list, starting at the specified position.  
     * @param {Iterable<E>} c collection containing elements to be added to this list
     * @param {Number} index index at which to insert the first element from the specified collection
     * @return {*}
     */    
    public addAll(elements: Iterable<E>): boolean;
    public addAll(index: number, elements: Iterable<E>): boolean;
    public addAll(...args: any[]): boolean {
        if(args.length === 1) {
            let eles = args[0]
            this.cotr = this.cotr.concat(...eles)
        } else {

        }
        return true
    }

    /**
     * @description Returns {@code true} if this list contains the specified element.
     * @param {E} e element whose presence in this list is to be tested
     * @return {Boolean} {@code true} if this list contains the specified element
     */    
    public contains(e: E): boolean {
        return this.cotr.indexOf(e) >= 0
    }

    /**
     * @description Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @param {E} e element whose presence in this list is to be tested
     * @return {*} returns the lowest index {@code i} such that tested is true, or -1 if there is no such index.
     */    
    public indexOf(e: E): number {
        return this.indexOfRange(e, 0, this.size())
    }

    /**
     * @description indexof internally implemetation
     * @param {E} e element to be tested
     * @param {Number} start start position of the ranage
     * @param {Number} end end position of the range: ;
     * @return {*} returns the lowest index {@code i} such that tested is true, or -1 if there is no such index.
     */    
    private indexOfRange(e: E, start: number, end: number) {
        for(let i = start; i < end; ++i) {
            if(e === this.cotr[i]) return i
        }
        return -1
    }

    /**
     * @description Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @param {E} e element whose presence in this list is to be tested
     * @return {*} returns the highest index {@code i} such that tested is true, or -1 if there is no such index.
     */    
    public lastIndexOf(e: E): number {
        return this.lastIndexOfRange(e, 0, this.size())
    }

    /**
     * @description lastIndexof internally implemetation
     * @param {E} e element to be tested
     * @param {Number} start start position of the ranage
     * @param {Number} end end position of the range: ;
     * @return {*} returns the highest index {@code i} such that tested is true, or -1 if there is no such index.
     */   
    private lastIndexOfRange(e: E, start: number, end: number) {
        for(let i = end - 1; i >= start; i--) {
            if(e === this.cotr[i]) return i
        }
        return -1
    }

    /**
     * @description internally method for check legal position
     * @param {number} index
     * @return {*}
     */    
    private checkIndex(index: number): boolean {
        return index > 0 && index <= this.size()
    }

    /**
     * @description Removes the element of this list, this method has three versions:
     * (1) Removes the first occurrence of the specified element from this list.
     * (2) Removes the element at the specified position in this list.
     * (3) Removes the element which test by filter return true.
     * @param {E} e element to be removed from this list, if present
     * @param {Number} index the index of the element to be removed 
     * @param {Function} filter filter function
     * @return {Boolean | E} the element that was removed from the list(for version 2), true if successed(version 1, 3) 
     */    
    public remove(e: E): boolean;
    public remove(index: number): E;
    public remove(filter: (e: E) => boolean): boolean;
    public remove(arg: any): boolean | E {
        if(typeof arg === 'number') {
            return this._removeByIndex(arg)
        } else {
            return super.remove(arg);
        }
    }

    /**
     * @description internally implemetation for revmove version2 
     * @param {number} index
     * @return {E}
     */    
    private _removeByIndex(index: number): E {
        this.checkIndex(index)
        this.modCount++
        const val = this.cotr[index];
        this.cotr.splice(index, 1)
        return val
    }

    /**
     * @description internally remove version 3
     * @param {function} filter
     * @return {*}
     */    
    private _removeByFilter(filter: (e: E) => boolean) {
        for(let i = 0; i < this.size(); i++) {
            let val = this.cotr[i]
            if(filter(val)) {
                this.cotr.splice(i, 1)
            }
        }
    }

    /**
     * @description  Removes all elements satisfying the given filter function, from index i (inclusive) to index end (exclusive).
     * @param {function} filter filter function to test
     * @return {Boolean} return true if filter return true
     */    
    public removeIf(filter: (e: E) => boolean): boolean {
        this._removeByFilter(filter)
        return true;
    }

    /**
     * @description Removes from this list all of its elements that are contained in the specified collection.
     * @param {Iterable} c collection containing elements to be removed from this list
     * @return {Boolean} {@code true} if this list changed as a result of the call
     */    
    public removeAll(c: Iterable<E>): boolean {
        for(let val of c) {
            if(this.contains(val)) {
                this.remove(val)
            }
        }
        return true
    }

    /**
     * @description Removes all of the elements from this list.  The list will be empty after this call returns.
     * @param {*}
     * @return {void}
     */    
    public clear() {
        this.modCount++
        this.cotr.length = 0
        this.cotr = []
    }

    /**
     * @description Returns a shallow copy of this {@code ArrayList} instance.
     * @param {*}
     * @return {E[]}} a clone of this {@code ArrayList} instance
     */    
    public clone() {
        return this.cotr.slice()
    }

    /**
     * @todo
     * @description: (TODO) Returns a view of the portion of this list between the specified
     * {@code fromIndex}, inclusive, and {@code toIndex}, exclusive.  (If
     * {@code fromIndex} and {@code toIndex} are equal, the returned list is
     * empty.)  The returned list is backed by this list, so non-structural
     * changes in the returned list are reflected in this list, and vice-versa.
     * The returned list supports all of the optional list operations.
     * @param {number} fromIndex
     * @param {number} toIndex
     * @return {*}
     */    
    subList(fromIndex: number, toIndex: number): IList<E> {
        return new ArrayList<E>()
    }

    /**
     * @todo
     * @description
     * @param {E} e
     * @return {*}
     */    
    equals(e: E): boolean {
        return false
    }

    /**
     * @todo
     * @description: 
     * @param {*}
     * @return {*}
     */    
    hashCode(): number {
        return 1
    }

    /**
     * @description Returns an unmodifiable list containing one element.
     * @param {E} el the {@code List}'s element type
     * @return {IList<E>} a {@code List} containing the specified element
     */    
    of(el: E): IList<E> {
        return new ArrayList<E>()
    }

    /**
     * @description Returns an unmodifiable List containing the elements of the given Collection, in its iteration order. 
     * @param {Iterable} c a {@code Collection} from which elements are drawn, must be non-null
     * @return {*} a {@code List} containing the elements of the given {@code Collection}
     */    
    copyOf(c: Iterable<E>): boolean {
        return true
    }

    /**
     * @todo
     * @description
     * @param {*}
     * @return {*}
     */    
    sort(): void {}

   
    /**
     * @description Javascript iterable protocol
     * @param {*}
     * @return {*}
     */    
    [Symbol.iterator];
}