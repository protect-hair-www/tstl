/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: map (tree map) 
 */
import { Vector } from '../../src';
import { List } from '../../src/container/sequence/list'

const list = new List<string>();
const list2 = new List<string>();

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

describe('list datastruct', () => {
  // test('test list constructor', () => {
  //   const vec = init_test_container();
  //   const list = new List<number>(vec.begin(), vec.end());
  //   const ret = traverseCntr(list);
  //   expect(ret).toEqual('1 8 3 6 5 7 2 4 10 9');
  // })

  test('test list size', () => {
    const empty = list.empty();
    expect(empty).toBeTruthy();

    const size = list.size();
    expect(size).toEqual(0);
  })

  test('test list push', () => {
    list.push_back('1')
    list.push_back('2')
    list.push_back('3')
    list.push_back('4')
    list.push_back('5')
    const ret = traverseCntr(list);
    expect(ret).toEqual('1 2 3 4 5');

    const size = list.size();
    expect(size).toEqual(5);
  })

  test('test list access front', () => {
    const ret = list.front();
    expect(ret).toEqual('1');
  })

  test('test list access tail', () => {
    const ret = list.back();
    expect(ret).toEqual('5');
  })

  test('test list insert 5 at second', () => {
    let iter = list.begin();
    iter.next();
    list.insert(iter, '5');
    const eles = traverseCntr(list);
    expect(eles).toEqual('1 5 2 3 4 5');

  })

  test('test list insert to elements [20, 20] ', () => {
    let iter = list.end();
    list.insert(iter, 2, '20');
    const eles = traverseCntr(list);
    expect(eles).toEqual('1 5 2 3 4 5 20 20');
  })

  test('test list assign 5 elements of 11', () => {
    list.assign(5, '11');
    const eles = traverseCntr(list);
    expect(eles).toEqual('11 11 11 11 11');
  })

  test('test list earse at pointer', () => {
    list.erase(list.begin());
    const eles = traverseCntr(list);
    expect(eles).toEqual('11 11 11 11');
  })

  test('test list resize', () => {
    list.resize(5, '5');
    const eles = traverseCntr(list);
    expect(eles).toEqual('11 11 11 11 5');
  })

  test('test list unique', () => {
    list.push_back('4')
    list.push_back('5')
    list.push_back('5')
    list.push_back('5')
    list.unique();
    const eles = traverseCntr(list);
    expect(eles).toEqual('11 5 4 5');

    list.resize(2, '5');
    const ele2 = traverseCntr(list);
    expect(ele2).toEqual('11 5');
  })


  test('test list clear', () => {
    list.clear();
    const eles = traverseCntr(list);
    expect(eles).toEqual('');
  })

  test('test list splice', () => {
    list.push_back('1')
    list.push_back('2')
    list.push_back('3')
    list.push_back('4')
    list.push_back('5')

    list2.push_back('6')
    list2.push_back('7')
    list2.push_back('8')
    list2.push_back('9')

    let itr = list.begin()
    itr.next()
    list.splice(itr, list2)

    const ele1 = traverseCntr(list);
    const ele2 = traverseCntr(list2);

    expect(ele1).toEqual('1 6 7 8 9 2 3 4 5');
    expect(ele2).toEqual('');


    list2.splice(list2.begin(), (list as List<string>), itr)
    const ele3 = traverseCntr(list);
    const ele4 = traverseCntr(list2);

    expect(ele3).toEqual('1 6 7 8 9 3 4 5');
    expect(ele4).toEqual('2');

    itr = list.begin(); itr.next(); itr.next()
    list.splice(list.begin(), (list as List<string>), itr, list.end())
    const ele5 = traverseCntr(list)
    expect(ele5).toEqual('7 8 9 3 4 5 1 6');
  })

  test('test list remove', () => {
    list.remove('8');
    const rm8 = traverseCntr(list)
    expect(rm8).toEqual('7 9 3 4 5 1 6');

    list.remove_if((v) => v > '5')
    const rmIf = traverseCntr(list)
    expect(rmIf).toEqual('3 4 5 1');
  })

  test('test list unique mutiple', () => {
    list.push_back('6')
    list.push_back('6')
    list.push_back('7')
    list.push_back('7')
    list.push_back('7')
    list.push_back('8')
    list.push_back('8')
    list.push_back('9')

    list.unique()
    traverseCntr(list)
    const eles = traverseCntr(list)
    expect(eles).toEqual('3 4 5 1 6 7 8 9')
  })

  test('test list merge', () => {
    list.clear()

    list.push_back('1')
    list.push_back('2')
    list.push_back('3')
    list.push_back('5')

    list2.clear()
    list2.push_back('2')
    list2.push_back('3')
    list2.push_back('4')
    list2.push_back('6')
    list2.push_back('8')

    list.merge(list2)
    const eles = traverseCntr(list)
    expect(eles).toEqual('1 2 2 3 3 4 5 6 8')
  });

  test('test list swap', () => {
    list.clear()
    list.push_back('1')
    list.push_back('2')
    list.push_back('3')
    list.push_back('5')

    list2.clear()
    list2.push_back('4')
    list2.push_back('6')
    list2.push_back('8')

    list.swap(list2)
    const l1 = traverseCntr(list)
    const l2 = traverseCntr(list2)
    expect(l1).toEqual('4 6 8')
    expect(l2).toEqual('1 2 3 5')
  });

  test('test list reverse', () => {
    list.reverse()
    const eles = traverseCntr(list)
    expect(eles).toEqual('8 6 4')
  });
})