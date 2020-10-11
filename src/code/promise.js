/* eslint-disable no-loop-func */

// 手写promise；
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
    // 调用此函数表示成功
    const resolve = (data) => {
      if (this.status !== 'pending') return;
      this.status = 'fulfilled';
      setTimeout(() => {
        this.resoveList.forEach(s => {
          // then里面如果包含的是非函数，直接值穿透
          if ((typeof s === 'object' && s !== null) || typeof s === 'function') {
            data = s(data);
            // 从新赋值data的值继承上个resolve的返回值
          } else {
            data = s;
          }
        })
      })
    }
    // 调用此函数表示失败
    const reject = (err) => {
      if (this.status !== 'pending') return;
      this.status = 'rejected';
      setTimeout(() => {
        this.rejectList.forEach(f => {
          // 从新赋值err的值继承上个reject的返回值
          err = f(err)
        });
      })
    }
    try {
      // 立即执行，将resolve和reject传给使用者
      fn(resolve, reject);
    } catch (error) {
      // 失败后，将错误返回给reject
      reject(error)
    }
  }
  // then后面跟两个函数，完成函数，和错误拒绝函数
  then(onResolved, onRejected) {
    if (onResolved) {
      this.resoveList.push(onResolved);
    }
    if (onRejected) {
      this.rejectList.push(onRejected);
    }
    return this;
  }
  // catch 后面跟错误处理函数
  catch(onRejected) {
    if (onRejected) {
      this.rejectList.push(onRejected);
    }
    return this;
  }

    /**
     * 实现Promise.resolve
     * 1.参数是一个 Promise 实例, 那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
     * 2.如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
    */
    static resolve(data) {
      if (data instanceof Promise) {
        return data;
      }
      return new Promise((resolve) => {
        resolve(data);
      })
    }
    // 实现Promise.reject
    static reject(err) {
      if (err instanceof Promise) {
        return err;
      }
      return new Promise((resolve, reject) => {
        reject(err);
      })
    }
    /**
     * 实现Promise.all
     * 1. Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
     * 2. 返回值组成一个数组
    */
    static all(promises) {
      return new Promise((resolve, reject) => {
        let promiseCount = 0;
        let result = [];
        for (let i = 0; i < promises.length; i++) {
          // promises[i]可能不是Promise类型，可能不存在then方法，中间如果出错,直接返回错误
          Promise.resolve(promises[i])
            .then(res => {
              promiseCount++;
              // 注意这里赋值应该用下标去赋值而不是用push，因为毕竟是异步的，哪个promise先完成还不一定
              result[i] = res;
              if (promiseCount === promises.length) {
                return resolve(result);
              }
            }, reject
            )
        }
      })
    }
    /**
     * 实现Promise.race
     * 1. Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
     * 2. 返回那个率先改变的 Promise 实例的返回值
    */
    static race(promises) {
      return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
          Promise.resolve(promises[i])
            .then(resolve, reject);
        }
      })
    }
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('------手写promise-----');
    resolve('成功了1');
  }, 1000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功了2');

  }, 500)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功了3');
  }, 0)
})
Promise.race([p1,p2,p3]).then((res)=>{
  console.log(res,'res');
})


