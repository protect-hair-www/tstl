/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: /tstl/__test__/algorithms/heap.spec.ts
 */
import { Vector } from '../../src';
import {  makeHeap, popHeap, pushHeap, _pop_heap, sortHeap } from '../../src/algorithm/heap';
import { advance } from '../../src/iterator';

const orginArray = [1, 8, 3, 6, 5, 7, 2, 4, 10, 9];
function init_test_container(arr: number[] = orginArray) {
    return new Vector<number>(arr);
}

function getString(vec: Vector<number>) {
  let iter = vec.begin();
  let str = '';
  while(iter != vec.end()) {
    str += iter.getValue().toString();
    iter.next();
  }
  return str;
}

describe('heap algorithms test', () => {

    test('test make heap', () => {
      const vec = init_test_container();
      makeHeap(vec.begin(), vec.end());
      const ret = vec.data.join(" ");
      expect(ret).toEqual('10 9 7 8 5 3 2 4 6 1');
    });

    test('test push heap', () => {
      const vec = init_test_container();
      makeHeap(vec.begin(), vec.end());
      vec.push_back(12);
      pushHeap(vec.begin(), vec.end());
      const ret = vec.data.join(" ");
      expect(ret).toEqual('12 10 7 8 9 3 2 4 6 1 5');
    });

    test('test pop heap', () => {
      const vec = init_test_container();
      makeHeap(vec.begin(), vec.end());
      popHeap(vec.begin(), vec.end());
      const ret = vec.data.join(" ");
      expect(ret).toEqual('10 7 8 9 3 2 4 6 1 5');
    });
})