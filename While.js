var Assertion = require('./Assertion.js');
module.exports = While;

function While(assertion){
	this.assertion = new Assertion(assertion);
	this.assertion.loopUntilNoMatches = true;
}

While.prototype.run = function(stack) {
	var result = this.assertion.run(stack);
	return result;
};