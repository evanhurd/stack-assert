
var assert = require('./assert.js');
var Select = require('./syntax/Select.js');

var stack = [ 
	[ 'SELECT', 'Select', 1 ],
	[ 'LITERAL', 'test', 1 ],
	[ 'DOT', '.', 1 ],
	[ 'LITERAL', 'test', 1 ],
	[ 'FROM', 'from', 1 ],
	[ 'LITERAL', 'test', 1 ],
	[ 'EOF', '', 1 ]
];

var stack = [
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
];

var statement = [];

assert.maybe('SELECT').then(
	function(){
		statement.push( Select(stack) )
	}
)(stack);

console.log(statement);
console.log(stack);
