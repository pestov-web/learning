function ClassParent() {
  this.handleNext = function () {
    console.log('handleNext of parent');
  };
  this.handleNext2 = function () {
    console.log('handleNext2 of parent');
  };
}

function ClassChild() {
  // Вызываем конструктор родителя
  ClassParent.call(this);
  this.handleNext = function () {
    console.log('handleNext of child');
    ClassParent.prototype.handleNext.call(this);
  };
}

ClassChild.prototype = Object.create(ClassParent.prototype);
ClassChild.prototype.constructor = ClassChild;

const child = new ClassChild();

child.handleNext();
