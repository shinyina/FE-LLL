function myInstanceof(left, right) {
    let proto = left.__proto__, // 获取对象的原型
        prototype = right.prototype; // 获取构造函数的 prototype 对象
  
    // 判断构造函数的 prototype 对象是否在对象的原型链上
    while (true) {
      if (!proto) return false;
      if (proto === prototype) return true;
      proto = proto.__proto__
    }
  }
  function Person() { };
  var p = new Person();
  console.log(myInstanceof(p, Object));