
/**
 * 简单工厂模式也叫静态工厂模式，
 * 用一个工厂对象创建同一类对象类的实例。
 * 优点:只要传递正确的参数，就能获得所需的对象，而不需要关心其创建的具体细节。
 * 缺点:只能作用于创建的对象比较少，对象的创建逻辑不复杂时使用。
 * 当我们的对象不是上面的3个而是30个或更多时，这个函数会成为一个庞大的超级函数，便得难以维护
 */


function Factory (career) {
  function User (career, work) {
    this.career = career
    this.work = work
  }
  let work
  switch (career) {
    case 'coder':
      work = ['写代码', '修Bug']
      return new User(career, work)
      break
    case 'hr':
      work = ['招聘', '员工信息管理']
      return new User(career, work)
      break
    case 'driver':
      work = ['开车']
      return new User(career, work)
      break
  }
}
let coder = new Factory('coder')
console.log(coder)
let hr = new Factory('hr')
console.log(hr)