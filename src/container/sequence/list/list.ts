/*
 * @Author: hzheyuan
 * @Date: 2022-02-16 11:58:00
 * @LastEditTime: 2022-03-06 21:08:45
 * @LastEditors: hzheyuan
 * @Description: sequenece container list
 * 
 * Lists are sequenece containers that allow constant time insert and erase
 * operations anywhere whin the sequence, and itration in both directions
 * 
 * List containers are implemented as doubly-linked list; Doubly linked lists can store each of 
 * the elements they contain in different and unrelated storage locations. the ordring is kept 
 * internally by the association to each element of a link to the element preceding it and a link 
 * to the element following it.
 * 
 * Compared to other base standard sequence containers (array, vector and deque), 
 * lists perform generally better in inserting, extracting and moving elements in any position 
 * within the container for which an iterator has already been obtained, 
 * and therefore also in algorithms that make intensive use of these, like sorting algorithms.
 * 
 * @FilePath: \tstl\src\container\sequence\list\list.ts
 */
import { ListNode }  from './ListNode'
import { ListIterator } from './iterator'
import { Iterator } from '@/Iterator/'

export class List<T> {
    _header: ListNode<T>

    constructor(data?: Iterable<T>) {
        this._header = this.createNode()
        this.empty_init()
    }

    /**
     * @description: create a link list node by given value
     * @param {T} x
     * @return {*}
     */    
    private createNode(x?: T): ListNode<T> {
        const node = new ListNode(x);
        return node
    }

    /**
     * @description: initialize empty list
     * @param {*}
     * @return {*}
     */    
    private empty_init() {
        this.header.prev = this.header
        this.header.next = this.header
    }

    /**
     * @description: set header node(internally use)
     * @param {*} x
     * @return {*}
     */    
    set header(x) {
        this._header = x
    }

    /**
     * @description: get header node(internally use)
     * @param {*}
     * @return {*}
     */    
    get header() {
        return this._header
    }

    /**
     * @description: test whether container is empty
     * @param {*}
     * @return {*}
     */    
    public empty(): boolean {
        return this.header.next === this.header
    }

    /**
     * @description: return size
     * @param {*}
     * @return {*}
     */    
    public size(): number {
        return ListIterator.distance(this.begin(), this.end())
    }

    /**
     * @description: return iterator to beginning
     * @param {*}
     * @return {*}
     */    
    public begin(): ListIterator<T> {
        return new ListIterator(this.header.next) 
    }

    /**
     * @description: return iterator to end
     * @param {*}
     * @return {*}
     */    
    public end(): ListIterator<T> {
        return new ListIterator(this.header) 
    }

    /**
     * @description: check is at end
     * @param {*}
     * @return {*}
     */    
    private isEnd(p: ListIterator<T>): boolean {
        return p.getNode() === this.end().getNode() 
    }

    /**
     * @description: access first element
     * @param {*}
     * @return {*}
     */    
    public front() {
        return this.begin().getValue()
    }

    /**
     * @description: access last element
     * @param {*}
     * @return {*}
     */    
    public back() {
        return this.end().prev().getValue()
    }

    /**
     * @description: insert element innternally implementation
     * @param {ListIterator} pos
     * @param {T} x
     * @return {*}
     */    
    private _insert(pos: ListIterator<T>, x: T) {
        const temp = this.createNode(x)
        temp.next = pos.getNode()
        temp.prev = pos.getNode().prev
        pos.getNode().prev.next = temp
        pos.getNode().prev = temp
        return temp
    }

    /**
     * @description: insert new elements before the element at the sepcified position
     * @param {ListIterator} pos
     * @param {number} n
     * @param {T} v
     * @return {*}
     */    
    private _fill_insert(pos: ListIterator<T>, n: number, v: T) {
        for(; n > 0; --n) this.insert(pos, v)
    }

    /**
     * @description: insert elements by container iterator
     * @param {ListIterator} pos
     * @param {ListIterator} first
     * @param {ListIterator} last
     * @return {*}
     */    
    private _range_insert(pos: ListIterator<T>, first: Iterator<T>, last: Iterator<T>) {
        for(; first.getNode() !== last.getNode(); first.next()) {
            this.insert(pos, first.getValue())
        }
    }

    /**
     * @description: insert new element before the element at the specified position
     * @param {ListIterator} pos
     * @param {T} x
     * @return {*}
     */    
    public insert(pos: ListIterator<T>, x: T | number, v?: T) {
        if(typeof x === 'number' && v) this._fill_insert(pos, x, v)
        else this._insert(pos, (x as T))
    }

    /**
     * @description: add element at begining
     * @param {T} x
     * @return {*}
     */    
    public push_front(x: T) {
        this.insert(this.begin(), x)
    }

    /**
     * @description: add element at end
     * @param {T} x
     * @return {*}
     */    
    public push_back(x: T) {
        this.insert(this.end(), x)
    }

