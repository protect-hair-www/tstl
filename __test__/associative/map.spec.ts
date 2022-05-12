/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: map (tree map) 
 */
// import { Vector } from '../../src';
import { Map } from '../../src/container/associative/map/'
const map = new Map<number, number>();

describe('set datastruct', () => {
  test('test set empty', () => {
    const size = map.size();
    const empty = map.empty();
    expect(size).toEqual(0);
    expect(empty).toBeTruthy();
  })

  test('test map insert', () => {
    map.insert(1, 1);
    map.insert(2, 2);
    map.insert(3, 3);
    map.insert(4, 4);
    map.insert(5, 5);
    const size = map.size();
    expect(size).toEqual(5);
  })

  test('test set not empty', () => {
    const empty = map.empty()
    expect(empty).toBeFalsy();
  })

  test('test map insert fail', () => {
    const ret = map.insert(5, 5);
    expect(ret.success).toBeFalsy();
  })

  test('test erase key of', () => {
    const ret = map.erase(2);
    expect(ret).toEqual(2);

    const nokey = map.erase(6);
    expect(nokey).toBeFalsy();
  })

  test('test find key of', () => {
    const iter = map.find(3);
    const key = iter.getKey();
    expect(key).toEqual(3);

    const nokey = map.find(6);
    expect(nokey).toBeTruthy();
  })

  test('test lower bound', () => {
    const iter = map.lower_bound(2);
    const key = iter.getKey();
    expect(key).toEqual(3);

    const iter2 = map.lower_bound(4);
    expect(iter2.getKey()).toEqual(4);
  })

  test('test upper bound', () => {
    const iter = map.upper_bound(4);
    const key = iter.getKey();
    expect(key).toEqual(5);
  })

  test('test count of key', () => {
    const cout5 = map.count(5);
    expect(cout5).toEqual(1);

    const cout6 = map.count(6);
    expect(cout6).toEqual(0);
  })
})

