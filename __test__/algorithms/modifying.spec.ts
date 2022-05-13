/*
 * @Author: hzheyuan
 * @Date: 2022-02-24 21:23:09
 * @LastEditTime: 2022-05-13 18:01:52
 * @LastEditors: kalai
 * @Description: algorithms for modifying operators
 * @FilePath: \tstl\__test__\algorithms\modifying.spec.ts
 */

import { Vector } from '../../src';
import { copy, copy_n, copy_if, copy_backward,
swap, swap_range, transform,
replace, replace_if, replace_copy, 
remove, remove_if, remove_copy, remove_copy_if, 
fill, fill_n, generate, generate_n,
unique, unique_copy, reverse, reverse_copy,
rotate, rotate_copy,
random_shuffle, shuffle
} from '../../src/algorithm/modifying_sequence';
import { advance, distance } from '../../src/iterator';

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
        expect(r.join(' ')).toEqual('1 2 3');
    })

    test('Copies with condition', () => {
        let copy_to: Vector<number> = new Vector<number>();
        copy_if<number>(begin, end, copy_to.begin(), (v)=> v > 2);
        let r = copy_to.data;
        expect(r.join(' ')).toEqual('3 4 5 3 4 5 6');
    })

    test('Copy range of elements backward', () => {
        let vec = new Vector<number>([1, 2, 3, 4, 5]);
        let vec1 = new Vector<number>([1, 2, 3, 4]);
        copy_backward<number>(vec.begin(), vec.end(), vec1.end());
        let r = vec1.data;
        expect(r.join(' ')).toEqual('2 3 4 5');
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

    test('test ranges swap', () => {
        let vec1 = new Vector<number>([1, 1, 1, 1, 1])
        let vec2 = new Vector<number>([3, 3, 3, 3, 3])
        let begin = vec1.begin(), end = vec1.end();
        begin.next(); end.prev();
        swap_range(begin, end, vec2.begin())        
        const ret1 = vec1.data.join(' ')
        expect(ret1).toEqual('1 3 3 3 1')

        const ret2 = vec2.data.join(' ')
        expect(ret2).toEqual('1 1 1 3 3')
    })

    test('test ranges swap bound case', () => {
        let vec1 = new Vector<number>([1, 1, 1, 1, 1])
        let vec2 = new Vector<number>([3, 3])
        let begin = vec1.begin(), end = vec1.end();
        begin.next(); end.prev();
        swap_range(begin, end, vec2.begin())        
        const ret1 = vec1.data.join(' ')
        expect(ret1).toEqual('1 3 3 1 1')

        const ret2 = vec2.data.join(' ')
        expect(ret2).toEqual('1 1')
    })

    test('test transform range', () => {
        let vec1 = new Vector<number>([1, 2, 3, 4, 5])
        let vec2 = new Vector<number>(vec1)
        transform(vec1.begin(), vec1.end(), vec2.begin(), (v) => v + 1);
        const ret2 = vec2.data.join(' ')
        expect(ret2).toEqual('2 3 4 5 6')

        transform(vec1.begin(), vec1.end(), vec2.begin(), vec1.begin(), (x, y) => x + y);
        const ret1 = vec1.data.join(' ')
        expect(ret1).toEqual('3 5 7 9 11')
    })

    test('test replace value in range', () => {
        let vec1 = new Vector<number>([1, 2, 3, 2, 4, 5])
        replace(vec1.begin(), vec1.end(), 2, 100);
        const ret1 = vec1.data.join(' ')
        expect(ret1).toEqual('1 100 3 100 4 5')

        let vec2 = new Vector<number>([1, 2, 3, 2, 4, 5])
        replace(vec2.begin(), vec2.end(), (v) => v > 2, 100);
        expect(vec2.data.join(' ')).toEqual('1 2 100 2 100 100')
    })

    test('test replace copy value in range', () => {
        let vec1 = new Vector<number>([1, 2, 3, 2, 4, 5])
        let vec2 = new Vector<number>([0, 0, 0, 0, 0])

        replace_copy(vec1.begin(), vec1.end(), vec2.begin(), 2, 100)
        expect(vec1.data.join(' ')).toEqual('1 2 3 2 4 5')
        expect(vec2.data.join(' ')).toEqual('1 100 3 100 4 5')

        let vec3 = new Vector<number>([0, 0, 0, 0, 0, 0])
        replace_copy(vec1.begin(), vec1.end(), vec3.begin(), (v) => v > 2, 100)
        expect(vec3.data.join(' ')).toEqual('1 2 100 2 100 100')
    })

    test('test fill range with value', () => {
        let vec1 = new Vector<number>()
        vec1.assign(5)
        fill(vec1.begin(), vec1.end(), 5)
        expect(vec1.data.join(' ')).toEqual('5 5 5 5 5')

        vec1.assign(8, 0)
        fill(vec1.begin().increment(1), vec1.begin().increment(3), 5)
        expect(vec1.data.join(' ')).toEqual('0 5 5 0 0 0 0 0')
    })

    test('test fill number of n value', () => {
        let vec1 = new Vector<number>()
        vec1.assign(5)
        fill_n(vec1.begin(), 2, 5)
        expect(vec1.data.join(' ')).toEqual('5 5 0 0 0')

        fill_n(vec1.begin(), 6, 5)
        expect(vec1.data.join(' ')).toEqual('5 5 5 5 5')
    })

    test('test generate values for range with function', () => {
        let vec1 = new Vector<number>()
        vec1.assign(5, 1)
        generate(vec1.begin(), vec1.end(), idx => idx + 10)
        expect(vec1.data.join(' ')).toEqual('10 11 12 13 14')
    })

    test('test generate number of n values for range with function', () => {
        let vec1 = new Vector<number>()
        vec1.assign(5, 1)
        generate_n(vec1.begin(), 8, idx => idx + 10)
        expect(vec1.data.join(' ')).toEqual('10 11 12 13 14 15 16 17')
    })

    test('test remove value from range', () => {
        let vec1 = new Vector<number>([1, 2, 3, 4, 5])
        remove(vec1.begin(), vec.begin().increment(2), 2);
        // expect(vec1.data.join(' ')).toEqual('10 11 12 13 14 15 16 17')
    })

    test('test unique copy of range', () => {
        let vec1 = new Vector<number>([10, 20, 20, 20, 30, 30, 20, 20, 10])
        let vec2 = new Vector<number>();

        unique_copy(vec1.begin(), vec1.end(), vec2.begin());
        expect(vec2.data.join(' ')).toEqual('10 20 30 20 10')
    })

    test('test unique of range', () => {
        let vec1 = new Vector<number>([10, 20, 20, 20, 30, 30, 20, 20, 10])
        let iter = unique(vec1.begin(), vec1.end());
        expect(iter.cur).toEqual(5);
        expect(vec1.data.join(' ')).toEqual('10 20 30 20 10 30 20 20 10')
    })

    test('test range reverse', () => {
        let vec1 = new Vector<number>([10, 20, 20, 20, 30, 30, 20, 20, 10])
        reverse(vec1.begin(), vec1.end());
        expect(vec1.data.join(' ')).toEqual('10 20 20 30 30 20 20 20 10')
    })

    test('test random shuffle', () => {
        let vec1 = new Vector<number>([1, 2, 3, 4, 5, 6, 7, 8, 9])
        random_shuffle(vec1.begin(), vec1.end());
        expect(vec1.data.join(' ')).toEqual('10 20 20 30 30 20 20 20 10')
    })
})