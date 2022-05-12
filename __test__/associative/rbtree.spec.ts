/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: rb tree test
 */
// import { Vector } from '../../src';
import { Tree } from '../../src/container/tree/Tree'

const tr = new Tree<number, number>();
describe('red black tree tests', () => {
    test('test insert equal', () => {
      tr.insert_equal(1, 1);
      const isRbTree = tr._verify();
      expect(isRbTree).toBeTruthy();
    })

    test('test insert equal 2', () => {
      tr.insert_equal(2, 2);
      tr.insert_equal(3, 3);
      tr.insert_equal(3, 3);
      tr.insert_equal(4, 4);
      tr.insert_equal(5, 5);
      const isRbTree = tr._verify();
      expect(isRbTree).toBeTruthy();
    })

    test('test tree size', () => {
      const size = tr.size;
      expect(size).toEqual(6);
    })

    test('test insert unique fail', () => {
      const ret = tr.insert_unique(1, 1);
      expect(ret.success).toBeFalsy();

      const isRbTree = tr._verify();
      expect(isRbTree).toBeTruthy();
    })

    test('test insert unique success', () => {
      const {iterator, success} = tr.insert_unique(6, 6);
      const isRbTree = tr._verify();
      expect(isRbTree).toBeTruthy();
      expect(success).toBeTruthy()
    })

    test('test erase ', () => {
      const iter = tr.erase(3);
      const key = iter.getKey();
      expect(key).toEqual(3);

      const isRbTree = tr._verify();
      expect(isRbTree).toBeTruthy();

      const size = tr.size;
      expect(size).toEqual(6);
    })

    test('test find', () => {
      const iter = tr.find(2);
      const key = iter.getKey();
      expect(key).toEqual(2);

      const isRbTree = tr._verify();
      expect(isRbTree).toBeTruthy();
    })

    test('test lower bound', () => {
      const iter = tr.lower_bound(3);
      const key = iter.getKey();
      expect(key).toEqual(3);

      const iter2 = tr.lower_bound(4);
      expect(iter2.getKey()).toEqual(4);

      const isRbTree = tr._verify();
      expect(isRbTree).toBeTruthy();
    })

    test('test upper bound', () => {
      const iter = tr.upper_bound(4);
      const key = iter.getKey();
      expect(key).toEqual(5);

      const isRbTree = tr._verify();
      expect(isRbTree).toBeTruthy();
    })

    test('test inorder walk', () => {
      let ret = '';
      tr.inorderWalk((v) => ret += v.getValue());
      expect(ret).toEqual('123456');
    })
});