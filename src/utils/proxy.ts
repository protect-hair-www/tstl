/*
 * @Author: hzheyuan
 * @Date: 2022-03-31 10:42:20
 * @LastEditTime: 2022-04-01 15:55:20
 * @LastEditors: hzheyuan
 * @Description: test immerjs implemetation for immutable data
 * @FilePath: \tstl\src\utils\proxy.ts
 */
const hasSymbol = typeof Symbol !== "undefined" && typeof Symbol("x") === "symbol"
const hasMap = typeof Map !== "undefined"
const hasSet = typeof Set !== "undefined"
const hasProxies =
	typeof Proxy !== "undefined" &&
	typeof Proxy.revocable !== "undefined" &&
	typeof Reflect !== "undefined"
const objectCtorString = Object.prototype.constructor.toString()

const DRAFT_STATE: unique symbol = hasSymbol ? Symbol.for("immer-state") : ("__$immer_state" as any)
export const DRAFTABLE: unique symbol = hasSymbol
	? Symbol.for("immer-draftable")
	: ("__$immer_draftable" as any)

export class Nothing {
	// This lets us do `Exclude<T, Nothing>`
	// @ts-ignore
	private _!: unique symbol
}

export const NOTHING: Nothing = hasSymbol
	? Symbol.for("immer-nothing")
	: ({["immer-nothing"]: true} as any)

export type AnyObject = {[key: string]: any}
export type AnyArray = Array<any>
export type AnySet = Set<any>
export type AnyMap = Map<any, any>
export type Objectish = AnyObject | AnyArray | AnyMap | AnySet
export type ObjectishNoSet = AnyObject | AnyArray | AnyMap

export interface Patch {
	op: "replace" | "remove" | "add"
	path: (string | number)[]
	value?: any
}

export const enum Archtype {
	Object,
	Array,
	Map,
	Set
}

export function isMap(target: any): target is AnyMap {
	return hasMap && target instanceof Map
}

export function isSet(target: any): target is AnySet {
	return hasSet && target instanceof Set
}

export type PatchListener = (patches: Patch[], inversePatches: Patch[]) => void

export interface ImmerScope {
	patches_?: Patch[]
	_inversePatches?: Patch[]
	_canAutoFreeze: boolean
	_drafts: any[]
	_parent?: ImmerScope
	_patchListener?: PatchListener
	_immer: any
	_unfinalizedDrafts: number
}

export const enum ProxyType {
	ProxyObject,
	ProxyArray
}

interface ProxyBaseState extends BaseState {
	_assigned: {
		[property: string]: boolean
	}
	_parent?: ImmerState
	_revoke(): void
}

export interface ProxyObjectState extends ProxyBaseState {
	_type: ProxyType.ProxyObject
	_base: any
	_copy: any
	_draft: Drafted<AnyObject, ProxyObjectState>
}

export type ImmerState =
	| ProxyObjectState

export interface BaseState {
    _parent?: ImmerState
    _scope?:  any
    _modified: boolean
    _finalized: boolean
    _isManual: boolean
}

export type Drafted<Base = any, T extends ImmerState = ImmerState> = {
	[DRAFT_STATE]: T
} & Base

export function leaveScope(scope: ImmerScope) {
	if (scope === currentScope) {
		currentScope = scope._parent
	}
}

export function revokeScope(scope: ImmerScope) {
	leaveScope(scope)
	scope._drafts.forEach(revokeDraft)
	// @ts-ignore
	scope.drafts_ = null
}

function revokeDraft(draft: Drafted) {
	const state: ImmerState = draft[DRAFT_STATE]
	if (
		state._type === ProxyType.ProxyObject ||
		state._type === ProxyType.ProxyArray
	)
		state._revoke()
	else (state as any)._revoke = true
}

type ProxyState = ProxyObjectState
let currentScope: ImmerScope | undefined

export function getCurrentScope() {
	return currentScope!
}
export function createProxyProxy<T extends AnyObject>(base: T, parent?: ImmerState): Drafted<T, ProxyState> {
    // const isArr = Array.isArray(base)
    const state: ProxyState = {
        _type: ProxyType.ProxyObject as any,
        _scope: getCurrentScope(),
        _modified: false,
        _assigned: {},
        _finalized: false,
        _isManual: false,
        _parent: parent,
        _base: base,
        _draft: null as any,
        _copy: null,
        _revoke: null as any
    }
    let target: T = state as any
    let traps: ProxyHandler<object> = objectTraps;
    const { revoke, proxy } = Proxy.revocable(target, traps);
    state._draft = proxy as any
    state._revoke = revoke
    return proxy as any
}

function latest(state: ImmerState) {
    return state._copy || state._base
}

function readPropFromProto(state: ImmerState, source: any, prop: PropertyKey) {
	const desc = getDescriptorFromProto(source, prop)
	return desc
		? `value` in desc
			? desc.value
			: // This is a very special case, if the prop is a getter defined by the
			  // prototype, we should invoke it with the draft as context!
			  desc.get?.call(state._draft)
		: undefined
}

