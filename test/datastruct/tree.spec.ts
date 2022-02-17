/*
 * @Author: hzheyuan
 * @Date: 2022-12-20 11:02:10
 * @LastEditTime: 2022-02-17 16:47:59
 * @LastEditors: hzheyuan
 * @Description: 歌词基础数据结构Treap测试
 * @FilePath: \tstl\test\datastruct\tree.spec.ts
 */
import { Tree } from '../../src/container/tree/Tree';
const array = [1, 5, 3, 2, 4, 8, 6];

describe("Treap", () => {
    const t = new Tree<number, number>();
    // array.forEach(key => t.(1, key));

    // 插入
    const insertSpy = jest.spyOn(t, 'insert');
    // describe('.insert', () => {
    //     test("insert is a function", () => {
    //         expect(typeof t.insert).toBe("function");
    //     })
    //     test("insert a node in treap", () => {
    //         expect(t.insert({val: 1})).toBeUndefined();
    //         expect(insertSpy).toHaveBeenCalledWith({val: 1});
    //     })
    //     insertSpy.mockClear();
    // })
})