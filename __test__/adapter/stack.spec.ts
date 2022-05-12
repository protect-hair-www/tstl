/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description:  stack
 */
import { Vector } from '../../src';
import { Stack } from '../../src/adapter/stack'
const stk = new Stack<string>();

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

describe('stack datastruct', () => {
  test('test stack size', () => {
    const empty = stk.empty();
    expect(empty).toBeTruthy();

    const size = stk.size();
    expect(size).toEqual(0);
  })

  test('test stack push pop', () => {
    stk.push('1')
    expect(stk.top()).toEqual('1');
    
    stk.push('2')
    expect(stk.top()).toEqual('2');

    stk.push('3')
    expect(stk.top()).toEqual('3');

    stk.push('4')
    expect(stk.top()).toEqual('4');

    stk.push('5')
    expect(stk.top()).toEqual('5');

    const r1 = stk.top()
    expect(r1).toEqual('5');
    stk.pop();

    const r2 = stk.top()
    expect(r2).toEqual('4');
    stk.pop();

    const empty = stk.empty();
    expect(empty).toBeFalsy();

    const size = stk.size();
    expect(size).toEqual(3);
  })


  test('test pop to empty', () => {
    stk.pop()
    stk.pop()
    stk.pop()
    stk.pop()
    const empty = stk.empty();
    expect(empty).toBeTruthy();

    const size = stk.size();
    expect(size).toEqual(0);
  })
})
