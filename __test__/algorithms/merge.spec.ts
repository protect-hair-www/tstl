/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: merge part
 * @FilePath: \tstl\__test__\algorithms\merge.spec.ts
 */
import { Vector } from '../../src';
import { merge, inplace_merge, set_union, set_intersection, set_difference, set_symmetric_diffrence, includes } from '../../src/algorithm/merge';
import { advance } from '../../src/iterator';

const orginArray = [1, 2, 3, 3, 5, 6, 6, 7, 8, 8, 9, 10, 11];
function init_test_container(arr: number[] = orginArray) {
    return new Vector<number>(arr);
}

describe('merge algorithms', () => {
    test('test merge all', () => {
      const vec1 = init_test_container([5,10,15,20,25]);
      const vec2 = init_test_container([7,14,21,28,35,42]);
      const vec3 = new Vector<number>();
      merge(vec1.begin(), vec1.end(), vec2.begin(), vec2.end(), vec3.begin());
      const ret = vec3.data.join(" ");
      expect(ret).toEqual("5 7 10 14 15 20 21 25 28 35 42")
    });

    test('test set inplace merge', () => {
      const vec = init_test_container([5, 10, 15, 20, 25, 7, 17, 27, 37, 47, 57]);
      let first1 = vec.begin(), last1 = vec.end();
      let mid = vec.begin()
      advance(mid, 5)
      inplace_merge(first1, mid, last1);
      const ret = vec.data.join(" ");
      expect(ret).toEqual('5 7 10 15 17 20 25 27 37 47 57');
    });

    test('test merge part', () => {
      const vec1 = init_test_container([5,10,15,20,25]);
      const vec2 = init_test_container([7,14,21,28,35,42]);
      const vec3 = new Vector<number>();
      let first1 = vec1.begin(), last1 = vec1.end();
      let first2 = vec2.begin(), last2 = vec2.end();
      advance(first1, 3);
      advance(first2, 2);
      merge(first1, last1, first2, last2, vec3.begin());
      const ret = vec3.data.join(" ");
      expect(ret).toEqual("20 21 25 28 35 42")
    });

    test('test set union', () => {
      const vec1 = init_test_container([5, 10, 15, 20, 25]);
      const vec2 = init_test_container([4, 5, 10, 14, 20, 25, 28, 35, 42]);
      const vec3 = new Vector<number>();
      let first1 = vec1.begin(), last1 = vec1.end();
      let first2 = vec2.begin(), last2 = vec2.end();
      set_union(first1, last1, first2, last2, vec3.begin());
      const ret = vec3.data.join(" ");
      expect(ret).toEqual("4 5 10 14 15 20 25 28 35 42");
    });

    test('test set intersection', () => {
      const vec1 = init_test_container([5, 10, 15, 20, 25]);
      const vec2 = init_test_container([4, 5, 10, 14, 20, 25, 28, 35, 42]);
      const vec3 = new Vector<number>();
      let first1 = vec1.begin(), last1 = vec1.end();
      let first2 = vec2.begin(), last2 = vec2.end();
      set_intersection(first1, last1, first2, last2, vec3.begin());
      const ret = vec3.data.join(" ");
      expect(ret).toEqual("5 10 20 25");
    });

    test('test set difference', () => {
      const vec1 = init_test_container([5, 10, 15, 20, 25, 27]);
      const vec2 = init_test_container([4, 5, 10, 14, 20, 25, 28, 35, 42]);
      const vec3 = new Vector<number>();
      let first1 = vec1.begin(), last1 = vec1.end();
      let first2 = vec2.begin(), last2 = vec2.end();
      set_difference(first1, last1, first2, last2, vec3.begin());
      const ret = vec3.data.join(" ");
      expect(ret).toEqual("15 27");
    });

    test('test set symmetric difference', () => {
      const vec1 = init_test_container([5, 10, 15, 20, 25, 27]);
      const vec2 = init_test_container([4, 5, 10, 14, 20, 25, 28, 35, 42]);
      const vec3 = new Vector<number>();
      let first1 = vec1.begin(), last1 = vec1.end();
      let first2 = vec2.begin(), last2 = vec2.end();
      set_symmetric_diffrence(first1, last1, first2, last2, vec3.begin());
      const ret = vec3.data.join(" ");
      expect(ret).toEqual("4 14 15 27 28 35 42");
    });

    test('test set includes', () => {
      const vec1 = init_test_container([4, 5, 10, 14, 20, 25, 28, 35, 42]);
      const vec2 = init_test_container([5, 10, 15, 20, 25, 27]);
      const vec3 = init_test_container([4, 5, 10, 20, 25, 28]);
      let first1 = vec1.begin(), last1 = vec1.end();
      let first2 = vec2.begin(), last2 = vec2.end();
      const ret1 = includes(first1, last1, first2, last2);
      const ret2 = includes(first1, last1, vec3.begin(), vec3.end());
      expect(ret1).toBeFalsy();
      expect(ret2).toBeTruthy();
    });
});
