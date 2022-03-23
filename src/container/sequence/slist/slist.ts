/*
 * @Author: hzheyuan
 * @Date: 2022-03-23 21:12:03
 * @LastEditTime: 2022-03-23 21:38:36
 * @LastEditors: hzheyuan
 * @Description: Slist(single list)
 * an slist is a singly linked list: a list where each element is linked to the next element, but not to the previous element.
 * that is, it is a Sequence that supports forward but not backward traversal, and (amortized) constant time insertion and removal of elements. 
 * slists, like lists, have the important property that insertion and splicing do not invalidate iterators to list elements, 
 * and that even removal invalidates only the iterators that point to the elements that are removed. 
 * the ordering of iterators may be changed (that is, iterator might have a different predecessor or successor after a list operation than it did before), 
 * but the iterators themselves will not be invalidated or made to point to different elements unless that invalidation or mutation is explicit. [2]
 * 
 * the main difference between slist and list is that list's iterators are bidirectional iterators, while slist's iterators are forward iterators. 
 * @FilePath: /tstl/src/container/sequence/slist/slist.ts
 */
// import { SlistNode } from './SlistNode'
// import { InputIterator, ListIterator, distance} from '../../../iterator'
// import { TSTLIterable } from '../../../iterator/Iterable'

// export class Slist<T> implements TSTLIterable<T> {
//   private _header: SlistNode<T>

//   public constructor()
//   public constructor(listLength: number, v: T)
//   public constructor(list: Slist<T>)
//   public constructor(first: InputIterator<T>, last: InputIterator<T>)
//   constructor(...args: any[]) {
//     this._header = this.createNode()
//     if (args.length === 1) {
//     //   this._assign_container(args[0])
//     } else if (args.length === 2) {
//       if (typeof args[0] === 'number') {
//         // this._assign_fill(args[0], args[1])
//       } else {
//         // this._assign_range(args[0], args[1])
//       }
//     }
//   }

//   /**
//    * @description: create a link list node by given value
//    * @param {T} x
//    * @return {*}
//    */
//   private createNode(x?: T): SlistNode<T> {
//     const node = new SlistNode(x)
//     return node
//   }

//   begin() {
//     //   return new ListIterator<T>()
//   }

//   end() {
//   }

//   private _insert_after_fill(pos) {

//   }

//   /**
//    * @description: js iterator protocol
//    * @param {*}
//    * @return {*}
//    */
//   *[Symbol.iterator](): IterableIterator<T> {
//     const cur = this.begin()
//     while (cur.hasNext()) {
//       try {
//         const value = cur.getValue()
//         cur.next()
//         yield value
//       } catch (error) {
//         console.log(error)
//       }
//     }
//   }

//   /**
//    * @description: keys iterable
//    * @param {*}
//    * @return {*}
//    */
//   *keys() {
//     const cur = this.begin()
//     let idx = 0
//     while (cur.hasNext()) {
//       try {
//         const key = idx++
//         cur.next()
//         yield key
//       } catch (error) {
//         console.log(error)
//       }
//     }
//   }

//   /**
//    * @description: values iterable
//    * @param {*}
//    * @return {*}
//    */
//   *values() {
//     const cur = this.begin()
//     while (cur.hasNext()) {
//       const value = cur.getValue()
//       cur.next()
//       yield value
//     }
//   }

//   /**
//    * @description: entries iterable
//    * @param {*}
//    * @return {*}
//    */
//   *entries() {
//     const cur = this.begin()
//     const idx = 0
//     while (cur.hasNext()) {
//       try {
//         const entry: [number, T] = [idx, cur.getValue()]
//         cur.next()
//         yield entry
//       } catch (error) {
//         console.log(error)
//       }
//     }
//   }
// }