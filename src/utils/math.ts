/*
 * @Author: hzheyuan
 * @Date: 2022-03-26 18:14:08
 * @LastEditTime: 2022-05-07 15:42:15
 * @LastEditors: kalai
 * @Description: 
 * @FilePath: \tstl\src\utils\math.ts
 */
/**
 * @description: 2^k = n k的上界
 * @param {number} n
 * @return {*}
 */
export function lg(n: number) {
    let k
    for(k = 0; n !== 1; n >>= 1) ++k;
    return k;
}
