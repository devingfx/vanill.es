/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import { EmitterMixin } from './EmitterMixin.js'

var res, ref


export default async({test})=>

test `Array/EmitterMixin.js { EmitterMixin }`( async({test,ok})=> {
	
	ok `function defined` ( EmitterMixin && typeof EmitterMixin == 'function' )
	
	await test `standalone`( async ({ok,log,error})=> {
		
		// ok `` ( typeof groupBy(``)  == 'function' )
		
		log `new EmitterMixin.new`
		res = new EmitterMixin.new
		console.log(res)
		// ok `good instanciation` ( res instanceof EmitterMixin )
		
		
		
	})
	
	await test `as subclass`( async ({ok,log,error})=> {
		
		log `class Test extends EmitterMixin(class{})`
		class Test extends EmitterMixin(Object) {}
		
		res = new Test
		console.log(res)
		// ok `good instanciation` ( res instanceof EmitterMixin )
		
		
		
	})
	
	
})
