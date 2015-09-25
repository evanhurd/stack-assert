module.exports = EvalString;

function EvalString(evalString){
	var parts = evalString.split('+');
	this.evalParts = [];
	this.evalString = evalString;

	parts.forEach(function(part, index){

		if(part[0] == "!"){
			var isExpected = true;
			var part = part.slice(1,part.length);
		}else{
			var isExpected = false;
		}

		this.evalParts.push(function( index, part, isExpected, stack){
			return {
				index : index,
				item : part,
				isExpected : isExpected,
				result : stack.getStackValue(stack, index) === part,
				expected : part,
				received : stack.getStackValue(stack, index)
			};
		}.bind(this, index, part, isExpected));

	}.bind(this));
}

EvalString.prototype.run = function(stack){
	console.log('CHECKING: ', this.evalString);
	var i = 0;
	var result = {
		result : true,
		items : [],
		indexes : []
	};
	
	for(var i = 0; i < this.evalParts.length; i++){
		var assertResult = this.evalParts[i](stack);
		if(assertResult.result == false && assertResult.isExpected == true){
			throw new Error('Syntax Error! Found a '+assertResult.received+' when expecting a '+ assertResult.expected + '.');
			return false;
		}

		if(assertResult.result == false){
			return {
				result : false,
				items : [],
				indexes : []
			};
		}else{
			result.items.push(assertResult.item);
			result.indexes.push(assertResult.index);
		}

	}

	return result;	
}