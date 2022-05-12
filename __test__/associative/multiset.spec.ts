/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: multiset(tree set) 
 */
// import { Vector } from '../../src';
import { MultiSet } from '../../src/container/associative/multiset'
const set = new MultiSet<number>();

describe('set datastruct', () => {
  test('test set empty', () => {
    const size = set.size();
    const empty = set.empty()
    expect(size).toEqual(0);
    expect(empty).toBeTruthy();
  })

  test('test set insert', () => {
    set.insert(1);
    set.insert(2);
    set.insert(3);
    set.insert(4);
    set.insert(5);
    const size = set.size();
    expect(size).toEqual(5);
  })

  test('test set insert multi key', () => {
    set.insert(4);
    set.insert(5);
    const size = set.size();
    expect(size).toEqual(7);
  })

  test('test set not empty', () => {
    const empty = set.empty()
    expect(empty).toBeFalsy();
  })

  test('test erase key of', () => {
    const ret = set.erase(2);
    expect(ret).toEqual(2);

    const nokey = set.erase(6);
    expect(nokey).toBeFalsy();
  })

  test('test find key of', () => {
    const iter = set.find(3);
    const key = iter.getKey();
    expect(key).toEqual(3);

    const nokey = set.find(6);
    expect(nokey).toBeTruthy();
  })

  test('test lower bound', () => {
    const iter = set.lower_bound(2);
    const key = iter.getKey();
    expect(key).toEqual(3);

    const iter2 = set.lower_bound(4);
    expect(iter2.getKey()).toEqual(4);
  })

  test('test upper bound', () => {
    const iter = set.upper_bound(4);
    const key = iter.getKey();
    expect(key).toEqual(5);
  })

  test('test count of key', () => {
    const cout5 = set.count(5);
    expect(cout5).toEqual(2);

    const cout6 = set.count(6);
    expect(cout6).toEqual(0);
  })
})