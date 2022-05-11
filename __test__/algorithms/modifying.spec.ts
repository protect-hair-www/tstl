/*
 * @Author: hzheyuan
 * @Date: 2022-02-24 21:23:09
 * @LastEditTime: 2022-05-11 15:54:06
 * @LastEditors: kalai
 * @Description: algorithms for modifying operators
 * @FilePath: \tstl\__test__\algorithms\modifying.spec.ts
 */

import { Vector } from '../../src';
import { copy, copy_n, copy_if, copy_backward, rotate } from '../../src/algorithm/modifying_sequence';
import { advance } from '../../src/iterator';

type Obj = { name: number; }
const orginArray = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6];

function getArray(vec: Vector<Obj>): number[] {
    let itr = vec.begin();
    let res: number[] = []
    while(itr.hasNext()) {
        let v: Obj = itr.value;
        res.push(v.name);
        itr.next()
    }
    return res;
}

describe('Modifying algorithms', () => {
    let vec: Vector<number>, vecObjs: Vector<Obj>;
    let begin, end;
    beforeAll(async () => {
        vec = new Vector<number>(orginArray);
        vecObjs = new Vector<Obj>();
        begin = vec.begin(); end = vec.end();
        for(let i = 0; i < orginArray.length; ++i) {
            vecObjs.push_back({name: orginArray[i]});
        }
    })

    test('Copies the elements in the range [first,last) into the range beginning at result.', () => {
        let copy_to: Vector<number> = new Vector<number>();
        copy<number>(begin, end, copy_to.begin());
        let r = copy_to.data;
        expect(r).toEqual(expect.arrayContaining(orginArray));
    })

    test('Deep copies the elements(Object) in the range [first,last) into the range beginning at result.', () => {
        let copy_to: Vector<Obj> = new Vector<Obj>();
        // deep copy
        copy<Obj>(vecObjs.begin(), vecObjs.end(), copy_to.begin(), true);
        let r = copy_to.data, t = vecObjs.data;
        expect(r).toEqual(expect.arrayContaining(t));

        // change property at position 0
        copy_to.at(0).name = 10;

        let oldVal = getArray(vecObjs), newVal = getArray(copy_to); 
        expect(oldVal).not.toEqual(expect.arrayContaining(newVal));
    })

    test('Copies the first n elements.', () => {
        let copy_to: Vector<number> = new Vector<number>();
        copy_n<number>(begin, 3, copy_to.begin());
        let r = copy_to.data;
        expect(r).toEqual(expect.arrayContaining([1, 2, 3]));
    })

    test('Copies with condition', () => {
        let copy_to: Vector<number> = new Vector<number>();
        copy_if<number>(begin, end, copy_to.begin(), (v)=> v > 2);
        let r = copy_to.data;
        expect(r).toEqual(expect.arrayContaining([3,4,5,3,4,5,6]));
    })

    test('Copy range of elements backward', () => {
        let vec = new Vector<number>([1, 2, 3, 4, 5]);
        let vec1 = new Vector<number>([1, 2, 3, 4]);
        copy_backward<number>(vec.begin(), vec.end(), vec1.end());
        let r = vec1.data;
        expect(r).toEqual(expect.arrayContaining([2, 3, 4, 5]));
    })

    test('Rotate range of elements', () => {
        let vec = new Vector<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        let mid = vec.begin();
        advance(mid, 3);

        const first = rotate(vec.begin(), mid, vec.end());
        expect(first.cur).toEqual(6);
        const ret = vec.data.join(' ')
        expect(ret).toEqual('4 5 6 7 8 9 1 2 3');
    })

    test('Rotate range of elements bound case', () => {
        let vec = new Vector<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        let mid = vec.begin();
        advance(mid, 3);
        const first = rotate(vec.begin(), mid, mid);
        expect(first.cur).toEqual(0);

        const ret = vec.data.join(' ')
        expect(ret).toEqual('1 2 3 4 5 6 7 8 9');
    })


})