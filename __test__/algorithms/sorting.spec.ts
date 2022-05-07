/*
 * @Author: kalai
 * @LastEditors: kalai
 * @Description: test sorting part
 * @FilePath: \tstl\__test__\algorithms\sorting.spec.ts
 */
import { Vector } from '../../src';
import { sort } from '../../src';

type Obj = { name: number; }
const orginArray = [1, 5, 3, 7, 8, 2, 4, 9, 6, 10];

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

    beforeAll(async () => {
        vec = new Vector<number>(orginArray);
        vecObjs = new Vector<Obj>();
        for(let i = 0; i < orginArray.length; ++i) {
            vecObjs.push_back({name: orginArray[i]});
        }
    })

    test('sort elements', () => {
        let begin = vec.begin(), end = vec.end();
        let r = sort(begin, end);
        expect(r).toBeTruthy();
    })
});
