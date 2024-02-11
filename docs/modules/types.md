[@hayata-yamamoto/promise-observers](../README.md) / [Exports](../modules.md) / types

# Module: types

## Table of contents

### Type Aliases

- [ObservableType](types.md#observabletype)
- [PromiseResult](types.md#promiseresult)

## Type Aliases

### ObservableType

Ƭ **ObservableType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `notifyAsFullfilled` | (`ret`: [`PromiseResult`](types.md#promiseresult)) => `void` |
| `notifyAsRejected` | (`ret`: [`PromiseResult`](types.md#promiseresult)) => `void` |
| `off` | (`observer`: [`ObserverType`](observers_types.md#observertype)) => `void` |
| `on` | (`observer`: [`ObserverType`](observers_types.md#observertype)) => `void` |

#### Defined in

[types.ts:8](https://github.com/hayata-yamamoto/promise-observers/blob/d1c3c95/src/types.ts#L8)

___

### PromiseResult

Ƭ **PromiseResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `responseTime` | `number` |

#### Defined in

[types.ts:3](https://github.com/hayata-yamamoto/promise-observers/blob/d1c3c95/src/types.ts#L3)