    /**
     * @description: erase elements internally implementation
     * @param {ListIterator} pos
     * @return {*}
     */    
    private _erase(pos: ListIterator<T>) {
        if(pos.getNode() === this.end().getNode()) return
        let next_node = pos.getNode().next
        let prev_node = pos.getNode().prev

        // let n = pos.getNode()
        prev_node.next = next_node
        next_node.prev = prev_node

        return new ListIterator(next_node)
    }

    /**
     * @description: erase a range of the list
     * @param {ListIterator} fisrt
     * @param {ListIterator} last
     * @return {*}
     */    
    private _range_erase(first: ListIterator<T>, last: ListIterator<T>) {
        while(first.getNode() !== last.getNode()) {
            this.erase(first)
            first.increment();
        }
        return last
    }

    /**
     * @description: erase elments
     * @param {ListIterator} pos
     * @return {*}
     */    
    public erase(first: ListIterator<T>, last?: ListIterator<T>) {
        if(last) this._range_erase(first, last)
        else this._erase(first)
    }

    /**
     * @description: delete fisrt element
     * @param {*}
     * @return {*}
     */    
    public pop_front() {
        this.erase(this.begin())
    }

    /**
     * @description: delete last element
     * @param {*}
     * @return {*}
     */    
    public pop_back() {
        this.erase(this.end().prev())
    }

    /**
     * @description: Exchanges the content of the container by the content of x, 
     * which is another list of the same type. Sizes may differ.
     * @param {type} params
     * @return {*}
     */    
    public swap(x: List<T>) {
        const temp = x.header
        x.header = this.header
        this.header = temp
    }

    /**
     * @description: resizes the container so that it contains new_size elements.
     * If n is smaller than the current container size, the content is reduced to its first n elements, removing those beyond (and destroying them).
     * If n is greater than the current container size, the content is expanded by inserting at the end as many elements as needed to reach a size of n. 
     * If val is specified, the new elements are initialized as copies of val, otherwise, they are value-initialized.
     * 
     * Notice that this function changes the actual content of the container by inserting or erasing elements from it.
     * @param {number} new_size
     * @param {T} v
     * @return {*}
     */    
    resize(new_size: number, v: T) {
        let i = this.begin()
        let len = 0
        for(; !this.isEnd(i) && len < new_size; i.increment(), ++len);
        if(len === new_size) this.erase(i, this.end())
        else this.insert(this.end(), new_size - len, v)
    }

    /**
     * @description: Removes all elements from the list container (which are destroyed)
     * and leaving the container with a size of 0.
     * @param {*}
     * @return {*}
     */    
    clear() {
        // let cur = this.header.next
        // while(cur !== this.header) {
        //     let temp = cur
        //     cur = cur.next
        // }
        this.header.next = this.header
        this.header.prev = this.header
    }

    /**
     * @description: transfer list to list
     * transfers elements from x into the container, inserting them at position(before)
     * @param {ListIterator} pos
     * @param {ListIterator} first
     * @param {ListIterator} last
     * @return {*}
     */    
    private transfer(pos: ListIterator<T>, first: ListIterator<T>, last: ListIterator<T>) {
        if(pos.getNode() !== last.getNode()) {
            // remove [first, last) from its old position
            last.getNode().prev.next = pos.getNode()
            first.getNode().prev.next = last.getNode()
            pos.getNode().prev.next = first.getNode()

            // Splice [fisrt, last) into its new position
            const temp = pos.getNode().prev
            pos.getNode().prev = last.getNode().prev
            last.getNode().prev = first.getNode().prev
            first.getNode().prev = temp
        }
    }

    /**
     * @description: transfers elements from x into the container, inserting them at position(before).
     * This effectively inserts those elements into the container and removes them from x, 
     * altering the sizes of both containers. The operation does not involve the construction or destruction of any element. 
     * They are transferred, no matter whether x is an lvalue or an rvalue, or whether the value_type supports move-construction or not.
     * 
     * The first version (1) transfers all the elements of x into the container.
     * The second version (2) transfers only the element pointed by i from x into the container.
     * The third version (3) transfers the range [first,last) from x into the container.

     * @param {ListIterator} pos
     * @param {List} list
     * @return {*}
     */    
    public splice(pos: ListIterator<T>, list: List<T>, first?: ListIterator<T>, last?: ListIterator<T>) {
        if(!first) {
            if(!list.empty()) this.transfer(pos, list.begin(), list.end())
        } else {
            if(!last) {
                this._splice_one(pos, list, first)
            } else {
                this._splice_range(pos, list, first, last)
            }
        }
    }

    /**
     * @description: splice version(2) interanlly implementation
     * @param {ListIterator} pos
     * @param {List} list
     * @param {ListIterator} i
     * @return {*}
     */    
    private _splice_one(pos: ListIterator<T>, list: List<T>, i: ListIterator<T>) {
        let j = i
        j = j.next()
        if(pos.getNode() === i.getNode() || pos.getNode() === j.getNode()) return
        this.transfer(pos, i, j)
    }

