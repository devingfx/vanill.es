/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import JSON from './JSON.js'

var res, ref

export default async({test})=>

	await test `JSON`( async ({test,ok,log,error})=> {
		
		await test `JSON global retro-compatibility`( ({ok,log,error})=> {
		
			ok `JSON.parse` ( JSON.parse )
			ok `JSON.parse()` ( JSON.parse(`"foo"`) == "foo" )
			ok `JSON.stringify` ( JSON.stringify )
			ok `JSON.stringify()` ( JSON.stringify("foo") == '"foo"' )
		
		})
		
		await test `JSON tag`( ({ok,log,error})=> {
		
			ok `function defined` ( JSON && typeof JSON == 'function' )
			
			ok `normal call 1 string` ( JSON(`"hello world !"`) == "hello world !" )
			ok `normal call arrays` ( JSON([`"hello `,` !"`],"world") == "hello world !" )
			
			ok `string tag call simple` ( JSON`"hello world !"` == "hello world !" )
			ok `string tag call 1 prop` ( JSON`"hello ${'world'} !"` == "hello world !" )
			ok `string tag call complex` ( JSON`"he${'ll'}o ${'world'}${[' ','!','"'].join('')}` == "hello world !" )
			
		
		})
		
	})
	