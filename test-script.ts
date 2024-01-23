import { promiseAllWithObservers } from "./src";
import { consoleObserver, jsonFileObserver } from "./src/observers";

const testConsoleObserver = () => {
  const promise1 = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("promise1");
      }, 1000);
    });
  const promise2 = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("promise2");
      }, 2000);
    });
  const promise3 = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("promise3");
      }, 3000);
    });

  try {
    promiseAllWithObservers(
      [
        { key: "promise1", fn: promise1 },
        { key: "promise2", fn: promise2 },
        { key: "promise3", fn: promise3 },
      ],
      [consoleObserver()],
    );
  } catch (e) {
    console.log(e);
  }
};

const testJsonFileObserver = () => {
  // ランダムな待ち時間のpromise を100個生成する
  const promises = Array.from(Array(100).keys()).map((i) => {
    return {
      key: `promise${i}`,
      fn: () =>
        new Promise((resolve, reject) => {
          const random = Math.floor(Math.random() * 100);
          setTimeout(() => {
            resolve(`promise${i}`);
          }, random);
        }),
    };
  });
  try {
    promiseAllWithObservers(promises, [jsonFileObserver("result.json")]);
  } catch (e) {
    console.log(e);
  }
};

const main = () => {
  testConsoleObserver();
  testJsonFileObserver();
};

main();
