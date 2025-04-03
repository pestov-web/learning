function Parent(name) {
  this.name = name;
}
Parent.prototype.constructor = Parent;
Parent.prototype.foo = function () {
  console.log('foo');
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
Child.prototype.bar = function () {
  console.log('bar');
};
