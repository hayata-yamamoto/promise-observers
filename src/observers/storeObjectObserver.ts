import * as Async from 'async'

import { type ObserverType } from './types'
import { type PromiseResult } from '../types'

type StoreObject = PromiseResult[]
type StoreObjectObserverVariables = { initialState?: StoreObject }
export const storeObjectObserver = (
  variables: StoreObjectObserverVariables
): ObserverType => {
  const { initialState = [] } = variables
  const queue = Async.queue((task: PromiseResult, callback: () => void) => {
    console.debug(`Writing to file: ${task.key}`)
    updateObject(task)
    callback()
  })

  const updateObject = (result: PromiseResult): void => {
    initialState.push(result)
  }

  const onFullfilled = async (result: PromiseResult): Promise<void> => {
    await queue.push(result)
  }
  const onRejected = async (result: PromiseResult): Promise<void> => {
    await queue.push(result)
  }
  return { onFullfilled, onRejected }
}

export default storeObjectObserver
