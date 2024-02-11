import { type ObserverType } from './observers'

export type PromiseResult = {
  key: string
  responseTime: number
}

export type ObservableType = {
  on: (observer: ObserverType) => void
  off: (observer: ObserverType) => void
  notifyAsFullfilled: (ret: PromiseResult) => void
  notifyAsRejected: (ret: PromiseResult) => void
}
