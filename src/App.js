import React, { useEffect } from 'react';
import './App.css';
class Promise {
  constructor(fn) {
      /**
       *  三种状态 
       *  pending：进行中
       *  fulfilled：已成功
       *  rejected: 已失败
       */
      this.status = 'pending';
      this.resoveList = []; // 成功后回调函数
      this.rejectList = []; // 失败后的回调函数

      fn(this.resolve.bind(this), this.reject.bind(this));
  }
  then(scb, fcb) {
      if (scb) {
          this.resoveList.push(scb);
      }
      if(fcb) {
          this.rejectList.push(fcb);
      }
      return this;
  }
  catch(cb) {
      if (cb) {
          this.rejectList.push(cb);
      }
      return this;
  }
  resolve(data) {
      if (this.status !== 'pending') return;
      this.status = 'fulfilled';
      setTimeout(() => {
          this.resoveList.forEach(s => {
              data = s(data);
          })
      })
  }
  reject(err) {
      if (this.status !== 'pending') return;
      this.status = 'rejected';
      setTimeout(() => {
          this.rejectList.forEach(f => {
              err = f(err);
          })
      })
  }
  // /**
  //  * 实现Promise.resolve
  //  * 1.参数是一个 Promise 实例, 那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
  //  * 2.如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
  // */ 
  // static resolve(data) {
  //     if (data instanceof Promise) {
  //         return data;
  //     } else {
  //         return new Promise((resolve, reject) => {
  //             resolve(data);
  //         })
  //     }
  // }
  // // 实现Promise.reject
  // static reject(err) {
  //     if (err instanceof Promise) {
  //         return err;
  //     } else {
  //         return new Promise((resolve, reject) => {
  //             reject(err);
  //         })
  //     }
  // }
  // /**
  //  * 实现Promise.all
  //  * 1. Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
  //  * 2. 返回值组成一个数组
  // */
  // static all(promises) {
  //     return new Promise((resolve, reject) => {
  //         let promiseCount = 0;
  //         let promisesLength = promises.length;
  //         let result = [];
  //         for(let i = 0; i < promises.length; i++) {
  //             // promises[i]可能不是Promise类型，可能不存在then方法，中间如果出错,直接返回错误
  //             Promise.resolve(promises[i])
  //                 .then(res => {
  //                     promiseCount++;
  //                     // 注意这是赋值应该用下标去赋值而不是用push，因为毕竟是异步的，哪个promise先完成还不一定
  //                     result[i] = res;
  //                     if(promiseCount === promisesLength) {
  //                        return resolve(result);
  //                     }
  //                 },(err) => {
  //                     return reject(err);
  //                 }
  //             )
  //         }
  //     })
  // }
  // /**
  //  * 实现Promise.race
  //  * 1. Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
  //  * 2. 返回那个率先改变的 Promise 实例的返回值
  // */
  // static race(promises) {
  //     return new Promise((resolve, reject) => {
  //         for(let i = 0; i < promises.length; i++) {
  //             Promise.resolve(promises[i])
  //                 .then(res => {
  //                     return resolve(res);
  //                 },(err) =>{
  //                     return reject(err);
  //                 }
  //             )
  //         }
  //     })
  // }
}

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
      console.log('resolve');
      resolve(222);
  }, 1000)
})
p.then(data => {
  console.log('data1',data);
  return data;
}).then(data2 => {
  console.log('data2', data2);
  return 555;
}).then(data3 => {
  console.log('data3', data3);
}).catch(err=>{
  console.log('err',err);
})
// function Promise(executor) {
//   this.status = PENDING; // 初始化状态
//   this.value = undefined; // 成功后的value值；
//   this.reason = undefined; // 失败后的原因；
//   // 调用此方法表示成功
//   const resolve = (value) => {
//     if(this.status ===PENDING) {
//       this.status = FULFILLED;
//       this.value = value;
//     }
//   }
//   // 调用此方法表示失败
//   const reject = (errMsg) => {
//     if(this.status===PENDING) {
//       this.status = REJECTED;
//       this.reason = errMsg;
//     }
//   }
//   try {
//     // 立即执行，将resolve和reject传给使用者
//     executor(resolve,reject);
//   }catch (error){
//     // 失败后，将错误返回给reject
//     reject(error)
//   }
// }
// Promise.prototype.then = function (onFulfilled,onRejected) {
//   if(this.status===FULFILLED) {
//     onFulfilled(this.value);
//   }
//   if(this.status===REJECTED) {
//     onRejected(this.reason);
//   }
// }
const promise = new Promise((resolve,reject)=>{
  reject('成功');
}).then((res)=>{
  console.log(res,'res');
},(err)=>{
  console.log(err,'err');
})
const App = () => {
  return (
    <div>hello</div>
  )
}

export default App;
