import React, { useEffect } from 'react';
import './App.css';
// promise的三个状态
const PENDING = 'pending'; // 等待中
const FULFILLED= 'fulfilled'; // 已完成
const REJECTED = 'rejected'; // 已拒绝
class Promise {
  constructor(executor) {
    this.status = PENDING; // 初始化状态
    this.value = undefined; // 成功后的value值；
    this.reason = undefined; // 失败后的原因；
    this.onResolvedCallBacks = [] ; // 存放成功后的回调（解决异步问题）
    this.onRejectedCallBacks = []; // 存放失败后的回调（解决异步问题）
    // 调用此方法表示成功
    const resolve = (value) => {
      if(this.status ===PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallBacks.forEach(fn=>fn());
      }
    }
    // 调用此方法表示失败
    const reject = (errMsg) => {
      if(this.status===PENDING) {
        this.status = REJECTED;
        this.reason = errMsg;
        this.onRejectedCallBacks.forEach(fn=>fn());
      }
    }
    try {
      // 立即执行，将resolve和reject传给使用者
      executor(resolve,reject);
    }catch (error){
      // 失败后，将错误返回给reject
      reject(error)
    }
  }

  // 定义then方法
  then(onFulfilled,onRejected) {
    if(this.status===FULFILLED) {
      onFulfilled(this.value);
    }
    if(this.status===REJECTED) {
      onRejected(this.reason);
    }
    if(this.status===PENDING) {
      // 如果运行到then的时候promise的状态是PENDING, 需要将onFulfilled和onRejected存放起来，待状态更改确定后，再依次执行；
      this.onResolvedCallBacks.push(()=>{
        onFulfilled(this.value);
      })
      // 如果运行到then的时候promise的状态是PENDING, 需要将onFulfilled和onRejected存放起来，待状态更改确定后，再依次执行；
      this.onRejectedCallBacks.push(()=>{
        onRejected(this.reason);
      })
    }
  }
}
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
  reject('成功jj');
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
