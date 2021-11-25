export * from './index.js'

/**
 * let styles1 = CSS`...`, styles2 = CSS`...`, styles3 = CSS`...`
 * styleElm.innerHTML = ` ${styles1} my-selector { and-some-prop: value } ${styles2}`
 */
CSSStyleSheet.prototype.toString = function()
{
	return [...this.rules].map( rule=> rule.cssText ).join('\n')
}


/* utils */

const observe = ( node, fn )=> {

	const obs = new MutationObserver( o=>o )
	obs.observe( node, { childList:true } )

	fn()
	
	var res = []
	obs.takeRecords().map( rec=> res = res.concat(...rec.addedNodes) )
// 	console.log('take',obs.takeRecords())
	obs.disconnect()
// 	console.log('take',obs.takeRecords())
// 	console.log('res=',res)
	return res

}

// const multiple = ( args, fn )=> {
// 	var res = []
// 	args.map( arg=> res = res.concat(fn(arg)) )
// 	return res
// }
const multiArgConcat = ( fn )=> {

	return function( ...args )
	{
		return observe( this, o=> 
			args.map( fn.bind(this) )
		)
	}
}

/* Node shortcuts */

import { merge } from '../String.js'

// from dev/Elliott.ist/waves.svg/DOM.js
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
// end from dev/Elliott.ist/waves.svg/DOM.js



/* Element shortcuts */

// Element.prototype.addTop = 			function( ...args ){ var res = []; args.map( arg=> res = res.concat(observe( this, o=> this.insertAdjacentElement('afterbegin', arg ) ) ) ); return res }
// Element.prototype.addAfter = 		function( ...args ){ var res = []; args.map( arg=> res = res.concat(observe( this, o=> this.insertAdjacentElement('afterend', arg ) ) ) ); return res }
// Element.prototype.addBefore = 		function( ...args ){ var res = []; args.map( arg=> res = res.concat(observe( this, o=> this.insertAdjacentElement('beforebegin', arg ) ) ) ); return res }
// // Element.prototype.add = 			function( ...args ){ var res = []; args.map( arg=> res = res.concat(observe( this, o=> this.insertAdjacentElement('beforeend', arg ) ) ) ); return res }
// // Element.prototype.add = 			function( ...args )
// // { return multiple( args, arg=> observe( this, o=> this.insertAdjacentElement('beforeend', arg ) ) ) }
// Element.prototype.add = 			multiArgConcat(function(arg){ this.insertAdjacentElement('beforeend', arg ) })

// Element.prototype.addHTMLTop = 		function( ...args ){ var res = []; args.map( arg=> res = res.concat(observe( this, o=> this.insertAdjacentHTML('afterbegin', arg ) ) ) ); return res }
// Element.prototype.addHTMLAfter = 	function( ...args ){ var res = []; args.map( arg=> res = res.concat(observe( this, o=> this.insertAdjacentHTML('afterend', arg ) ) ) ); return res }
// Element.prototype.addHTMLBefore = 	function( ...args ){ var res = []; args.map( arg=> res = res.concat(observe( this, o=> this.insertAdjacentHTML('beforebegin', arg ) ) ) ); return res }
// Element.prototype.addHTML = 		function( ...args ){ var res = []; args.map( arg=> res = res.concat(observe( this, o=> this.insertAdjacentHTML('beforeend', arg ) ) ) ); return res }

// Element.prototype.addTextTop = 		function( ...args ){ var res = []; args.map( arg=> res = res.concat(observe( this, o=> this.insertAdjacentText('afterbegin', arg ) ) ) ); return res }
// Element.prototype.addTextAfter = 	function( ...args ){ var res = []; args.map( arg=> res = res.concat(observe( this, o=> this.insertAdjacentText('afterend', arg ) ) ) ); return res }
// Element.prototype.addTextBefore = 	function( ...args ){ var res = []; args.map( arg=> res = res.concat(observe( this, o=> this.insertAdjacentText('beforebegin', arg ) ) ) ); return res }
// Element.prototype.addText = 		function( ...args ){ var res = []; args.map( arg=> res = res.concat(observe( this, o=> this.insertAdjacentText('beforeend', arg ) ) ) ); return res }




Element.prototype.addTop = 			multiArgConcat( function( arg ){ this.insertAdjacentElement('afterbegin', 	arg ) })
Element.prototype.addAfter = 		multiArgConcat( function( arg ){ this.insertAdjacentElement('afterend', 	arg ) })
Element.prototype.addBefore = 		multiArgConcat( function( arg ){ this.insertAdjacentElement('beforebegin', 	arg ) })
Element.prototype.add = 			multiArgConcat( function( arg ){ this.insertAdjacentElement('beforeend', 	arg ) })

Element.prototype.addHTMLTop = 		multiArgConcat( function( arg ){ this.insertAdjacentHTML('afterbegin', 	arg ) })
Element.prototype.addHTMLAfter = 	multiArgConcat( function( arg ){ this.insertAdjacentHTML('afterend', 	arg ) })
Element.prototype.addHTMLBefore = 	multiArgConcat( function( arg ){ this.insertAdjacentHTML('beforebegin', arg ) })
Element.prototype.addHTML = 		multiArgConcat( function( arg ){ this.insertAdjacentHTML('beforeend', 	arg ) })

Element.prototype.addTextTop = 		multiArgConcat( function( arg ){ this.insertAdjacentText('afterbegin', 	arg ) })
Element.prototype.addTextAfter = 	multiArgConcat( function( arg ){ this.insertAdjacentText('afterend', 	arg ) })
Element.prototype.addTextBefore = 	multiArgConcat( function( arg ){ this.insertAdjacentText('beforebegin', arg ) })
Element.prototype.addText = 		multiArgConcat( function( arg ){ this.insertAdjacentText('beforeend', 	arg ) })

/*

beforebegin		before
afterbegin		begin
beforeend		end
afterend		after

node.endHTML``
node.endHTML = ``

 */