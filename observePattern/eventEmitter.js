/*
 * @Description:Event Bus实现
 * @Author: 李泽斌
 * @Date: 2021-10-05 15:24:14
 * @LastEditTime: 2021-10-05 15:40:40
 */
class Eventemitter {
  constructor() {
    this.handlers = {};
  }
  on(eventName, cb) {
    //如果不存在该事件名，则创建一个新的
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = []
    }
    this.handlers[eventName].push(cb);
  }
  emit(eventName, ...args) {
    if (this.handlers[eventName]) {
      // 这里需要对 this.handlers[eventName] 做一次浅拷贝，主要目的是为了避免通过 once 安装的监听器在移除的过程中出现顺序问题
      const handlers = this.handlers[eventName].slice()
      // 如果有，则逐个调用队列里的回调函数
      handlers.forEach((callback) => {
        callback(...args)
      })
      // this.handlers[eventName].forEach(cb => {
      //   cb(...args);
      // });
    }
  }
  off(eventName, cb) {
    const callbacks = this.handlers[eventName];
    const index = callbacks.indexOf(cb);
    if (index !== -1) {
      callbacks.splice(index, 1)
    }
  }
  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}