/*
 * @Author: hzheyuan
 * @Date: 2022-03-24 09:49:39
 * @LastEditTime: 2022-03-24 18:56:54
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\__test__\algorithms\none_modifying.spec.ts
 */
import { Vector } from '../../src';
import { all_of, any_of, none_of } from '../../src';
import { for_each } from '../../src';
import { find, find_if, find_if_not, find_end, find_first_of, adjacent_find } from '../../src';
import { count, mismatch, equal, is_premutation, search, search_n } from '../../src/'

const orginArray = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6];
function init_test_container() {
    return new Vector<number>(orginArray);
}

describe('none modifying algorithms', () => {
    let cotr: Vector<number>;
    let begin, end;
    beforeAll(async () => {
        cotr = init_test_container()
        begin = cotr.begin(); end = cotr.end();
    })

    test('all elements <= 5', () => {
        let r = all_of<number>(begin, end, (v) => v <= 12);
        expect(r).toBeTruthy();
    })

    test('any elements <= 5', () => {
        let r = any_of<number>(begin, end, (v) => v <= 5);
        expect(r).toBeTruthy();
    })

    test('no element > 5', () => {
        let r = none_of<number>(begin, end, (v) => v > 12);
        expect(r).toBeTruthy();
    })

    test('for each element do of', () => {
        // for_each<number>(begin, end, (v) => {
        //     expect.arrayContaining[v];
        // });
        // expect(cotr).toBeTruthy();
    })

    test('find first element === 2', () => {
        let r1 = find<number>(begin, end, 2);
        let r2 = find<number>(begin, end, (v) => v > 2);
        expect(r1.value).toEqual(2);
        expect(r2.value).toEqual(3);
    })

    test('find first element which > 2', () => {
        let r = find_if<number>(begin, end, (v) => v > 2);
        expect(r.value).toEqual(3);
    })

    test('find first element which not smaller than 2', () => {
        let r = find_if_not<number>(begin, end, (v) => v < 2);
        expect(r.value).toEqual(2);
    })

    test('find [1, 2, 3, 4, 5, 1, 2, 3, 4, 5] last occurrence subrange [1, 2, 3] position', () => {
        let test = new Vector<number>([1, 2, 3]);
        let r = find_end<number>(begin, end, test.begin(), test.end());
        expect(r.cur).toEqual(5);
    })

    // 查找某个子序列的最后一次出现点
    // 在序列一 `[first, last)` 所涵盖的区间中，查找序列二 `[first, last)` 的最后一个出现点。
    test('find [1, 2, 3, 4, 5, 1, 2, 3, 4, 5] last occurrence subrange [4, 5, 1] position', () => {
        let test = new Vector<number>([4, 5, 1]);
        let r = find_end<number>(begin, end, test.begin(), test.end(), (a, b) => {
            return a === b;
        });
        expect(r.cur).toEqual(3);
    })

    // 查找某些元素的第一次出现点 
    // 以区间 `[first2, last2)` 内的某些元素作为查找目标，寻找在 `[first1, last1)` 区间内的第一次出现地点。
    test('find [1, 2, 3, 4, 5, 1, 2, 3, 4, 5] match any element in [10, 3, 5] first position', () => {
        let test = new Vector<number>([10, 3, 5]);
        let r = find_first_of<number>(begin, end, test.begin(), test.end());
        expect(r.cur).toEqual(2);
    })

    // 查找相邻而重复的元素 `adjacent_find`
    // 对一个序列，查找相邻元素值相等的第一个元素。
    test('find [5,20,5,30,30,20,10,10,20] first occurrence of two consecutive elements equals', () => {
        let test = new Vector<number>([5,20,5,30,30,20,10,10,20]);
        let r1 = adjacent_find<number>(test.begin(), test.end());
        expect(r1.cur).toEqual(3);
        r1.next()
        let r2 = adjacent_find<number>(r1, test.end());
        expect(r2.cur).toEqual(6);
    })

    test('count of element equal to ', () => {
        let r1 = count(begin, end, 3);
        let r2 = count<number>(begin, end, (v) => v >= 4);
        expect(r1).toEqual(2);
        expect(r2).toEqual(5);
    })

    test('mismacth in two range', () => {
        let test = new Vector<number>([1,2,5,3]);
        let r1 = mismatch<number>(begin, end, test.begin());
        expect(r1[0].cur).toEqual(2);
        expect(r1[1].cur).toEqual(2);
    })

    test('test two range is equle', () => {
        let test = new Vector<number>([1,2,5,3]);
        let test2 = new Vector<number>([1,2,5,3]);
        let r1 = equal<number>(test.begin(), test.end(), test2.begin());
        expect(r1).toBeTruthy;
    })

    test('Test whether range is permutation of another', () => {
        let test = new Vector<number>([1,2,5,3]);
        let test2 = new Vector<number>([5,3,1,2]);
        // let r1 = is_premutation<number>(test.begin(), test.end(), test2.begin());
        // expect(r1).toBeTruthy;
    })

    test('Search range for subsequence', () => {
        let test2 = new Vector<number>([4, 5]);
        let r1 = search<number>(begin, end, test2.begin(), test2.end());
        expect(r1.cur).toEqual(3);
    })
})



