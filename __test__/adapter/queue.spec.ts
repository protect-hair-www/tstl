/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: queue
 */
import { Vector } from '../../src';
import { Queue } from '../../src/adapter/queue'
const q = new Queue<string>();

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

describe('queue datastruct', () => {
  test('test queue size', () => {
    const empty = q.empty();
    expect(empty).toBeTruthy();

    const size = q.size();
    expect(size).toEqual(0);
  })

  test('test queue push pop', () => {
    q.push('1')
    expect(q.front()).toEqual('1');
    
    q.push('2')
    expect(q.front()).toEqual('1');
    expect(q.back()).toEqual('2');

    q.push('3')
    expect(q.front()).toEqual('1');
    expect(q.back()).toEqual('3');

    q.push('4')
    expect(q.front()).toEqual('1');
    expect(q.back()).toEqual('4');

    q.push('5')
    expect(q.front()).toEqual('1');
    expect(q.back()).toEqual('5');

    q.pop();
    expect(q.front()).toEqual('2');

    q.pop();
    expect(q.front()).toEqual('3');

    const empty = q.empty();
    expect(empty).toBeFalsy();

    const size = q.size();
    expect(size).toEqual(3);
  })

  test('test pop to empty', () => {
    q.pop()
    q.pop()
    q.pop()
    q.pop()
    const empty = q.empty();
    expect(empty).toBeTruthy();

    const size = q.size();
    expect(size).toEqual(0);
  })
})

