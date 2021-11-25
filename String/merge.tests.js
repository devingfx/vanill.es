/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import merge from './merge.js'

var res, ref

export default async({test})=>

test `String/merge.js`( async({test,ok})=> {
	
	ok `function defined` ( merge && typeof merge == 'function' )
	
	const testWithRef = async ( args, ref )=> //console.log(args.map(a=>JSON.stringify(a)))||
		await test `merge(${args.map(a=>JSON.stringify(a)).join(',')}s)`( async ({ok,log,error})=> {
			
			res = args ? merge(...args) : merge()
			// console.log(res)
			ok `should generate a string` ( typeof res == 'string' )
			
			ok `should generate the good string` ( res == ref )
			
		// 	log `test empty string`
		// 	result = entry.reduce( groupBy('') )
		// 	// console.log(result)
		// 	ok `result should be a Map` ( result instanceof Map )
			
		// 	ok `containing 1 item with key => undefined` (
		// 		result.size == 1 
		// 	&&	[...result.keys()][0] == undefined
		// 	)
			
		// 	ok `grouping every items` (
		// 		result.get(undefined).size == 6
		// 	&&	[...result.keys()][0] == undefined
		// 	)
			
		})
	
	test `empty arguments` ( async ({ok,log})=> {
		
		ok `merge()` ( merge() == '' )
		ok `merge('')` ( merge('') == '' )
		ok `merge([''])` ( merge(['']) == '' )
		
	})
	
	test `string or array` ( async ({ok,log})=> {
		
		ok `merge('')` ( merge('') == '' )
		ok `merge([''])` ( merge(['']) == '' )
		ok `merge('aze')` ( merge('aze') == 'aze' )
		ok `merge(['aze'])` ( merge(['aze']) == 'aze' )
		ok `merge(['aze','qwe'])` ( merge(['aze','qwe']) == 'azeqwe' )
		
	})
	
	test `rest arguments` ( async ({ok,log})=> {
		
		ok `merge(['aze','qwe'], 42)` 
		( merge(['aze','qwe'], 42) == 'aze42qwe' )
		
		ok `merge(['aze','qwe','wxc'], 42)` 
		( merge(['aze','qwe','wxc'], 42) == 'aze42qwewxc' )
		
		ok `merge(['aze','qwe','wxc'], 42, 'foo')` 
		( merge(['aze','qwe','wxc'], 42, 'foo') == 'aze42qwefoowxc' )
		
	})
	
	test `as template string tag` ( async ({ok,log})=> {
		
		ok `merge\`aze\`` ( merge`aze` == 'aze' )
		ok `merge\`aze\${42}qwe\`` ( merge`aze${42}qwe` == 'aze42qwe' )
		ok `merge\`aze\${42}qwe\${'foo'}wxc\`` ( merge`aze${42}qwe${'foo'}wxc` == 'aze42qwefoowxc' )
		
	})
	
	test `as sub template string tag` ( async ({ok,log})=> {
		
		const myTag = (...a)=> `my(${merge(...a)})`
		log `myTag = (...a)=> \`my(\${merge(...a)})\``
		
		ok `myTag\`aze\`` ( myTag`aze` == 'my(aze)' )
		ok `myTag\`aze\${42}qwe\`` ( myTag`aze${42}qwe` == 'my(aze42qwe)' )
		ok `myTag\`aze\${42}qwe\${'foo'}wxc\`` ( myTag`aze${42}qwe${'foo'}wxc` == 'my(aze42qwefoowxc)' )
		
	})
	
})
