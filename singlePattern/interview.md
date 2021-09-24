
### 实现一个Storage

> 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。

``` js
class Storage{
  static getInstance(){
    if(!Storage.instance){
      Storage.instance = new Storage();
    }
    return Storage.instance
  }
  getItem(key){
    return localStorage.getItem(key)
  }
  setItem(key,value){
    return localStorage.setItem(key,value)
  }
}

```

### Modal
``` js

class Modal{
  constructor(){
    
  }
  static getInstance(){
    let modal = null;
    if(!modal){
        modal = document.createElement('div')
        modal.innerHTML = '我是一个全局唯一的Modal'
        modal.id = 'modal'
        modal.style.display = 'none'
        document.body.appendChild(modal)
    }
    return modal
  }
  showModal(){
    document.getElementById('选择器').addEventListener('click',function(){
      modal.style.display = 'block';
    })
  }
}

```