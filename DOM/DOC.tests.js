/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	

import { xmlns, DOC, XML, XHTML, HTML, SVG } from './index.js'

var res, ref

export default ({test})=>

test `DOM/<DOC|HTML|XHTML|XML|SVG>.js`( async({test})=> {
	
	
	await test `DOM parser`( async ({test})=>{
	
		await test `xmlns`( async ({ok,log,error})=> {
		
			ok `function defined` ( xmlns && typeof xmlns == 'function' )
			
			res = xmlns({aze:'qwe',foo:'bar','':'bloop'})
			
			ok `return string` ( typeof res == 'string' )
			ok `return good string` ( res == 'xmlns:aze="qwe" xmlns:foo="bar" xmlns="bloop"' )
			
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
	
})
