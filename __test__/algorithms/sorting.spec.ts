/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: \tstl\__test__\algorithms\sorting.spec.ts
 */
import { Vector } from '../../src';
import { sort, is_sorted, is_sort_until, nth_element, 
  _unguarded_partition, _median, _insert_sort, _partial_sort, _final_insertion_sort, _unguarded_insertion_sort } from '../../src/algorithm/sorting';
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

describe('sort algorithms test', () => {

    test('test median', () => {
      let ret = _median(5, 6, 3);
      expect(ret).toEqual(5);
    })

    test('test pivot normal', () => {
      const vec = init_test_container();
      let begin = vec.begin(), end = vec.end();
      let ret = _unguarded_partition(begin, end, 5);
      expect(ret.getIndex()).toEqual(4);
    })

    test('test pivot right end point', () => {
      const vec = init_test_container();
      let begin = vec.begin(), end = vec.end();
      let ret = _unguarded_partition(begin, end, 10);
      expect(ret.getIndex()).toEqual(9);
    })

    test('test pivot left end point', () => {
      const vec = init_test_container();
      let begin = vec.begin(), end = vec.end();
      let ret = _unguarded_partition(begin, end, 1);
      expect(ret.getIndex()).toEqual(0);
    })

    test('test internally insert sort for case no copy_back', () => {
      const vec = init_test_container();
      let begin = vec.begin(), end = vec.end();
      _insert_sort(begin, end);
      const res =  vec.data.join(' ')
      expect(res).toEqual('1 2 3 4 5 6 7 8 9 10');
    })

    test('test internally _unguarded_insertion_sort', () => {
      const vec = init_test_container([1, 8, 3, 6, 5, 7, 2, 4, 10, 9]);
      let begin = vec.begin(), end = vec.end();
      _unguarded_insertion_sort(begin, end);
      const res =  vec.data.join(' ')
      expect(res).toEqual('1 2 3 4 5 6 7 8 9 10');
    })


    test('test internally insert sort for case copy_back', () => {
      const vec = init_test_container([6, 8, 3, 1, 5, 7, 2, 4, 10, 9]);
      let begin = vec.begin(), end = vec.end();
      _insert_sort(begin, end);
      const res =  vec.data.join(' ')
      expect(res).toEqual('1 2 3 4 5 6 7 8 9 10');
    })

    test('test sort case size < 16', () => {
      const vec = init_test_container([6, 8, 3, 1, 5, 7, 2, 4, 10, 9]);
      let begin = vec.begin(), end = vec.end();
      const mid = advance(begin.copy(), 4);
      _partial_sort(begin, mid, end);
      const res =  vec.data.join(' ');
      expect(res).toEqual('1 2 3 4 8 7 6 5 10 9');
    })

    test('test final insert sort case size smaller 16', () => {
      const vec = init_test_container([6, 8, 3, 1, 5, 7, 2, 4, 10, 9, 19]);
      _final_insertion_sort(vec.begin(), vec.end());
      const res =  vec.data.join(' ');
      expect(res).toEqual('1 2 3 4 5 6 7 8 9 10 19');
    })

    test('test sort case size larger 16', () => {
      const vec = init_test_container([6, 8, 3, 1, 5, 7, 2, 4, 10, 9, 19, 11, 15, 13, 16, 14, 12, 17, 20, 18, 30, 39, 36, 31, 37, 32, 35, 33, 34, 38]);
      sort(vec.begin(), vec.end());
      const res =  vec.data.join(' ');
      expect(res).toEqual('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 30 31 32 33 34 35 36 37 38 39');
    })

    test('test is sorted', () => {
      const vec = init_test_container([6, 8, 3, 1, 5, 7, 2, 4, 10, 9]);
      let begin = vec.begin(), end = vec.end();
      const ret1 = is_sorted(vec.begin(), vec.end())
      expect(ret1).toBeFalsy();

      sort(begin, end);
      const ret = is_sorted(vec.begin(), vec.end())
      expect(ret).toBeTruthy();
    })

    test('test is sorted until', () => {
      const vec = init_test_container([1, 2, 6, 8, 9, 3, 1, 5, 7, 2, 4, 10, 9]);
      const ret = is_sort_until(vec.begin(), vec.end())
      expect(ret.cur).toEqual(5);
    })

    test('test nth element', () => {
      const vec = init_test_container([1, 2, 6, 8, 9, 3, 1, 5, 7, 2, 4, 10, 9]);
      const mid = advance(vec.begin(), 5); 
      nth_element(vec.begin(),  mid, vec.end())
      const ret = mid.getValue(); 
      expect(ret).toEqual(4);
    })
})