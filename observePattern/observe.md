### 观察者模式
>观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，当这个目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。

### 生活中的观察者模式
---
周一刚上班，前端开发李雷就被产品经理韩梅梅拉进了一个钉钉群——“员工管理系统需求第99次变更群”。这个群里不仅有李雷，还有后端开发 A，测试同学 B。三位技术同学看到这简单直白的群名便立刻做好了接受变更的准备、打算撸起袖子开始干了。此时韩梅梅却说：“别急，这个需求有问题，我需要和业务方再确认一下，大家先各忙各的吧”。这种情况下三位技术同学不必立刻投入工作，但他们都已经做好了<u>本周需要做一个新需求的准备</u>，时刻等待着产品经理的号召。  


一天过去了，两天过去了。周三下午，韩梅梅终于和业务方确认了所有的需求细节，于是在“员工管理系统需求第99次变更群”里大吼一声：“需求文档来了！”，随后甩出了"需求文档.zip"文件，同时@所有人。三位技术同学听到熟悉的“有人@我”提示音，立刻点开群进行群消息和群文件查收，随后根据群消息和群文件提供的需求信息，投入到了各自的开发里。上述这个过程，就是一个典型的观察者模式。

在上述的过程中，  
需求文档（目标对象）的`发布者`只有一个——产品经理韩梅梅。  
而需求信息的接受者却有多个——前端、后端、测试同学，这些同学的共性就是他们需要根据需求信息开展自己后续的工作、因此都非常关心这个需求信息，于是不得不时刻关注着这个群的群消息提醒，他们是实打实的`订阅者`，即`观察者对象`。  

在我们上文这个钉钉群里，一个需求信息对象对应了多个观察者（技术同学），当需求信息对象的状态发生变化（从无到有）时，产品经理通知了群里的所有同学，以便这些同学接收信息进而开展工作：`角色划分 --> 状态变化 --> 发布者通知到订阅者`，这就是观察者模式的“套路”。

### 实践中理解定义
---
结合上面的分析，在观察者模式里，至少有两个关键角色出现——发布者和订阅者  
用面向对象的方式表达的话，那就是要有两个类。
先看发布者，具备什么技能？ 
韩梅梅的基本操作是什么？  
 * 首先是拉群（增加订阅者），  
 * 然后是@所有人（通知订阅者），   
 * 此外作为群主&产品经理，韩梅梅还具有踢走项目组成员（移除订阅者）的能力。

 ```js
 //定义发布者类
 class Publisher{
   constructor(){
     this.observers= [];
     console.log('Publisher created');
   }
   //添加订阅者
   add(observer){
     this.observers.push(observer);
   }
   //通知订阅者
   notify(){
      this.observers.forEach((observer)=>{
        observer.update(this);
      })
   }
   //移除订阅者
   remove(observer){
     if(!this.observers.length) return;
     this.observers.forEach((item,i)=>{
       if(observer === item){
         this.observers.splice(i,1)
       }
     })
   }
 
 }
 ```

 订阅者需要做的操作有
  * 被通知
  * 去执行（本质上是接受发布者的调用，这步我们在Publisher中已经做掉了）
```js
// 定义订阅者类
class Observer {
    constructor() {
        console.log('Observer created')
    }

    update() {
        console.log('Observer.update invoked')
    }
}

```

以上，我们就完成了最基本的发布者和订阅者类的设计和编写。在实际的业务开发中，我们所有的定制化的发布者/订阅者逻辑都可以基于这两个基本类来改写。比如我们可以通过拓展发布者类，来使所有的订阅者来监听某个特定状态的变化。仍然以开篇的例子为例，我们让开发者们来监听需求文档（prd）的变化  
```js
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
        this.notify()
    }
}
```
作为订阅方，开发者的任务也变得具体起来：接收需求文档、并开始干活  
```js
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
```
下面，我们可以 new 一个 PrdPublisher 对象（产品经理），她可以通过调用 setState 方法来更新需求文档。需求文档每次更新，都会紧接着调用 notify 方法来通知所有开发者
```js
// 创建订阅者：前端开发李雷
const liLei = new DeveloperObserver()
// 创建订阅者：服务端开发小A（
const A = new DeveloperObserver()
// 创建订阅者：测试同学小B
const B = new DeveloperObserver()
// 韩梅梅出现了
const hanMeiMei = new PrdPublisher()
// 需求文档出现了
const prd = {
  name:'需求文档v1.0'
    // 具体的需求内容
    // ...
}
// 韩梅梅开始拉群
hanMeiMei.add(liLei)
hanMeiMei.add(A)
hanMeiMei.add(B)
// 韩梅梅发送了需求文档，并@了所有人
hanMeiMei.setState(prd)
```

### 观察者模式与发布-订阅模式的区别是什么？
回到上文的例子里。韩梅梅把所有的开发者拉了一个群，直接把需求文档丢给每一位群成员，这种`发布者直接触及到订阅者的操作`，叫`观察者模式`。但如果韩梅梅没有拉群，而是把需求文档上传到了公司统一的需求平台上，需求平台感知到文件的变化、自动通知了每一位订阅了该文件的开发者，这种`发布者不直接触及到订阅者、而是由统一的第三方来完成实际的通信的操作`，叫做发布-订阅模式。

### 既然有了观察者模式，为什么还需要发布-订阅模式呢？
个人层面理解  
观察者模式，并没完全的解决耦合问题。被观察者必须去维护一套观察者的集合，这些观察者必须实现统一的方法提供被观察者调用，两者之间还是有这说不清道不明的关系。  
而发布——订阅模式，发布者完全不用感知订阅者，不用关心它怎么实现回调方法，事件的注册和触发都发生在独立于双方的第三方平台（事件总线）上。发布-订阅模式下，实现了完全地解耦。 

在实际开发中，我们的模块解耦诉求并非总是需要它们完全解耦。如果`两个模块之间本身存在关联，且这种关联是稳定的、必要的`，那么我们使用观察者模式就足够了。而在`模块与模块之间独立性较强、且没有必要单纯为了数据通信而强行为两者制造依赖的情况下`，我们往往会倾向于使用发布-订阅模式。