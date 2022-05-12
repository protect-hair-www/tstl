/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: queue
 */
import { Vector } from '../../src';
import { less } from "../../src/functor/relational";
import { PriorityQueue } from '../../src/container/sequence/priority_queue'
const q = new PriorityQueue<number>(Vector, less, true);

const orginArray = [1, 8, 3, 6, 5, 7, 2, 4, 10, 9];
function init_test_container(arr: number[] = orginArray) {
  return new Vector<number>(arr);
}

describe('queue datastruct', () => {
  test('test queue size', () => {
    const empty = q.empty();
    expect(empty).toBeTruthy();

    const size = q.size();
    expect(size).toEqual(0);
  })

  test('test queue push pop', () => {
    q.push(10)
    expect(q.top()).toEqual(10);

    q.push(20)
    expect(q.top()).toEqual(20);

    q.push(30)
    expect(q.top()).toEqual(30);

    q.push(5)
    expect(q.top()).toEqual(30);

    q.push(15)
    expect(q.top()).toEqual(30);

    q.push(50)
    expect(q.top()).toEqual(50);

    q.pop()
    expect(q.top()).toEqual(30);

    const empty = q.empty();
    expect(empty).toBeFalsy();

    const size = q.size();
    expect(size).toEqual(5);
  })

})

