import { InputIterator, OutputIterator } from '@/Iterator';
/*
 * @Author: hzheyuan
 * @Date: 2022-03-13 18:24:40
 * @LastEditTime: 2022-03-14 23:29:52
 * @LastEditors: hzheyuan
 * @Description: Modifying sequence operations
 * TODO
 * @FilePath: /tstl/src/algorithm/modifying_sequence_op.ts
 */

/**
 * @description: 
 * @param {InputIterator} first
 * @param {InputIterator} last
 * @param {OutputIterator} result
 * @return {*}
 */
export function copy<T>(first: InputIterator<T>, last: InputIterator<T>, result: OutputIterator<T>) {}
export function copy_n<T>(first: InputIterator<T>, n: number, result: OutputIterator<T>) {}
export function copy_backward() {}
export function move() {}
export function swap() {}
export function swap_range() {}
export function iter_swap() {}
export function transform() {}
export function replace() {}
export function replace_copy() {}
export function replace_copy_if() {}
export function fill() {}
export function fill_n() {}
export function generate() {}
export function generate_n() {}
export function remove() {}
export function remove_if() {}
export function remove_copy() {}
export function remove_copy_if() {}
export function unique() {}
export function unique_copy() {}
export function reverse() {}
export function reverse_copy() {}
export function rotate() {}
export function rotate_copy() {}
export function random_shuffle() {}
export function shuffle() {}