/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: \tstl\__test__\algorithms\sorting.spec.ts
 */
import { Vector } from '../../src';
import { sort, _unguarded_partition, _median, _insert_sort } from '../../src/algorithm/sorting';

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
      sort(begin, end);
      const res =  vec.data.join(' ')
      expect(res).toEqual('1 2 3 4 5 6 7 8 9 10');
    })
})