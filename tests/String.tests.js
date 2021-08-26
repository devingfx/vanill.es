/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	

import { JSON, YAML, MD, D, T, merge } from '../String.js'

// let dir, file, list, gestureNeeded
// window.fs = fs
// console.log( fs.opendir('/'))

export default test `String.js`( async({test})=> {
	
	await test `merge`( async ({ok,log,error})=> {
		
		ok `function defined` ( merge && typeof merge == 'function' )
		
		ok `normal call 1 string` ( merge(`hello world !`) == "hello world !" )
		ok `normal call arrays` ( merge([`hello `,` !`],"world") == "hello world !" )
		
		ok `string tag call simple` ( merge`hello world !` == "hello world !" )
		ok `string tag call 1 prop` ( merge`hello ${'world'} !` == "hello world !" )
		ok `string tag call complex` ( merge`he${'ll'}o ${'world'}${[' ','!'].join('')}` == "hello world !" )
		
		const TEST = (...args)=> merge(...args)
		ok `string tag pass arguments` ( TEST`he${'ll'}o ${'world'}${[' ','!'].join('')}` == "hello world !" )
		
		
	})
	
	await test `D & T (Date & Time)`( async ({ok})=>{
	
		ok `D output Dates` ( D`2020` instanceof Date )
		ok `good date.getTime with year` ( D`2020`.getTime() == 1577836800000 )
		ok `good date.getTime with year-month` ( D`2020-03`.getTime() == 1583020800000 )
		ok `good date.getTime with year-month-day` ( D`2020-03-25`.getTime() == 1585094400000 )
		
		let thatDay = T`2020-03-25`
		
		ok `T output functions` ( thatDay && typeof thatDay == 'function' )
		
		ok `good date.time with empty time` ( thatDay``.getTime() == 1585090800000 )
		ok `good date.time with hour` ( thatDay`12:`.getTime() == 1585134000000 )
		ok `good date.time with hour:minute` ( thatDay`12:42`.getTime() == 1585136520000 )
		ok `good date.time with hour:minute:second` ( thatDay`12:34:56`.getTime() == 1585136096000 )
		ok `good date.time with hour:minute:second:millis` ( thatDay`12:34:56:789`.getMilliseconds() == 789 )
		
	})
	
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
			
			ok `` ( JSON`"foo"` == "foo" )
		
		})
		
	})
	
	await test `YAML`( async ({test,ok})=>{
		
		ok `function defined` ( YAML && typeof YAML == 'function' )
		
		await test `import` ( async ({log,ok})=> {
		
			try{
				YAML()
			}catch(e){
				ok `impl. not loaded` ( e )
			}
		
			log `await YAML.import()`
			await YAML.import()
			
			ok `impl. loaded globally` ( jsyaml )
		
		})
		
		ok `parse a string` ( YAML`hello world !` == "hello world !" )
		ok `parse an object` ( YAML`hello: world !`.hello == "world !" )
		
	})
	
	await test `MD`( async ({ok})=>{})
	
})
