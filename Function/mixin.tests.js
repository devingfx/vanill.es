/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import mixin from './mixin.js'

var res, ref

export default async({test})=>

	await test `Function/mixin`( async ({test,ok,log,error})=> {
		
		ok `function defined` ( mixin && typeof mixin == 'function' )
		
		const A = class A { isA = true }
		const B = parent=> class B extends parent { isB = true }
		const C = parent=> class C extends parent { isC = true }
		
		log `mixin.call(A, B)`
		res = new ( mixin.call(A, B) )
		
		ok `well mixed` ( res.isA && res.isB )
		
		log `mixin.call(A, B, C)`
		res = new ( mixin.call(A, B, C) )
		
		ok `well mixed` ( res.isA && res.isB && res.isC )
		
		Object.assign( Function.prototype, {mixin} )
		log `A.mixin(B)`
		res = new ( A.mixin(B) )
		
		ok `well mixed` ( res.isA && res.isB )
		
		
		log `A.mixin(B, C)`
		res = new ( A.mixin(B, C) )
		
		ok `well mixed` ( res.isA && res.isB && res.isC )
		
		
		log `class Foo extends A.mixin(B, C) {}`
		res = new ( class Foo extends A.mixin(B, C) { isFoo = true } )
		
		ok `well mixed` ( res.isFoo && res.isA && res.isB && res.isC )
		
	})
	