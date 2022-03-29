/*
 * @Author: hzheyuan
 * @Date: 2022-03-25 17:54:41
 * @LastEditTime: 2022-03-25 17:55:42
 * @LastEditors: hzheyuan
 * @Description: assert helper function
 * @FilePath: \tstl\src\utils\assert.ts
 */
export default function assert(condition, error) {
  if (!condition) throw new Error(error);
}