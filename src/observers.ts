export type PromiseResult = {
  key: string;
  responseTime: number;
};
export type ObserverType = {
  onFullfilled: (result: PromiseResult) => Promise<void>;
  onRejected: (result: PromiseResult) => Promise<void>;
};

export const consoleObserver = (): ObserverType => {
  const onFullfilled = async (result: PromiseResult): Promise<void> => {
    console.log(`Fullfilled: ${result.key} in ${result.responseTime}ms`);
  };
  const onRejected = async (result: PromiseResult): Promise<void> => {
    console.log(`Rejected: ${result.key} in ${result.responseTime}ms`);
  };

  return {
    onFullfilled,
    onRejected,
  };
};
