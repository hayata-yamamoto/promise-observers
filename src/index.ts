import { PromiseResult, ObserverType } from "./observers";

type ObservableType = {
  on: (observer: ObserverType) => void;
  off: (observer: ObserverType) => void;
  notifyAsFullfilled: (ret: PromiseResult) => void;
  notifyAsRejected: (ret: PromiseResult) => void;
};

const observable = (): ObservableType => {
  const observers: ObserverType[] = [];

  const on = (observer: ObserverType) => {
    observers.push(observer);
  };

  const off = (observer: ObserverType) => {
    observers.splice(observers.indexOf(observer), 1);
  };

  const notifyAsFullfilled = (ret: PromiseResult) => {
    observers.forEach((observer) => observer.onFullfilled(ret));
  };

  const notifyAsRejected = (ret: PromiseResult) => {
    observers.forEach((observer) => observer.onRejected(ret));
  };

  return {
    on,
    off,
    notifyAsFullfilled,
    notifyAsRejected,
  };
};

const capturePromiseResult = async <T>(
  observable: ObservableType,
  promise: { key: string; fn: () => Promise<T> },
): Promise<T> => {
  const startTime = Date.now();
  try {
    const ret = await promise.fn();
    const elapsed = Date.now() - startTime;
    observable.notifyAsFullfilled({ key: promise.key, responseTime: elapsed });
    return ret;
  } catch (e) {
    const elapsed = Date.now() - startTime;
    observable.notifyAsRejected({ key: promise.key, responseTime: elapsed });
    throw e;
  }
};

export const promiseAllWithObservers = async <T>(
  promises: { key: string; fn: () => Promise<T> }[],
  observers: ObserverType[],
): Promise<T[]> => {
  const _observable = observable();

  observers.forEach((observer) => _observable.on(observer));
  const ret = await Promise.all(
    promises.map((promise) => capturePromiseResult(_observable, promise)),
  );
  observers.forEach((observer) => _observable.off(observer));

  return ret;
};
