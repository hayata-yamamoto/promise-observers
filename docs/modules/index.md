[@hayata-yamamoto/promise-observers](../README.md) / [Exports](../modules.md) / index

# Module: index

## Table of contents

### Functions

- [promiseAllWithObservers](index.md#promiseallwithobservers)

## Functions

### promiseAllWithObservers

▸ **promiseAllWithObservers**\<`T`\>(`promises`, `observers`): `Promise`\<`T`[]\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `promises` | \{ `fn`: () => `Promise`\<`T`\> ; `key`: `string`  }[] |
| `observers` | [`ObserverType`](observers_types.md#observertype)[] |

#### Returns

`Promise`\<`T`[]\>

#### Defined in

[index.ts:56](https://github.com/hayata-yamamoto/promise-observers/blob/d1c3c95/src/index.ts#L56)
