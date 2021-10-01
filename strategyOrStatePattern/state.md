### 状态模式
>`允许一个对象在其内部状态改变时来改变它的行为`，对象看起来似乎修改了它的类。在状态模式中，我们把状态封装成独立的类，并将请求委托给当前的状态对象，所以当对象内部的状态改变时，对象会有不同的行为。状态模式的关键就是区分对象的内部状态。  

按我个人理解的话就是跟策略模式其实差不多，不同点就是策略模式的各个策略类之间是平等又平行的，它们之间没有任何关系，互不影响，各自为政。<u></u>客户需要清楚每个策略对应的功能是什么。</u>而状态模式的话，<u>状态和状态对应的行为早已被封装好</u>，状态之间的切换也早就被规定,“改变行为”这件事发生在状态模式的内部.<u>对于客户来说，不需要了解这些细节</u>

```js
var FSM = {
  off: {
    buttonWasPressed: function () {
      console.log('关灯')
      this.currentState = FSM.on
    }
  },  
  on: {
    buttonWasPressed: function () {
      console.log('开灯')
      this.currentState = FSM.off
    }
  }
}

var Light = function () {
  this.currentState = FSM.off // 设置初始状态
  this.button = null
}

Light.prototype.init = function () {
  var self = this

  var button = document.createElement('button')
  this.button = document.body.appendChild(button)
  this.button.innerHTML = '开关'

  this.button.onclick = function () {
    self.currentState.buttonWasPressed.call(self)  // 把请求委托给状态机FSM
  }
}

const light = new Light()
light.init()

```
通过代码的最终调用也可以知道，只需要创建灯病初始化该实例，不用关心它的开关状态。开关状态已经在内部自己实现好了（会根据按钮的开关去自动执行对应状态的逻辑）