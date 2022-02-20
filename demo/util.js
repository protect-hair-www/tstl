/*
 * @Author: hzheyuan
 * @Date: 2022-02-20 15:06:15
 * @LastEditTime: 2022-02-20 15:07:29
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/demo/util.js
 */
export function randomNum(low, high) {
    const num = Math.floor(Math.random() * (high - low) + low);
    return num;
}