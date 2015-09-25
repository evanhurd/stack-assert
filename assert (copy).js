module.exports = {
	expect : expect,
	maybe : maybe,
	assertWhile : assertWhile
};

function expect(assert){
	var m = maybe(assert, true);
	return m;
}

console.log(parseAssertString('LITERAL,DOT,LITERAL,AS,!STRING')([	[ 'LITERAL', 'test', 1 ],
	[ 'DOT', '.', 1 ],
	[ 'LITERAL', 'test', 1 ],
	[ 'AS', 'as', 1 ],
	[ 'LITERAL', 'test', 1 ]]) )

function maybe(assert){
	
	if( getType(assert) == "[object String]") {
		var assert = parseAssertString(assert, function(){
			throw new Error('SYNTAX ERROR!');
		});
	}else if( getType(assert) == "[object Array]"){
		var assert = assertStack(assert);
	}

	var m = {
		assert : assert,
		then : function(cb){this.thenCallback = cb;},
		goto : function(index){this.gotoAssertStackIndex = index;},
		gotoAssertStackIndex : -2,
		thenCallback : function(){},
		throwError : arguments[1] || false
	}
	m.run = function(m, stack){

		var result = this.assert(stack, function(){
			if(this.throwError) {
				throw new Error('SYNTAX ERROR!');
			}
		}.bind(this));
		console.log(result);
		if(result > 0) {
			var items = stack.splice(0, result);
			if(this.thenCallback) this.thenCallback(items);
			return {
				items : items,
				gotoAssertStackIndex : this.gotoAssertStackIndex,
				result : true
			};
		}else{
			return false;
		}
	}.bind(m,m);
	m.run.then = function(m, cb){
		m.thenCallback = cb;
		return m.run;
	}.bind(null, m);


	m.run.goto = function(m, index){
		m.gotoAssertStackIndex = index;
		return m.run;
	}.bind(null, m);

	return m.run;
}

function assertWhile(assert){
	if(typeof assert != 'function') assert = maybe(assert);
	return function(assert, stack){
		console.log(assert.length);
		while(assert(stack, true)) {}
	}.bind(null, assert);
}

function assertStack(asserts){
	
	asserts.forEach(assert)

	var data = {
		asserts : asserts
	};

	var assert = function(stack){
		var i = 0;
		var items = [];
		while(i < data.asserts.length){
			var res = data.asserts[i](stack);

			if(res && res.gotoAssertStackIndex > -1){
				i = res.gotoAssertStackIndex;
			}else{
				i++;	
			}
			if(res && res.items.length > 0){

				if(arguments[1]){
					return res.items;
				}

				for(var k = 0; k < res.items.length;k++){
					items.push(res.items[k]);
				}
			}
		};

	}.bind(data);
	return assert;
}

function maybe(assert){
	
}

function assertStack(asserts){
	this.asserts = asserts;
}

assertStack.prototype.run = function(stack){
	for(var i = 0; i < this.asserts.length;i++){
		var result = this.asserts[i](stack);
		if(result.result == true){
			return result;
		}
	}
	return {
			result : false,
			items : [],
			indexes : []
		};
}


function parseAssertString(str){
	var parts = str.split(',');
	var assertParts = [];

	parts.forEach(function(part, index){

		if(part[0] == "!"){
			var isExpected = true;
			var part = part.slice(1,part.length);
		}else{
			var isExpected = false;
		}

		assertParts.push(function(index, part, isExpected, stack){
			return {
				index : index,
				stack : stack,
				item : part,
				result : stackAssert(index, part, isExpected, stack)
			};
		}.bind(null, index, part, isExpected));
	});

	return function(assertParts, stack){
		var i = 0;
		var result = {
			result : true,
			items : [],
			indexes : []
		};
		
		for(var i = 0; i < assertParts.length; i++){
			var assertResult = assertParts[i](stack);
			
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
	}.bind(null, assertParts);
}

function stackAssert(index, type, throwError, stack){
	if(stack[index][index] == type){
		return true;
	}else{
		if(throwError) throwError(stack[index][index], type);
		return false;
	}
}

function getType(thing){
	return  ({}).toString.call(thing);
}

function throwError(received, expected) {
	throw new Error("Syntax Error: Received `"+received+"` when expecting `"+expected+"`");
}