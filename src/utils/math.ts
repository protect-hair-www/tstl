/*
 * @Author: hzheyuan
 * @Date: 2022-03-26 18:14:08
 * @LastEditTime: 2022-03-26 18:14:08
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/utils/math.ts
 */
export function lg(n: number) {
    let k
    for(k = 0; n !== 1; n >>= 1) ++k;
    return k;
}