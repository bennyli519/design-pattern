/**
 * 工厂方法模式
 * 工厂方法模式的本意是将实际创建对象的工作推迟到子类中，这样核心类就变成了抽象类。
 */
class User {
  constructor(name = '', career = []) {
    //ES6也没有实现abstract，但是我们可以使用new.target来模拟出抽象类。new.target指向直接被new执行的构造函数，我们对new.target进行判断，如果指向了该类则抛出错误来使得该类成为抽象类。
    if (new.target === User) {
      throw new Error('抽象类不能实例化')
    }
    this.name = name;
    this.career = career;
  }
  printDuty () {
    console.log(`hi~ this is${this.name},my duty is ${this.career}`)
  }
}

//用户工厂，根据职业区分对应的duty
class UserFactory extends User {
  constructor(name, career) {
    super(name, career)
  }
  create (career) {
    switch (career) {
      case 'coder':
        return new UserFactory('Benny', ['写代码', '修Bug']);
        break;
      case 'hr':
        return new UserFactory('Sundy', ['招聘']);
        break;
      case 'driver':
        return new UserFactory('Jack', ['开车车']);
        break;
      default:
        throw new Error('参数错误, 可选参数:coder、hr、driver')
    }
  }
}
let userFactory = new UserFactory();
let coder = userFactory.create('coder');
let hr = userFactory.create('hr');
let driver = userFactory.create('driver');
coder.printDuty();
hr.printDuty();
driver.printDuty();
