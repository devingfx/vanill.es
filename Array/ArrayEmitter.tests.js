/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import { ArrayEmitter } from './EmitterMixin.js'

var res, ref


export default async({test})=>

test `Array/EmitterMixin.js { ArrayEmitter }`( async({test,ok})=> {
	
	ok `function defined` ( ArrayEmitter && typeof ArrayEmitter == 'function' )
	
	await test `standalone`( async ({ok,log,error})=> {
		
		// ok `` ( typeof groupBy(``)  == 'function' )
		
		log `new ArrayEmitter`
		res = new ArrayEmitter
		console.log(res)
		ok `good instanciation + is Array` ( res instanceof Array && res instanceof ArrayEmitter )
		
		var	lengthchanged = false
		,	copiedWithin = false
		,	filled = false
		,	poped = false
		,	pushed = false
		,	reversed = false
		,	shifted = false
		// ,	sorted = false
		,	spliced = false
		,	unshifted = false
		,	setEv = false
		
		res.on( 'lengthchanged', ()=> lengthchanged = true )
		res.on( 'copiedWithin', ()=> copiedWithin = true )
		res.on( 'filled', ()=> filled = true )
		res.on( 'poped', ()=> poped = true )
		res.on( 'pushed', ()=> pushed = true )
		res.on( 'reversed', ()=> reversed = true )
		res.on( 'shifted', ()=> shifted = true )
		// res.on( 'sorted', ()=> sorted = true )
		res.on( 'spliced', ()=> spliced = true )
		res.on( 'unshifted', ()=> unshifted = true )
		res.on( 'set', (...a)=> setEv = a )
		
		
		res.push(1,2,3)
		ok `.push()`( res.length == 3 )
		ok `pushed emitted`( pushed )
		ok `lengthchanged emitted`( lengthchanged )
		lengthchanged = false
		
		res.fill(42)
		ok `.fill()`( res[0] == 42 && res[1] == 42 && res[2] == 42 )
		ok `filled emitted`( filled )
		
		ok `.pop() good result` ( res.pop() == 42 )
		ok `poped emitted`( poped )
		ok `lengthchanged emitted`( lengthchanged )
		lengthchanged = false
		
		res.reverse()
		ok `reversed emitted`( reversed )
		
		// res.sort()
		// ok `sorted emitted`( sorted )
		
		res.splice()
		ok `spliced emitted`( spliced )
		ok `lengthchanged emitted`( lengthchanged )
		lengthchanged = false
		
		res.copyWithin()
		ok `copiedWithin emitted`( copiedWithin )
		
		res.shift()
		ok `shifted emitted`( shifted )
		ok `lengthchanged emitted`( lengthchanged )
		lengthchanged = false
		
		res.unshift(8)
		ok `unshifted emitted`( unshifted )
		ok `lengthchanged emitted`( lengthchanged )
		lengthchanged = false
		
		res.set(2,'aze')
		ok `.set()` ( res.length == 3 && res[2] == 'aze' )
		ok `set emitted`( setEv && setEv[0] == 2 && setEv[1] == 'aze' )
		ok `lengthchanged emitted`( lengthchanged )
		lengthchanged = false
		
	})
	
	await test `as subclass`( async ({ok,log,error})=> {
		
		log `class Test extends ArrayEmitter`
		class Test extends ArrayEmitter {}
		
		res = new Test
		console.log(res)
		ok `good instanciation + is Array` ( res instanceof Array && res instanceof ArrayEmitter )
		
		
		
	})
	
	
})
