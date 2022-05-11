
/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: merge part
 * @FilePath: \tstl\__test__\algorithms\parition.spec.ts
 */
import { Vector } from '../../src';
import { partition, is_partitioned } from '../../src/algorithm/paritions';
import { advance } from '../../src/iterator';

const orginArray = [1, 2, 3, 3, 5, 6, 6, 7, 8, 8, 9, 10, 11];
function init_test_container(arr: number[] = orginArray) {
    return new Vector<number>(arr);
}

describe('partition algorithms', () => {
    test('test parition', () => {
      const vec = init_test_container();
      const bound = partition(vec.begin(), vec.end(), v => v % 2 === 1);
      let ret1:number[] = [], ret2: number[] = []
      for(let iter = vec.begin(); !iter.equals(bound); iter.next()) {
        ret1.push(iter.getValue());
      }

      for(let iter = bound; !iter.equals(vec.end()); iter.next()) {
        ret2.push(iter.getValue());
      }
      expect(ret1.join(' ')).toEqual('1 11 3 3 5 9 7');
      expect(ret2.join(' ')).toEqual('6 8 8 6 10 2');
    });

    test('test is paritioned', () => {
      const vec = init_test_container()
      const ret1 = is_partitioned(vec.begin(), vec.end(), v => v % 2 === 1)
      expect(ret1).toBeFalsy()

      partition(vec.begin(), vec.end(), v => v % 2 === 1)
      const ret = is_partitioned(vec.begin(), vec.end(), v => v % 2 === 1)
      expect(ret).toBeTruthy()
    });
});