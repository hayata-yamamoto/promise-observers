import {promiseAllWithObservers} from './src';
import { consoleObserver } from './src/observers';


const main = () => {
    const promise1 = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('promise1');
        }, 1000);
    }
    );
    const promise2 = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('promise2');
        }, 2000);
    }
    );
    const promise3 = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('promise3');
        }, 3000);
    });

    promiseAllWithObservers([{key: 'promise1', fn: promise1}, {key: 'promise2', fn: promise2}, {key: 'promise3', fn: promise3}], [consoleObserver()])
}

main();