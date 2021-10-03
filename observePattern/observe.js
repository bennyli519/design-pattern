/*
 * @Description:观察者模式demo
 * @Author: 李泽斌
 * @Date: 2021-10-03 11:14:03
 * @LastEditTime: 2021-10-03 11:37:18
 */
//定义发布者类
class Publisher {
  constructor() {
    this.observers = [];
    console.log('Publisher created');
  }
  //添加订阅者
  add(observer) {
    this.observers.push(observer);
  }
  //通知订阅者
  notify() {
    this.observers.forEach((observer) => {
      observer.update(this);
    })
  }
  //移除订阅者
  remove(observer) {
    if (!this.observers.length) return;
    this.observers.forEach((item, i) => {
      if (observer === item) {
        this.observers.splice(i, 1)
      }
    })
  };

}

//订阅者
class Observer {
  constructor() {
    console.log('Observer created')
  }

  update() {
    console.log('Observer.update invoked')
  }
}

// const obs1 = new Observer();
// const obs2 = new Observer();
// const p1 = new Publisher();
// p1.add(obs1);
// p1.add(obs2);
// p1.notify();

// 定义一个具体的需求文档（prd）发布类
class PrdPublisher extends Publisher {
  constructor() {
    super()
    // 初始化需求文档
    this.prdState = null
    // 韩梅梅还没有拉群，开发群目前为空
    this.observers = []
    console.log('PrdPublisher created')
  }

  // 该方法用于获取当前的prdState
  getState() {
    console.log('PrdPublisher.getState invoked')
    return this.prdState
  }

  // 该方法用于改变prdState的值
  setState(state) {
    console.log('PrdPublisher.setState invoked')
    // prd的值发生改变
    this.prdState = state
    // 需求文档变更，立刻通知所有开发者
    this.notify();
  }
}

class DeveloperObserver extends Observer {
  constructor() {
    super()
    // 需求文档一开始还不存在，prd初始为空对象
    this.prdState = {}
    console.log('DeveloperObserver created')
  }

  // 重写一个具体的update方法
  update(publisher) {
    console.log('DeveloperObserver.update invoked')
    // 更新需求文档
    this.prdState = publisher.getState()
    console.log('state changed to --', this.prdState)
    // 调用工作函数
    this.work()
  }

  // work方法，一个专门搬砖的方法
  work() {
    // 获取需求文档
    const prd = this.prdState
    // 开始基于需求文档提供的信息搬砖。。。
    // ...
    console.log('996 begins...')
  }
}

// 创建订阅者：前端开发李雷
const liLei = new DeveloperObserver()
// 创建订阅者：服务端开发小A
const A = new DeveloperObserver()
// 创建订阅者：测试同学小B
const B = new DeveloperObserver()
// 韩梅梅出现了
const hanMeiMei = new PrdPublisher()
// 需求文档出现了
const prd = {
  // 具体的需求内容
  name: '需求文档 v1.0'
}
// 韩梅梅开始拉群
hanMeiMei.add(liLei)
hanMeiMei.add(A)
hanMeiMei.add(B)
// 韩梅梅发送了需求文档，并@了所有人
hanMeiMei.setState(prd)