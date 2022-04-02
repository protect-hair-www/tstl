/*
 * @Author: hzheyuan
 * @Date: 2022-03-05 09:51:39
 * @LastEditTime: 2022-04-02 17:14:08
 * @LastEditors: hzheyuan
 * @Description:
 * @FilePath: \tstl\src\utils\jstype.ts
 */

const hasMap = typeof Map !== "undefined"
const hasSet = typeof Set !== "undefined"
const objectCtorString = Object.prototype.constructor.toString()

// 获取实例类型
export function getTypeOf(target) {
  const tn = Object.prototype.toString.call(target).match(/\s([a-z|A-Z]+)/)
  return tn ? tn[1] : 'Null'
}

export function isPrimitive(target) {
  // 原始类型
  const primitiveTypes = ['Undefined', 'Boolean', 'String', 'Symbol', 'Number', 'BigInt', 'Null'] // symbol包装类问题
  return primitiveTypes.includes(getTypeOf(target))
}

export function createInstanceOf(target) {
  return new target.constructor()
}

export function isMap(target: any): target is Map<any, any> {
	return hasMap && target instanceof Map
}

export function isSet(target: any): target is Set<any> {
	return hasSet && target instanceof Set
}

export function isPlainObject(value: any): boolean {
	if (!value || typeof value !== "object") return false
	const proto = Object.getPrototypeOf(value)
	if (proto === null) return true
	const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor
	if (Ctor === Object) return true
	return (typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString)
}

// https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
export function is(x: any, y: any): boolean {
  // SameValue algorithm
  if (x === y) { // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

export function isFrozen(obj: any): boolean {
	if (obj == null || typeof obj !== "object") return true
	// See #600, IE dies on non-objects in Object.isFrozen
	return Object.isFrozen(obj)
}