# 单例模式
``` js
/**
 * 单例模式
 * 不管我们尝试去创建多少次，它都只给你返回第一次所创建的那唯一的一个实例。
 *
 * 所以需要判断自己是否已经创建过该实例
 */
class SingleDog {
  show () {
    console.log('I am single');
  }
  static getInstance () {
    //判断是否已经new过该实例
    if (!SingleDog.instance) {
      SingleDog.instance = new SingleDog()
    }
    //如果这个唯一实例已经存在，则直接返回
    return SingleDog.instance
  }
}

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance();
s1.show();
console.log(s1 === s2 ? 'true' : 'false');

```

### 实际场景
 * Vuex中的Store ———— 共享数据的唯一数据源 `（一个 Vue 实例只能对应一个 Store）`
 * so how to make sure unique Data from store? `如何确保Store的唯一性`

``` js
// 安装vuex插件
Vue.use(Vuex)

// 将store注入到Vue实例中
new Vue({
    el: '#app',
    store
})
```
通过调用`Vue.use()`方法，安装了vuex插件，Vuex插件里面内部实现了一个install方法，该方法会在插件安装时被调用，从而把Store注入到vue实例里去。
也就是说每 install 一次，都会尝试给 Vue 实例注入一个 Store。

``` js
let Vue // 这个Vue的作用和楼上的instance作用一样
...
export function install (_Vue) {
  // 判断传入的Vue实例对象是否已经被install过Vuex插件（是否有了唯一的state）
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  // 若没有，则为这个Vue实例对象install一个唯一的Vuex
  Vue = _Vue
  // 将Vuex的初始化逻辑写进Vue的钩子函数里
  applyMixin(Vue)
}

```
通过以上Vuex源码中单例模式的方法，可以保证一个 Vue 实例（即一个 Vue 应用）只会被 install 一次 Vuex 插件，所以每个 Vue 实例只会拥有一个全局的 Store。
 


