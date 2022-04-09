/*
 * @Author: hzheyuan
 * @Date: 2022-04-06 23:26:18
 * @LastEditTime: 2022-04-09 12:20:09
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/src/exp/Iterators/type.ts
 */
import { Iterator }  from '../ArrayList/Iterator'
import { LinkedIterator } from '../LinkedList/Iterator';
import { ListIterator }  from '../ArrayList/ListIterator'
import { LinkedListIterator } from '../LinkedList/ListIterator';
import { BaseIterator } from './IBaseIterator';

export type IteratorTypes<E> = BaseIterator<E> //Iterator<E> | LinkedIterator<E>
export type ListIteratorTypes<E> = ListIterator<E> | LinkedListIterator<E>