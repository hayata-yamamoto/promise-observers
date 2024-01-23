import * as Async from 'async'
import * as fs from 'node:fs/promises'

export type PromiseResult = {
  key: string
  responseTime: number
}
export type ObserverType = {
  onFullfilled: (result: PromiseResult) => Promise<void>
  onRejected: (result: PromiseResult) => Promise<void>
}

export const consoleObserver = (): ObserverType => {
  const onFullfilled = async (result: PromiseResult): Promise<void> => {
    console.log(`Fullfilled: ${result.key} in ${result.responseTime}ms`)
  }
  const onRejected = async (result: PromiseResult): Promise<void> => {
    console.log(`Rejected: ${result.key} in ${result.responseTime}ms`)
  }
  return { onFullfilled, onRejected }
}

export const jsonFileObserver = (fileName: string): ObserverType => {
  const q = Async.queue((task: PromiseResult, callback: () => void) => {
    console.debug(`Writing to file: ${task.key}`)
    writeJsonWrite(task)
    callback()
  })

  const writeJsonWrite = (result: PromiseResult): void => {
    fs.appendFile(fileName, JSON.stringify(result) + '\n').catch((e) => {
      console.log(e)
    })
  }

  const onFullfilled = async (result: PromiseResult): Promise<void> => {
    await q.push(result)
  }
  const onRejected = async (result: PromiseResult): Promise<void> => {
    await q.push(result)
  }

  return { onFullfilled, onRejected }
}
