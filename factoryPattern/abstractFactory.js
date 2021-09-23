/**
 * 抽象工厂模式
 * 抽象工厂模式是对类的工厂抽象用来创建产品类簇，
 * 不负责创建某一类产品的实例。
 */


class User {
  constructor(career) {
    if (new.target === User) {
      throw new Error('不能实例化抽象User类')
    }
  }
  printDuty () {
    throw new Error('抽象打印方法')
  }
}

//coder类，重写duty方法
class UserOfCoder extends User {
  constructor(name) {
    super('coder');
    this.name = name;
    this.work = ['写代码', '修bug'];
  }
  printDuty () {
    console.log("hi I'am", this.name);
    console.log('my work is ----', this.work);
  }
}

class UserOfHr extends User {
  constructor(name) {
    super('hr');
    this.name = name;
    this.work = ['招聘', '员工信息管理'];
  }
  printDuty () {
    console.log("hi I'am", this.name);
    console.log('my work is ----', this.work);
  }
}

class UserOfDriver extends User {
  constructor(name) {
    super('driver');
    this.name = name;
    this.work = ['开车'];
  }
  printDuty () {
    console.log("hi I'am", this.name);
    console.log('my work is ----', this.work);
  }
}

//根据不同职业返回对应的类
function getAbstractUserFactory (career) {
  switch (career) {
    case 'coder':
      return UserOfCoder;
      break;
    case 'hr':
      return UserOfHr;
      break;
    case 'driver':
      return UserOfDriver;
      break;
    default:
      throw new Error('参数错误, 可选参数:coder、hr、driver')
  }
}

const E1 = new getAbstractUserFactory('coder');
const E2 = new getAbstractUserFactory('hr');
const E3 = new getAbstractUserFactory('driver');

new E1('Benny').printDuty();
new E2('Sunny').printDuty();
new E3('Jack').printDuty();