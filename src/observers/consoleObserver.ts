import { type ObserverType } from './types'
import { type PromiseResult } from '../types'

export const consoleObserver = (): ObserverType => {
  const onFullfilled = async (result: PromiseResult): Promise<void> => {
    console.log(`Fullfilled: ${result.key} in ${result.responseTime}ms`)
  }
  const onRejected = async (result: PromiseResult): Promise<void> => {
    console.log(`Rejected: ${result.key} in ${result.responseTime}ms`)
  }
  return { onFullfilled, onRejected }
}

export default consoleObserver
