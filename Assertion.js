var EvalString = require('./EvalString.js');
module.exports = Assertion;

function Assertion(assert){
	
	this.loopUntilNoMatches = false;

	if(assert.toString() == "Assertion") {
		return assert;
	}else if( getType(assert) == "[object String]") {
		this.assertions = [new EvalString(assert)];
	}else if( getType(assert) == "[object Array]"){
		this.assertions = assert;
	}else{
		throw new Error("Expecting assert string or array!");
	}

}

Assertion.prototype.run = function(stack) {
	var cumResult = {
			result : false,
			items : [],
			indexes : []
	};

	for(var i = 0; i < this.assertions.length;i++){
		var result = this.assertions[i].run(stack);
		if(result.result == true && result.goto){

			var i = result.goto-1;
		}else if(result.result == true && this.loopUntilNoMatches == true){
			return result;
		}else if(result.result == true){
			cumResult.result = true;
			cumResult.items = cumResult.items.concat(result.items);
			cumResult.indexes = cumResult.indexes.concat(result.indexes);
		}
	}
	return cumResult;
};

Assertion.prototype.toString = function() { return "Assertion"; }

function getType(thing){
	return  ({}).toString.call(thing);
}