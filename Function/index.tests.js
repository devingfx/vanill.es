/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import mixinTest from './mixin.tests.js'

export default async({test})=>

test `Function.js`( async( lvl )=> {
	
	await mixinTest( lvl )
	
})
