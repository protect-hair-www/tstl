/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: \tstl\__test__\algorithms\binary_search.spec.ts
 */
import { Vector } from '../../src';
import { lower_bound, upper_bound, binaray_search } from '../../src/algorithm/binary_search';
import { advance } from '../../src/iterator';

const orginArray = [1, 2, 3, 3, 5, 6, 6, 7, 8, 8, 9, 10, 11];
function init_test_container(arr: number[] = orginArray) {
    return new Vector<number>(arr);
}

describe('binary search algorithms', () => {

    test('test lower_bound', () => {
      const vec = init_test_container();
      const ret1 = lower_bound(vec.begin(), vec.end(), 1);
      const ret2 = lower_bound(vec.begin(), vec.end(), 3);
      const ret3 = lower_bound(vec.begin(), vec.end(), 4);
      const ret4 = lower_bound(vec.begin(), vec.end(), 6);
      const ret5 = lower_bound(vec.begin(), vec.end(), 10);
      const ret6 = lower_bound(vec.begin(), vec.end(), 11);
      const ret7 = lower_bound(vec.begin(), vec.end(), 12);

      expect(ret1.cur).toEqual(0);
      expect(ret2.cur).toEqual(2);
      expect(ret3.cur).toEqual(4);
      expect(ret4.cur).toEqual(5);
      expect(ret5.cur).toEqual(11);
      expect(ret6.cur).toEqual(12);
      expect(ret7.cur).toEqual(13);
    })

    test('test upper_bound', () => {
      const vec = init_test_container();
      const ret1 = upper_bound(vec.begin(), vec.end(), 3);
      const ret2 = upper_bound(vec.begin(), vec.end(), 5);
      const ret3 = upper_bound(vec.begin(), vec.end(), 6);
      const ret4 = upper_bound(vec.begin(), vec.end(), 7);
      const ret5 = upper_bound(vec.begin(), vec.end(), 11);
      expect(ret1.cur).toEqual(4);
      expect(ret2.cur).toEqual(5);
      expect(ret3.cur).toEqual(7);
      expect(ret4.cur).toEqual(8);
      expect(ret5.cur).toEqual(13);
    })

    test('test binary search', () => {
      const vec = init_test_container();
      const ret1 = binaray_search(vec.begin(), vec.end(), 1);
      const ret2 = binaray_search(vec.begin(), vec.end(), 3);
      const ret3 = binaray_search(vec.begin(), vec.end(), 7);
      const ret4 = binaray_search(vec.begin(), vec.end(), 11);
      const ret5 = binaray_search(vec.begin(), vec.end(), 4);
      expect(ret1).toBeTruthy();
      expect(ret2).toBeTruthy();
      expect(ret3).toBeTruthy();
      expect(ret4).toBeTruthy();
      expect(ret5).toBeFalsy();
    })
  });
