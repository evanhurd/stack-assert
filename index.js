var StackAssert = require('./StackAssert.js');
module.exports = StackAssert;
/*var SA = new StackAssert();

var stack = SA.newStack([
	[ 'SELECT', 'Select', 1 ],
	[ 'TOP', 'top', 1 ],
	[ 'NUMBER', '10000', 1 ],
	[ 'LITERAL', 'test', 1 ],
	[ 'DOT', '.', 1 ],
	[ 'LITERAL', 'test', 1 ],
	[ 'AS', 'as', 1 ],
	[ 'LITERAL', 'test', 1 ],
	[ 'FROM', 'from', 1 ],
	[ 'LITERAL', 'test', 1 ],
	[ 'EOF', '', 1 ]
], getStackValue);


function getStackValue(stack, index){
	return stack[index][0];
}


SA.maybe('SELECT').then(function(items, stack){
	SA.expect([
		  SA.maybe("TOP+!NUMBER").then(test)
	
		, SA.expect([
			  SA.maybe('LITERAL+DOT+LITERAL+AS+!STRING').then(test)
			, SA.maybe('LITERAL+DOT+LITERAL').then(test)
			, SA.maybe('LITERAL+DOT+!ASTERISK').then(test)
			, SA.maybe('LITERAL').then(test)
		  ])
		, SA.maybe('COMMA').goto(1)
		, SA.expect('FROM+LITERLA').then(test)
		, SA.while([
			  SA.maybe('LEFT+OUTER+!JOIN').then(test)
			, SA.maybe('OUTER+CROSS+!APPLY').then(test)
			, SA.maybe('OUTER+!JOIN').then(test)
			, SA.maybe('INNER+!JOIN').then(test)
			, SA.maybe('CROSS+!APPLY').then(test)
			, SA.maybe('APPLY').then(test)
		  ])
		, SA.maybe('GROUP+!BY').then(test)
		, SA.maybe('ORDER+!BY').then(test)
		, SA.maybe('HAVING').then(test)
	]).run(stack);

}).run(stack);



function test(){
	console.log(arguments);
}*/