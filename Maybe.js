var Assertion = require('./Assertion.js');
module.exports = Maybe;

function Maybe(assertion){
	this.assertion = new Assertion(assertion);
	this.gotoIndex = -1;
	this.actionFunction = false;
	this.throwError = false;
}

Maybe.prototype.run = function(stack) {
	var result = this.assertion.run(stack);

	//console.log(result.throwError , stack.getStackValue(stack, 0));

	if(result.result == false && this.throwError == true){
		throw new Error('Syntax Error! Received a '+stack.getStackValue(stack, 0)+ '.');
	}
	var items = [];
	if(result.result == true && ( this.actionFunction || this.gotoIndex > -1) ){
		var items = stack.splice(0, result.items.length);
	}

	if(result.result == true && this.actionFunction) {
		this.actionFunction(items, stack);
	}

	if(this.gotoIndex > -1) {
		result.goto = this.gotoIndex
	}

	return result;
};

Maybe.prototype.then = function(actionFunction) {
	this.actionFunction = actionFunction;
	return this;
};
Maybe.prototype.goto = function(index) {
	this.gotoIndex = index;
	return this;
};