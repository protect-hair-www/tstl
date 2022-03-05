/*
 * @Author: hzheyuan
 * @Date: 2022-03-05 09:50:47
 * @LastEditTime: 2022-03-05 10:09:12
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/src/utils/copy.ts
 */
import {isPrimitive, getTypeOf, createInstanceOf } from './jstype'

export function copy(target, map = new WeakMap()) {
    // console.log(getTypeTag(target));
    // console.log(isPrimitive(target));
    if (isPrimitive(target)) {
        return target;
    }

    const type = getTypeOf(target);
    let cloneObject;
    if (['Object', 'Array', 'Set', 'Map'].includes(type)) {
        cloneObject = createInstanceOf(target);
    }

    // 记录已经有的key
    // 如果已经有key，则直接返回
    // 处理循环引用的问题
    if (map.get(target)) {
        return map.get(target);
    }
    target && map.set(target, cloneObject);

    if (type === 'Map') {
        target.forEach((key, value) => {
            cloneObject.set(key, value);
        });
    }

    if (type === 'Set') {
        target.forEach((key, value) => {
            cloneObject.add(value)
        });
    }

    if (['Error', 'Date'].includes(type)) {
        return new target.constructor(target);
    }

    // 如是Symbol的容器对象
    if (type === 'Symbol') {

    }

    // 正则表达式
    if (type == 'RegExp') {
        const regFlag = /\w*$/;
        // console.log(target,regFlag.exec(target));
        const res = new target.constructor(target.source, regFlag.exec(target));
        res.lastIndex = target.lastIndex;
        return res;
    }

    // 对象和数组的所以key，这里带Symbol类型
    let symbolKeys:any = Object.getOwnPropertySymbols(target);
    const keys = Object.getOwnPropertyNames(target).concat(symbolKeys);

    // console.log(keys);
    keys.forEach((key, value) => {
        cloneObject[key] = copy(target[key], map);
    });

    // 上面获取带
    Reflect.ownKeys(target).forEach(element => {
    //    console.log(element); 
    });

    // const keys = type === 'Array' ? undefined : Object.keys(target);
    // if (keys) {
    //     // object
    //     let index = 0;
    //     while (index < keys.length) {
    //         cloneObject[keys[index]] = copy(target[keys[index++]], map);
    //     }
    // } else {
    //     // 数组
    //     let index = 0;
    //     while (index < target.length) {
    //         cloneObject[index] = target[index++];
    //     }
    // }

    return cloneObject;
}