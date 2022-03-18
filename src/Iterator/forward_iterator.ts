/*
 * @Author: hzheyuan
 * @Date: 2022-02-12 11:03:38
 * @LastEditTime: 2022-03-18 17:51:01
 * @LastEditors: hzheyuan
 * @Description: Forward iterator category
 * Inteface to identify the category of an iterator as a forward iterator:
 *
 * Forward iterators are iterators that can be used to access the sequence of elements in a range
 * in the direction that goes from its beginning towards its end.
 *
 * Performing operations on a forward iterator that is dereferenceable never makes its iterator value non-dereferenceable.
 * This enables algorithms that use this category of iterators to use multiple copies of an iterator to pass more than once by the same iterator values.
 *
 * All bidirectional and random-access iterators are also valid forward iterators.
 *
 * There is not a single type of forward iterator:
 * Each container may define its own specific iterator type able to iterate through it and access its elements.
 * But all forward iterators support at least the following operations:
 *  (1) Access
 *  (2) Write
 *  (3) Next (+1)
 * @FilePath: /tstl/src/Iterator/forward_iterator.ts
 */
import { InputIterator } from './input_iterator'
import { OutputIterator } from './output_iterartor'
type InputAndOutputItreator<T> = InputIterator<T> & OutputIterator<T>
export interface ForwardIterator<T> extends InputAndOutputItreator<T> {}
