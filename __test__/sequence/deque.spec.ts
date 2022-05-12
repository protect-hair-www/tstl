/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: deque
 */
import { Vector } from '../../src';
import { Deque } from '../../src/container/sequence/deque'

const deq = new Deque<string>();
const deq2 = new Deque<string>();

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

describe('deque datastruct', () => {
  // test('test list constructor', () => {
  //   const vec = init_test_container();
  //   const list = new List<number>(vec.begin(), vec.end());
  //   const ret = traverseCntr(list);
  //   expect(ret).toEqual('1 8 3 6 5 7 2 4 10 9');
  // })

  test('test deque size', () => {
    const empty = deq.empty();
    expect(empty).toBeTruthy();

    const size = deq.size();
    expect(size).toEqual(0);
  })

  test('test deque push', () => {
    deq.push_back('1')
    deq.push_back('2')
    deq.push_back('3')
    deq.push_back('4')
    deq.push_back('5')

    const ret = traverseCntr(deq);
    expect(ret).toEqual('1 2 3 4 5');

    const empty = deq.empty();
    expect(empty).toBeFalsy();

    const size = deq.size();
    expect(size).toEqual(5);
  })

  test('test deque accessor', () => {
    const front = deq.front();
    const back = deq.back();
    expect(front).toEqual('1');
    expect(back).toEqual('5');
  })

  test('test deque insert', () => {
    let itr = deq.begin()
    itr.next()
    deq.insert(itr, '5')
    expect(traverseCntr(deq)).toEqual('1 5 2 3 4 5');

    deq.insert(deq.end(), '2')
    expect(traverseCntr(deq)).toEqual('1 5 2 3 4 5 2');

    itr = deq.begin()
    itr.next(); itr.next();
    deq.insert(itr, 5, '7')
    expect(traverseCntr(deq)).toEqual('1 5 7 7 7 7 7 2 3 4 5 2');

    itr = deq.begin()
    itr.next()
    deq.insert(itr, deq.begin(), deq.end())
    expect(traverseCntr(deq)).toEqual('1 1 5 7 7 7 7 7 2 3 4 5 2 5 7 7 7 7 7 2 3 4 5 2');
  })

  test('test deque erase', () => {
    deq.erase(deq.begin())
    expect(traverseCntr(deq)).toEqual('1 5 7 7 7 7 7 2 3 4 5 2 5 7 7 7 7 7 2 3 4 5 2');
  })

  test('test deque resize', () => {
    deq.resize(10, '1')
    expect(traverseCntr(deq)).toEqual('1 5 7 7 7 7 7 2 3 4');

    deq.resize(15, '1')
    expect(traverseCntr(deq)).toEqual('1 5 7 7 7 7 7 2 3 4 1 1 1 1 1');

    deq.resize(5, '5')
    expect(traverseCntr(deq)).toEqual('1 5 7 7 7');
  })

  test('test deque assign', () => {
    deq.assign(6, '5')
    expect(traverseCntr(deq)).toEqual('5 5 5 5 5 5');

    let arr = ['1', '2', '4', '3']
    deq.assign(arr)
    expect(traverseCntr(deq)).toEqual('1 2 4 3');
  })

  test('test deque assign with other', () => {
    deq2.push_back('3')
    deq2.push_back('5')
    deq2.push_back('2')

    deq.assign(deq2.begin(), deq2.end())
    expect(traverseCntr(deq)).toEqual('3 5 2');
  })

  test('test deque swap', () => {
    deq2.clear()
    deq2.push_back('8')
    deq2.push_back('9')
    deq2.push_back('10')
    deq.swap(deq2)

    expect(traverseCntr(deq)).toEqual('8 9 10');
    expect(traverseCntr(deq2)).toEqual('3 5 2');
  })
})
