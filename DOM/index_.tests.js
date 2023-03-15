/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	

import { $, $$, xmlns, DOC, XML, XHTML, HTML, SVG } from './index_.js'
//Node.prototype.$ .$$ .add

export default ({test})=>

test `DOM.js`( async({test})=> {
	
	await test `Query selectors`( async ({test})=> {
	
		await test `<Node>.$`( async ({test,ok})=> {
			
			const testQuery = (...pp)=> (res,q,node)=>
				test(...pp) ( async ({ok})=> {
					let exp = node.querySelector( q )
					ok `results match with native` ( res == exp )		
				})
			
			
			ok `function defined on <Node>s` ( '$' in document.body && typeof document.body.$ == 'function' )
			ok `function defined on document` ( '$' in document && typeof document.$ == 'function' )
			
			testQuery `normal call 1 string on node` ( document.head.$(`script`) , `script`, document.head )
			testQuery `normal call 1 string on document` ( document.$(`head`) , `head`, document )
			
			testQuery `string tag call on node` ( document.head.$`script` , `script`, document.head )
			testQuery `string tag call on document` ( document.$`head` , `head`, document )
			
			// ok `normal call 1 string` ( document.$(`head`) == document.head )
			// ok `normal call arrays` ( document.$([`he`,`d`],"a") == document.head )
			
			// ok `string tag call simple` ( document.$`head` == document.head )
			// ok `string tag call 1 prop` ( document.$`he${'a'}d` == document.head )
			// ok `string tag call complex` ( document.$`ht${'m'}l h${'e'}${['a','d'].join('')}` == document.head )
			
		})
		
		await test `<Node>.$$`( async ({test,ok})=> {
		
			const testQuery = (ss,...pp)=> (res,q,node)=>
				test(ss,...pp) ( async ({ok})=> {
					let exp = node.querySelectorAll( q )
					ok `result is array` ( Array.isArray(res) )
					ok `result has good length` ( res.length == exp.length )
					ok `results match with native` ( res.every( (item,i)=> exp[i] == item ) )
					
				})
			
			ok `function defined on <Node>s` ( '$$' in document.body && typeof document.body.$$ == 'function' )
			ok `function defined on document` ( '$$' in document && typeof document.$$ == 'function' )
			
			testQuery `normal call 1 string on node` ( document.head.$$(`script`) , `script`, document.head )
			testQuery `normal call 1 string on document` ( document.$$(`head`) , `head`, document )
			
			testQuery `string tag call on node` ( document.head.$$`script` , `script`, document.head )
			testQuery `string tag call on document` ( document.$$`head` , `head`, document )
			
			// let res = document.$$(`head > script`)
			// ,	exp = document.querySelectorAll(`head > script`)
			
			// ok `result is an array` ( Array.isArray(res) )
			// ok `result have good length` ( res.length == exp.length )
			
			// ok `normal call 1 string` ( document.body.$$(`head > script`) == "hello world !" )
			// ok `normal call arrays` ( document.body.$$([`hello `,` !`],"world") == "hello world !" )
			
			// ok `string tag call simple` ( document.body.$$`hello world !` == "hello world !" )
			// ok `string tag call 1 prop` ( document.body.$$`hello ${'world'} !` == "hello world !" )
			// ok `string tag call complex` ( document.body.$$`he${'ll'}o ${'world'}${[' ','!'].join('')}` == "hello world !" )
			
		})
		
		await test `global $`( async ({test,ok})=> {
		
			
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
		await test `global $$`( async ({test,ok})=> {
			
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
	
	await test `DOM parser`( async ({test})=>{
	
		await test `xmlns`( async ({ok,log,error})=> {
		
			ok `function defined` ( xmlns && typeof xmlns == 'function' )
			
			
		})
		
		await test `DOC tag`( async ({ok,log,error})=> {
		
			ok `function defined` ( DOC && typeof DOC == 'function' )
			
			
		})
		
		await test `XML tag`( async ({ok,log,error})=> {
		
			ok `function defined` ( XML && typeof XML == 'function' )
			
			
		})
	
		await test `XHTML tag`( async ({ok,log,error})=> {
		
			ok `function defined` ( XHTML && typeof XHTML == 'function' )
			
			
		})
		
		await test `HTML tag`( async ({ok,log,error})=> {
		
			ok `function defined` ( HTML && typeof HTML == 'function' )
			
			
		})
		
		await test `SVG tag`( async ({ok,log,error})=> {
		
			ok `function defined` ( SVG && typeof SVG == 'function' )
			
			
		})
	})
	
	await test `<Element>.add*`( async ({ok})=>{})
	
})
