/*
 * @Author: hzheyuan
 * @Date: 2022-03-16 14:06:27
 * @LastEditTime: 2022-03-26 14:14:01
 * @LastEditors: hzheyuan
 * @Description: any => 32 integer
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
 * https://github.com/immutable-js/immutable-js/blob/main/src/Math.js
 * @FilePath: /tstl/src/utils/hash.ts
 */
export const imul = typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ? Math.imul :
function imul(a: number, b: number) {
    a |= 0, b |= 0;
    const c = a & 0xffff, d = b & 0xffff;
    return (c * d + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0)) | 0;
}

// v8 has an optimization for storing 31-bit signed numbers.
// Values which have either 00 or 11 as the high order bits qualify.
// This function drops the highest order bit in a signed number, maintaining
// the sign bit.
export function smi(i32: number) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xbfffffff)
}