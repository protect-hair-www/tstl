/*
 * @Author: hzheyuan
 * @Date: 2022-03-05 09:51:39
 * @LastEditTime: 2022-03-05 09:56:47
 * @LastEditors: hzheyuan
 * @Description:
 * @FilePath: /tstl/src/utils/jstype.ts
 */

// 获取实例类型
export function getTypeOf(target) {
  if (target === window) {
    return 'Global'
  } else {
    const tn = Object.prototype.toString.call(target).match(/\s([a-z|A-Z]+)/)
    return tn ? tn[1] : 'Null'
  }
}

export function isPrimitive(target) {
  // 原始类型
  const primitiveTypes = ['Undefined', 'Boolean', 'String', 'Symbol', 'Number', 'BigInt', 'Null'] // symbol包装类问题
  return primitiveTypes.includes(getTypeOf(target))
}

export function createInstanceOf(target) {
  return new target.constructor()
}
