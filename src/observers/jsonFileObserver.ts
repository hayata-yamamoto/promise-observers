import * as Async from 'async'
import * as fs from 'node:fs/promises'

import { type ObserverType } from './types'
import { type PromiseResult } from '../types'

export type JsonFileObserverVariables = { fileName: string }
export const jsonFileObserver = (
  variables: JsonFileObserverVariables
): ObserverType => {
  const writeJsonWrite = (result: PromiseResult): void => {
    fs.appendFile(variables.fileName, JSON.stringify(result) + '\n').catch(
      (e) => {
        console.log(e)
      }
    )
  }

  const queue = Async.queue((task: PromiseResult, callback: () => void) => {
    console.debug(`Writing to file: ${task.key}`)
    writeJsonWrite(task)
    callback()
  })

  const onFullfilled = async (result: PromiseResult): Promise<void> => {
    await queue.push(result)
  }
  const onRejected = async (result: PromiseResult): Promise<void> => {
    await queue.push(result)
  }

  return { onFullfilled, onRejected }
}

export default jsonFileObserver
