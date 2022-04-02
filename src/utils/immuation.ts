/*
 * @Author: hzheyuan
 * @Date: 2022-04-02 11:14:33
 * @LastEditTime: 2022-04-02 17:53:44
 * @LastEditors: hzheyuan
 * @Description: tiny immuable data implemetation for iterator
 * implemetation ref immer.js: https://github.com/immerjs/immer
 * this is a tiny implemetation, just use to immutable the object type for iterator
 * @FilePath: \tstl\src\utils\immuation.ts
 */
import { isMap, isSet, isPlainObject, is, isFrozen } from './jstype'
const hasSymbol = typeof Symbol !== "undefined" && typeof Symbol("x") === "symbol"
const DRAFT_STATE: unique symbol = hasSymbol ? Symbol.for("draft_data") : ("__$draft_data" as any)
const DRAFTABLE: unique symbol = hasSymbol ? Symbol.for("draftable") : ("__$draftable" as any)
type Drafted<Base = any, T extends ProxyObj = ProxyObj> = { [DRAFT_STATE]: T } & Base

interface InnerBaseObj {
    _parent?: any,
    _scope?: any,
    _modified: boolean
    _finalized: boolean
}

interface ProxyBaseObj extends InnerBaseObj {
    _assigned: any,
    _parent?: any,
    _revoke(): void
}

interface ProxyObj extends ProxyBaseObj {
    _base: any,
    _copy: any,
    _draft: Drafted<Object, ProxyObj>
}

export function isDraftable(value: any): boolean {
    if (!value) return false
    return (
        isPlainObject(value) ||
        Array.isArray(value) ||
        !!value[DRAFTABLE] ||
        !!value.constructor[DRAFTABLE] ||
        isMap(value) ||
        isSet(value)
    )
}

function getLatestVal(obj: ProxyObj) {
    return obj._copy || obj._base
}

function peek(draft, prop) {
    const state = draft[DRAFT_STATE]
    const desc = Reflect.getOwnPropertyDescriptor(
        state ? getLatestVal(state) : draft,
        prop
    )
    return desc && desc.value
}

export const assign = Object.assign || ((target, ...overrides) => {
    overrides.forEach(override =>
        Object.keys(override).forEach(key => (target[key] = override[key]))
    )
    return target
})

function shallowCopy(obj) {
    if (Array.isArray(obj)) return obj.slice()
    const clone = Object.create(Object.getPrototypeOf(obj))

    Reflect.ownKeys(obj).forEach(key => {
        if (key === DRAFT_STATE) return
        const desc = Object.getOwnPropertyDescriptor(obj, key)
        let { value } = desc!
        if (desc?.enumerable) {
            clone[key] = value
        } else {
            Object.defineProperty(clone, key, {
                value, writable: true, configurable: true
            })
        }
    })
    return clone;
}

function markChanged(state) {
    if (!state._modified) {
        state._modified = true
        const { _base, _draft, _parent } = state
        const copy = shallowCopy(_base)
        // assign(copy, _draft)
        state._draft = null
        state._copy = copy
        if (_parent) {
            markChanged(_parent)
        }
    }
}

function createProxy<T extends Object>(base: T, parent?: any) {
    const state: ProxyObj = {
        _scope: parent,
        _modified: false,
        _finalized: false,
        _assigned: {},
        _parent: parent,
        _base: base,
        _copy: null,
        _draft: null as any,
        _revoke: null as any
    }

    let target: T = state as any
    let traps: ProxyHandler<object> = objectTraps
    const { revoke, proxy } = Proxy.revocable(target, traps);
    state._draft = proxy as any
    state._revoke = revoke
    return proxy as any
}

const objectTraps: ProxyHandler<ProxyObj> = {
    get(state, prop) {
        // console.log('get prop @@@@@@@@@@@@', state, prop)
        if (prop === DRAFT_STATE) return state
        let { _draft } = state

        if (!state._modified && Object.prototype.hasOwnProperty.call(_draft, prop)) {
            return _draft[prop]
        }

        const source = getLatestVal(state)
        const value = source[prop]
        if (state._finalized || !isDraftable(value)) {
            return value
        }

        if (state._modified) {
            if (value !== peek(state._base, prop)) return value
            _draft = state._copy
        }
        return (_draft[prop] = createProxy(value, state))
    },
    set(state, prop, value) {
        // console.log('set prop @@@@@@@@@@@@', state, prop, value)
        if (!state._modified) {
            const baseVal = peek(state._base, prop)
            const isUnchanged = value
                ? is(baseVal, value) || value === state._draft[prop]
                : is(baseVal, value) && prop in state._base
            if (isUnchanged) return true
            markChanged(state)
        }
        state._assigned[prop] = true
        state._copy[prop] = value
        return true
    }
}

function finalizeProperty(targetObject: any, prop: any, childVal: any) {
    if(isDraftable(childVal)) {
        const res = finalize(childVal)
        targetObject[prop] = res
    }
    if(isDraftable(childVal) && !isFrozen(childVal)) {
        finalize(childVal)
    }
}

function finalize(val: any) {
    if(isFrozen(val)) return val
    const data = val[DRAFT_STATE]
    if(!data) {
        Object.keys(val).forEach((key, childVal) => {
            finalizeProperty(val, key, val[key])
        });
        return val
    }
    if(!data._modified) {
        return data._base
    }
    if(!data._finalized) {
        data._finalized = true
        const result = data._copy
        // console.log(result, 'zzz', result.ownKeys)
        Reflect.ownKeys(result).forEach((key, childVal) => {
            finalizeProperty(result, key, result[key])
        });
    }
    return data._copy
}

function createDataFromProxy(proxy: any) {
    return finalize(proxy)
}

export function immCreator(base: any, recipe: (data: any) => any) {
    const proxy = createProxy(base)
    recipe(proxy)
    return createDataFromProxy(proxy)
}