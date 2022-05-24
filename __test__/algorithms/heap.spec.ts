/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: \tstl\__test__\algorithms\heap.spec.ts
 */
import { Vector } from '../../src';
import { makeHeap, popHeap, pushHeap, _pop_heap, sortHeap,isHeap, isHeapUntil } from '../../src/algorithm/heap';
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

    // test('test pop heap with result', () => {
    //   const vec = init_test_container();
    //   const vec2 = init_test_container();
    //   makeHeap(vec.begin(), vec.end());

    //   const res = vec2.begin();
    //   advance(res, 4);
    //   _pop_heap(vec.begin(), vec.end(), res);

    //   const ret = vec.data.join(" ");
    //   expect(ret).toEqual('9 8 7 6 5 3 2 4 1 10');
    // });

    test('test pop heap', () => {
      const vec = init_test_container();
      makeHeap(vec.begin(), vec.end());
      popHeap(vec.begin(), vec.end());
      const ret = vec.data.join(" ");
      expect(ret).toEqual('9 8 7 6 5 3 2 4 1 10');
    });

    test('test is heap', () => {
      const vec = init_test_container();
      makeHeap(vec.begin(), vec.end());
      const ret = isHeap(vec.begin(), vec.end());
      expect(ret).toBeTruthy();
    });


    test('test is heap util', () => {
      const vec = init_test_container();
      let begin = vec.begin();
      let last = vec.begin();
      advance(last, 4);
      makeHeap(begin, last);
      const ret = isHeapUntil(begin, vec.end());
      expect(ret.cur).toEqual(5);
    });


    test('test heap sort', () => {
      const vec = init_test_container();
      makeHeap(vec.begin(), vec.end());
      sortHeap(vec.begin(), vec.end());
      const ret = vec.data.join(" ");
      expect(ret).toEqual('1 2 3 4 5 6 7 8 9 10');
    });
})