var Maybe = require('./Maybe.js');
var While = require('./While.js');

module.exports = StackAssert;

function StackAssert(){}

StackAssert.prototype.maybe = function(arg){
	return new Maybe(arg);
}

StackAssert.prototype.expect = function(arg){
	var maybe = new Maybe(arg);
	maybe.throwError = true;
	return maybe
}

StackAssert.prototype.while = function(arg){
	return new While(arg);
}

StackAssert.prototype.newStack = function(stack, getStackValue){
	stack.getStackValue = getStackValue;
	return stack; 
}