    /**
     * @description: splice version(3) internally implementation
     * @param {ListIterator} pos
     * @param {List} list
     * @param {ListIterator} first
     * @param {ListIterator} last
     * @return {*}
     */    
    private _splice_range(pos: ListIterator<T>, list: List<T>, first: ListIterator<T>, last: ListIterator<T>) {
        if(first.getNode() !== last.getNode()) this.transfer(pos, first, last)
    }

    /**
     * @description: remove elements with specific value
     * Removes from the container all the elements that compare equal to val. 
     * This calls the destructor of these objects and reduces the container size by the number of elements removed.
     * Unlike member function list::erase, which erases elements by their position (using an iterator), 
     * this function (list::remove) removes elements by their value.
     * 
     * A similar function, list::remove_if, exists, 
     * which allows for a condition other than an equality comparison to determine whether an element is removed.
     * @param {T} v
     * @return {*}
     */    
    public remove(v: T) {
        let first = this.begin(), last = this.end()
        while(first.getNode() !== last.getNode()) {
            // let next = first;
            if(v === first.getValue()) this.erase(first)
            first.increment()
            // first = next
        }
    }
    
    /**
     * @description: remove elements with specific condition
     * which allows for a condition other than an equality comparison to determine whether an element is removed.
     * @param {function} fn
     * @return {*}
     */    
    public remove_if(fn: (v: T) => boolean) {
        let first = this.begin(), last = this.end()
        while(first.getNode() !== last.getNode()) {
            // let next = first;
            const value = first.getValue()
            if(fn(value as T)) this.erase(first)
            first.increment()
            // first = next
        }
    }

    /**
     * @description: remove duplicate values
     * The version with no parameters (1), 
     * removes all but the first element from every consecutive group of equal elements in the container
     * @param {*}
     * @return {*}
     */    
    public unique() {
        let first = this.begin(), last = this.end()        
        if(first.getNode() === last.getNode()) return
        let next = first;
        while((next = next.next()) && next.getNode() !== last.getNode()) {
            if(first.getValue() === next.getValue()) {
                this.erase(next)
            } else {
                first = next
            }
            next = first
        }
    }

    /**
     * @description: merge sorted lists
     * @param {*}
     * @return {*}
     */    
    public merge(list: List<T>) {
        let first1 = this.begin(), last1 = this.end()
        let fisrt2 = list.begin(), last2 = list.end()
        while(first1.getNode() !== last1.getNode() && fisrt2.getNode() !== last2.getNode()) {
            if(fisrt2.getValue() < first1.getValue()) {
                let next = fisrt2.next()
                // next.increment()
                this.transfer(first1, fisrt2, next)
                fisrt2 = next
            } else {
                first1.increment()
            }
        }
        if(fisrt2.getNode() !== last2.getNode()) this.transfer(last1, fisrt2, last2)
    }

    /**
     * @description: sort elements in container
     * The sorting is performed by applying an algorithm that uses either 
     * operator< (in version (1)) or comp (in version (2) todo) to compare elements. 
     * This comparison shall produce a strict weak ordering of the elements 
     * (i.e., a consistent transitive comparison, without considering its reflexiveness).
     * @param {*}
     * @return {*}
     */    
    public sort() {
        // if list has length 0 or 1 do nothing 
        if(this.header.next !== this.header && this.header.next.next !== this.header) {
            let carry = new List<T>()
            let counter = new Array<List<T>>(64)
            counter.fill(new List<T>())

            let fill = 0
            while(!this.empty()) {
                carry.splice(carry.begin(), this, this.begin())
                let i = 0
                while(i < fill && !counter[i].empty()) {
                    counter[i].merge(carry)
                    carry.swap(counter[i++])
                }
                carry.swap(counter[i])
                if(i === fill) ++fill
            }
            // console.log(this, this.empty(), counter, fill)
            // for(let i = 1; i < fill; ++i) {
            //     counter[i].merge(counter[i-1])
            // }
            this.swap(counter[fill-1])
        }
    }

    /**
     * @description: reverse the elements of container(internally implementation)
     * @param {ListNode} p
     * @return {*}
     */    
    _reverse(p: ListNode<T>) {
        let temp = p
        do {
            // swap
            let t = temp.next
            temp.next = temp.prev
            temp.prev = t
            // next
            temp = temp.prev
        } while(temp !== p)
    }

    /**
     * @description: reverse the ordered of elements
     * @param {*}
     * @return {*}
     */    
    public reverse() {
        this._reverse(this.header)
    }

    /**
     * @description: fill assign a list with given value
     * @param {number} n
     * @param {T} v
     * @return {*}
     */    
    private _fill_assign(n: number, v: T) {
        let i = this.begin()
        for(; i.getNode() !== this.end().getNode() && n > 0; i.increment(), --n) {
            i.getNode().setValue(v)
        }
        if(n > 0) {
            this.insert(this.end(), n, v)
        } else {
            this.erase(i, this.end());
        }
    }

    /**
     * @description: assign new content to container
     * @param {*}
     * @return {*}
     */    
    assign(n: number, v: T) {
        this._fill_assign(n, v)
    }

}
