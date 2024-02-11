import { type PromiseResult } from '../types'

export type ObserverType = {
  onFullfilled: (result: PromiseResult) => Promise<void>
  onRejected: (result: PromiseResult) => Promise<void>
}
