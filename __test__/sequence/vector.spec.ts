/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: vector
 */
import { Vector } from '../../src';

const vec = new Vector<string>();
const vec2 = new Vector<string>();

const orginArray = [1, 8, 3, 6, 5, 7, 2, 4, 10, 9];
function init_test_container(arr: number[] = orginArray) {
  return new Vector<number>(arr);
}

const traverseCntr = (cntr: any, desc?: string) => {
  let begin = cntr.begin(), str: string[] = []
  for (let item of begin) {
    str.push(`${item}`);
  }
  return str.join(" ");
}

describe('vector datastruct', () => {
  // test('test list constructor', () => {
  //   const vec = init_test_container();
  //   const list = new List<number>(vec.begin(), vec.end());
  //   const ret = traverseCntr(list);
  //   expect(ret).toEqual('1 8 3 6 5 7 2 4 10 9');
  // })

  test('test vector size', () => {
    const empty = vec.empty();
    expect(empty).toBeTruthy();

    const size = vec.size();
    expect(size).toEqual(0);
  })

  test('test vector push', () => {
    vec.push_back('1')
    vec.push_back('2')
    vec.push_back('3')
    vec.push_back('4')
    vec.push_back('5')

    const ret = traverseCntr(vec);
    expect(ret).toEqual('1 2 3 4 5');

    const empty = vec.empty();
    expect(empty).toBeFalsy();

    const size = vec.size();
    expect(size).toEqual(5);
  })

  test('test vector accessor', () => {
    const front = vec.front();
    const back = vec.back();
    expect(front).toEqual('1');
    expect(back).toEqual('5');
  })

  test('test vector insert', () => {
    let itr = vec.begin()
    itr.next()
    vec.insert(itr, '5')
    expect(traverseCntr(vec)).toEqual('1 5 2 3 4 5');

    vec.insert(vec.end(), '2')
    expect(traverseCntr(vec)).toEqual('1 5 2 3 4 5 2');

    itr = vec.begin()
    itr.next(); itr.next();
    vec.insert(itr, 5, '7')
    expect(traverseCntr(vec)).toEqual('1 5 7 7 7 7 7 2 3 4 5 2');

    itr = vec.begin()
    itr.next()
    vec.insert(itr, vec.begin(), vec.end())
    expect(traverseCntr(vec)).toEqual('1 1 5 7 7 7 7 7 2 3 4 5 2 5 7 7 7 7 7 2 3 4 5 2');
  })

  test('test vector erase', () => {
    vec.erase(vec.begin())
    expect(traverseCntr(vec)).toEqual('1 5 7 7 7 7 7 2 3 4 5 2 5 7 7 7 7 7 2 3 4 5 2');
  })

  test('test vector resize', () => {
    vec.resize(10, '1')
    expect(traverseCntr(vec)).toEqual('1 5 7 7 7 7 7 2 3 4');

    vec.resize(15, '1')
    expect(traverseCntr(vec)).toEqual('1 5 7 7 7 7 7 2 3 4 1 1 1 1 1');

    vec.resize(5, '5')
    expect(traverseCntr(vec)).toEqual('1 5 7 7 7');
  })

  test('test vector assign', () => {
    vec.assign(6, '5')
    expect(traverseCntr(vec)).toEqual('5 5 5 5 5 5');

    let arr = ['1', '2', '4', '3']
    vec.assign(arr)
    expect(traverseCntr(vec)).toEqual('1 2 4 3');
  })

  test('test vec assign with other', () => {
    vec2.push_back('3')
    vec2.push_back('5')
    vec2.push_back('2')

    vec.assign(vec2.begin(), vec2.end())
    expect(traverseCntr(vec)).toEqual('3 5 2');
  })

  test('test vec swap', () => {
    vec2.clear()
    vec2.push_back('8')
    vec2.push_back('9')
    vec2.push_back('10')
    vec.swap(vec2)

    expect(traverseCntr(vec)).toEqual('8 9 10');
    expect(traverseCntr(vec2)).toEqual('3 5 2');
  })
})

