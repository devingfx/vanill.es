
/* Node shortcuts */

import merge from '../String/merge.js'


Node.prototype.$ = function( ...args )
{
	return this.querySelector( merge(...args) )
}
Node.prototype.$$ = function( ...args )
{
	return [...this.querySelectorAll( merge(...args) )]
}
Node.prototype.add = function( ...args )
{
	this.append( ...args )
	return this
}