function getDescriptorFromProto(
	source: any,
	prop: PropertyKey
): PropertyDescriptor | undefined {
	// 'in' checks proto!
	if (!(prop in source)) return undefined
	let proto = Object.getPrototypeOf(source)
	while (proto) {
		const desc = Object.getOwnPropertyDescriptor(proto, prop)
		if (desc) return desc
		proto = Object.getPrototypeOf(proto)
	}
	return undefined
}

export function getArchtype(thing: any): Archtype {
	/* istanbul ignore next */
	const state: undefined | ImmerState = thing[DRAFT_STATE]
	return state
		? state._type > 3
			? state._type - 4 // cause Object and Array map back from 4 and 5
			: (state._type as any) // others are the same
		: Array.isArray(thing)
		? Archtype.Array
		: isMap(thing)
		? Archtype.Map
		: isSet(thing)
		? Archtype.Set
		: Archtype.Object
}

export function has(thing: any, prop: PropertyKey): boolean {
	return getArchtype(thing) === Archtype.Map
		? thing.has(prop)
		: Object.prototype.hasOwnProperty.call(thing, prop)
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

export function isPlainObject(value: any): boolean {
	if (!value || typeof value !== "object") return false
	const proto = Object.getPrototypeOf(value)
	if (proto === null) {
		return true
	}
	const Ctor =
		Object.hasOwnProperty.call(proto, "constructor") && proto.constructor

	if (Ctor === Object) return true

	return (
		typeof Ctor == "function" &&
		Function.toString.call(Ctor) === objectCtorString
	)
}

function peek(draft: Drafted, prop: PropertyKey) {
	const state = draft[DRAFT_STATE]
	const source = state ? latest(state) : draft
	return source[prop]
}


export const ownKeys: (target: AnyObject) => PropertyKey[] =
	typeof Reflect !== "undefined" && Reflect.ownKeys
		? Reflect.ownKeys
		: typeof Object.getOwnPropertySymbols !== "undefined"
		? obj =>
				Object.getOwnPropertyNames(obj).concat(
					Object.getOwnPropertySymbols(obj) as any
				)
		: /* istanbul ignore next */ Object.getOwnPropertyNames


export const getOwnPropertyDescriptors =
	Object.getOwnPropertyDescriptors ||
	function getOwnPropertyDescriptors(target: any) {
		// Polyfill needed for Hermes and IE, see https://github.com/facebook/hermes/issues/274
		const res: any = {}
		ownKeys(target).forEach(key => {
			res[key] = Object.getOwnPropertyDescriptor(target, key)
		})
		return res
	}

export function shallowCopy(base: any) {
	if (Array.isArray(base)) return Array.prototype.slice.call(base)
	const descriptors = getOwnPropertyDescriptors(base)
	delete descriptors[DRAFT_STATE as any]
	let keys = ownKeys(descriptors)
	for (let i = 0; i < keys.length; i++) {
		const key: any = keys[i]
		const desc = descriptors[key]
		if (desc.writable === false) {
			desc.writable = true
			desc.configurable = true
		}
		// like object.assign, we will read any _own_, get/set accessors. This helps in dealing
		// with libraries that trap values, like mobx or vue
		// unlike object.assign, non-enumerables will be copied as well
		if (desc.get || desc.set)
			descriptors[key] = {
				configurable: true,
				writable: true, // could live with !!desc.set as well here...
				enumerable: desc.enumerable,
				value: base[key]
			}
	}
	return Object.create(Object.getPrototypeOf(base), descriptors)
}

export function prepareCopy(state: {_base: any; _copy: any}) {
	if (!state._copy) {
		state._copy = shallowCopy(state._base)
	}
}

function is(x: any, y: any): boolean {
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

export function createProxy<T extends Objectish>(
	immer: any,
	value: T,
	parent?: ImmerState
): Drafted<T, ImmerState> {
	// precondition: createProxy should be guarded by isDraftable, so we know we can safely draft
	const draft: Drafted = createProxyProxy(value, parent)
    console.log('draft', draft)
	const scope = parent ? parent._scope : getCurrentScope()
	scope._drafts.push(draft)
	return draft
}

export function markChanged(state: ImmerState) {
	if (!state._modified) {
		state._modified = true
		if (state._parent) {
			markChanged(state._parent)
		}
	}
}


export const objectTraps: ProxyHandler<ProxyState> = {
    // read 操作
    get(state, prop) {
        console.log('proxy read handler', state, prop)
        if(prop === DRAFT_STATE) return state
        const source = latest(state)
        if(!has(source, prop)) {
            return readPropFromProto(state, source, prop)
        }
        const value = source[prop]
        if(state._finalized || !isDraftable(value)) {
            return value
        }
        // Check for existing draft in modified state.
		// Assigned values are never drafted. This catches any drafts we created, too.
        if(value === peek(state._base, prop)) {
            prepareCopy(state)
            return (state._copy![prop as any]) = createProxy(state._scope._immer, value, state)
        }
        console.log(value, 'get value');
        return value
    },
    // write 操作
    set(state: ProxyObjectState, prop: string, value) {
        console.log('proxy write handler', prop, value)
        const desc = getDescriptorFromProto(latest(state), prop)
        if(desc?.set) {
            desc.set.call(state._draft, value)
            return true
        }
        if(!state._modified) {
            const current = peek(latest(state), prop)
            console.log('xxxx', current)
            const currentState: ProxyObjectState = current?.[DRAFT_STATE]
            if(currentState && currentState._base === value) {
                state._copy![prop] = value
                state._assigned[prop] = false
                return true
            }
            if(is(value, current) && (value !== undefined || has(state._base, prop))) {
                return true
            }
            prepareCopy(state)
            markChanged(state)
        }
        if(state._copy![prop] === value && typeof value !== 'number' && (value !== undefined || prop in state._copy)) return true
        state._copy![prop] = value
        state._assigned[prop] = true
        return true
    },

    has(state, prop) {
		return prop in latest(state)
	},

	ownKeys(state) {
		return Reflect.ownKeys(latest(state))
	},
}

function createScope(
	_parent: ImmerScope | undefined,
	_immer: any 
): ImmerScope {
	return {
		_drafts: [],
		_parent,
		_immer,
		// Whenever the modified draft contains a draft from another scope, we
		// need to prevent auto-freezing so the unowned draft can be finalized.
		_canAutoFreeze: true,
		_unfinalizedDrafts: 0
	}
}

export function enterScope(immer: any) {
	return (currentScope = createScope(currentScope, immer))
}

export function isFrozen(obj: any): boolean {
	if (obj == null || typeof obj !== "object") return true
	// See #600, IE dies on non-objects in Object.isFrozen
	return Object.isFrozen(obj)
}

export function each<T extends Objectish>(
	obj: T,
	iter: (key: string | number, value: any, source: T) => void,
	enumerableOnly?: boolean
): void
export function each(obj: any, iter: any, enumerableOnly = false) {
	if (getArchtype(obj) === Archtype.Object) {
		;(enumerableOnly ? Object.keys : ownKeys)(obj).forEach(key => {
			if (!enumerableOnly || typeof key !== "symbol") iter(key, obj[key], obj)
		})
	} else {
		obj.forEach((entry: any, index: any) => iter(index, entry, obj))
	}
}

export function isDraft(value: any): boolean {
	return !!value && !!value[DRAFT_STATE]
}

export function set(thing: any, propOrOldValue: PropertyKey, value: any) {
	const t = getArchtype(thing)
	if (t === Archtype.Map) thing.set(propOrOldValue, value)
	else if (t === Archtype.Set) {
		thing.delete(propOrOldValue)
		thing.add(value)
	} else thing[propOrOldValue] = value
}

function finalizeProperty(
	rootScope: ImmerScope,
	parentState: undefined | ImmerState,
	targetObject: any,
	prop: string | number,
	childValue: any,
	rootPath?: PatchPath
) {
    if(isDraft(childValue)) {
        const path = rootPath && parentState && rootPath!.concat(prop);
        const res = finalize(rootScope, childValue, path)
        set(targetObject, prop, res)
        if(isDraft(res)) {
            rootScope._canAutoFreeze = false
        } else return
    }
    // search new objects for unfinalized drafts, Frozen objects should never contain drafts.
    if(isDraftable(childValue) && !isFrozen(childValue)) {
        finalize(rootScope, childValue)
    }
    if(!parentState || !parentState._scope._parent) {
        console.log('finalizeProperty no parent state')
    }
}
export type PatchPath = (string | number)[]
function finalize(rootScope: ImmerScope, value: any, path?: PatchPath) {
    if(isFrozen(value)) return value
    const state = value[DRAFT_STATE]
    if(!state) {
        each(value, (key, childValue) => {
            finalizeProperty(rootScope, state, value, key, childValue, path)
        }, true)
        return value
    }
    if(state._scope !== rootScope) return value
    if(!state._modified) return state._base
    if(!state._finalized) {
        state._finalized = true
        state._scope._unfinalizedDrafts--
        const result = state._copy

        each(result, (key, childValue) => {
            finalizeProperty(rootScope, state, result, key, childValue, path)
        })
    }
    return state._copy
}

export function processResult(result: any, scope: ImmerScope) {
    console.log('process result', result, scope)
	scope._unfinalizedDrafts = scope._drafts.length
	const baseDraft = scope._drafts![0]
	const isReplaced = result !== undefined && result !== baseDraft
	if (isReplaced) {
		if (baseDraft[DRAFT_STATE]._modified) {
			revokeScope(scope)
		}
		if (isDraftable(result)) {
			// Finalize the result in case it contains (or is) a subset of the draft.
			result = finalize(scope, result)
			// if (!scope.parent_) maybeFreeze(scope, result)
		}
	} else {
		// Finalize the base draft.
		result = finalize(scope, baseDraft, [])
	}
	revokeScope(scope)
	
	return result !== NOTHING ? result : undefined
}


export const produce = (base: any, recipe?: any) => {
    let result
    if(isDraftable(base)) {
        const scope = enterScope(this)
        console.log('scope', scope)
        const proxy = createProxy(this, base, undefined)
        result = recipe(proxy)
        return processResult(result, scope)
    }
}