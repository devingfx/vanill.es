/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	

import { $, $$ } from './selectors.js'

var res, ref

export default ({test})=>

test `DOM/selectors.js`( async({test})=> {
	
	await test `Query selectors`( async ({test})=> {
	
		await test `$ single`( async ({test,ok})=> {
		
			
			const testQuery = (ss,...pp)=> (res,q)=>
				test(ss,...pp) ( async ({ok})=> {
					let exp = document.querySelector( q )
					ok `results match with native` ( res == exp )
				})
			
			ok `function defined` ( $ && typeof $ == 'function' )
			
			testQuery `normal call 1 string` ( $(`head`) , `head`)
			testQuery `normal call arrays` ( $([`he`,`d`],"a") , `head`)
			testQuery `string tag call simple` ( $`head` , `head`)
			testQuery `string tag call 1 prop`( $`h${'ea'}d` , `head`)
			testQuery `string tag call complex` ( $`h${'e'}a${['d',' '].join(' ')}`, `head`)
			
		})
		await test `$$ multiple`( async ({test,ok})=> {
			
			const testQuery = (ss,...pp)=> (res,q)=>
				test(ss,...pp) ( async ({ok})=> {
					let exp = document.querySelectorAll( q )
					ok `result is array` ( Array.isArray(res) )
					ok `result has good length` ( res.length == exp.length )
					ok `results match with native` ( res.every( (item,i)=> exp[i] == item ) )
					
				})
			
			ok `function defined` ( $$ && typeof $$ == 'function' )
			
			testQuery `normal call 1 string` ( $$(`head > *`) , `head > *`)
			testQuery `normal call arrays` ( $$([`he`,`d > *`],"a") , `head > *`)
			testQuery `string tag call simple` ( $$`head > *` , `head > *`)
			testQuery `string tag call 1 prop`( $$`head${' > '}*` , `head > *`)
			testQuery `string tag call complex` ( $$`he${'ad'} ${['>','*'].join(' ')}`, `head > *`)
			
		})
		
	})
	
})
