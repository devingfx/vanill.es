
/* utils */
import callAndCollect from './callAndCollect.js'

// const multiple = ( args, fn )=> {
// 	var res = []
// 	args.map( arg=> res = res.concat(fn(arg)) )
// 	return res
// }
const multiArgConcat = ( fn )=> {

	return function( ...args )
	{
		return callAndCollect.addedChilds( fn.name == 'self' ? this : this.parentNode, o=> 
			args.map( fn.bind(this) )
		)
	}
}
/* Element shortcuts */

// Element.prototype.addTop = 			function( ...args ){ var res = []; args.map( arg=> res = res.concat(callAndCollect( this, o=> this.insertAdjacentElement('afterbegin', arg ) ) ) ); return res }
// Element.prototype.addAfter = 		function( ...args ){ var res = []; args.map( arg=> res = res.concat(callAndCollect( this, o=> this.insertAdjacentElement('afterend', arg ) ) ) ); return res }
// Element.prototype.addBefore = 		function( ...args ){ var res = []; args.map( arg=> res = res.concat(callAndCollect( this, o=> this.insertAdjacentElement('beforebegin', arg ) ) ) ); return res }
// // Element.prototype.add = 			function( ...args ){ var res = []; args.map( arg=> res = res.concat(callAndCollect( this, o=> this.insertAdjacentElement('beforeend', arg ) ) ) ); return res }
// // Element.prototype.add = 			function( ...args )
// // { return multiple( args, arg=> callAndCollect( this, o=> this.insertAdjacentElement('beforeend', arg ) ) ) }
// Element.prototype.add = 			multiArgConcat(function(arg){ this.insertAdjacentElement('beforeend', arg ) })

// Element.prototype.addHTMLTop = 		function( ...args ){ var res = []; args.map( arg=> res = res.concat(callAndCollect( this, o=> this.insertAdjacentHTML('afterbegin', arg ) ) ) ); return res }
// Element.prototype.addHTMLAfter = 	function( ...args ){ var res = []; args.map( arg=> res = res.concat(callAndCollect( this, o=> this.insertAdjacentHTML('afterend', arg ) ) ) ); return res }
// Element.prototype.addHTMLBefore = 	function( ...args ){ var res = []; args.map( arg=> res = res.concat(callAndCollect( this, o=> this.insertAdjacentHTML('beforebegin', arg ) ) ) ); return res }
// Element.prototype.addHTML = 		function( ...args ){ var res = []; args.map( arg=> res = res.concat(callAndCollect( this, o=> this.insertAdjacentHTML('beforeend', arg ) ) ) ); return res }

// Element.prototype.addTextTop = 		function( ...args ){ var res = []; args.map( arg=> res = res.concat(callAndCollect( this, o=> this.insertAdjacentText('afterbegin', arg ) ) ) ); return res }
// Element.prototype.addTextAfter = 	function( ...args ){ var res = []; args.map( arg=> res = res.concat(callAndCollect( this, o=> this.insertAdjacentText('afterend', arg ) ) ) ); return res }
// Element.prototype.addTextBefore = 	function( ...args ){ var res = []; args.map( arg=> res = res.concat(callAndCollect( this, o=> this.insertAdjacentText('beforebegin', arg ) ) ) ); return res }
// Element.prototype.addText = 		function( ...args ){ var res = []; args.map( arg=> res = res.concat(callAndCollect( this, o=> this.insertAdjacentText('beforeend', arg ) ) ) ); return res }



/**
 * Each insertion methods can take several arguments and return added Nodes or Texts nodes.
 * @exemple myElem.addTop( elem1, elem2, elem3 )
 * @exemple myElem.addTop( ...elems )
 * @exemple let nodes = myElem.addHTMLAfter( '<br>', '<hr>' )
 */
Element.prototype.addTop = 			multiArgConcat( function self( arg ){ this.insertAdjacentElement('afterbegin', 	arg ) })
Element.prototype.addAfter = 		multiArgConcat( function parent( arg ){ this.insertAdjacentElement('afterend', 	arg ) })
Element.prototype.addBefore = 		multiArgConcat( function parent( arg ){ this.insertAdjacentElement('beforebegin', 	arg ) })
Element.prototype.add = 			multiArgConcat( function self( arg ){ this.insertAdjacentElement('beforeend', 	arg ) })

Element.prototype.addHTMLTop = 		multiArgConcat( function self( arg ){ this.insertAdjacentHTML('afterbegin', 	arg ) })
Element.prototype.addHTMLAfter = 	multiArgConcat( function parent( arg ){ this.insertAdjacentHTML('afterend', 	arg ) })
Element.prototype.addHTMLBefore = 	multiArgConcat( function parent( arg ){ this.insertAdjacentHTML('beforebegin', arg ) })
Element.prototype.addHTML = 		multiArgConcat( function self( arg ){ this.insertAdjacentHTML('beforeend', 	arg ) })

Element.prototype.addTextTop = 		multiArgConcat( function self( arg ){ this.insertAdjacentText('afterbegin', 	arg ) })
Element.prototype.addTextAfter = 	multiArgConcat( function parent( arg ){ this.insertAdjacentText('afterend', 	arg ) })
Element.prototype.addTextBefore = 	multiArgConcat( function parent( arg ){ this.insertAdjacentText('beforebegin', arg ) })
Element.prototype.addText = 		multiArgConcat( function self( arg ){ this.insertAdjacentText('beforeend', 	arg ) })

/* ideas

beforebegin		before
afterbegin		top
beforeend		end
afterend		after

node.endHTML = `` >> can't return added nodes

node.beforeHTML`<br>`
node.topHTML`<br>`
node.endHTML`<br>`
node.afterHTML`<br>`

 */