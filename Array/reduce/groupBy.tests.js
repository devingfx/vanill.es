/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import groupBy from './groupBy.js'

var result, refResult
,	entry = [
		{ name: 'Toto', group: 1, age: 32 },
		{ name: 'Tata', group: 7, age: 52 },
		{ name: 'Tutu', group: 2, age: 27 },
		{ name: 'Tata', group: 1, age: 78 },
		{ name: 'Tutu', group: 7, age: 5 },
		{ name: 'Titi', group: 1, age: 45 },
	]

export default async({test})=> test `Array/reduce/groupBy.js`( async({test,ok})=> {
	
	ok `function defined` ( groupBy && typeof groupBy == 'function' )
	
	await test `groupBy('')`( async ({ok,log,error})=> {
		
		ok `should generate a function` ( typeof groupBy(``)  == 'function' )
		
		log `test empty string`
		result = entry.reduce( groupBy('') )
		// console.log(result)
		ok `result should be a Map` ( result instanceof Map )
		
		ok `containing 1 item with key => undefined` (
			result.size == 1 
		&&	[...result.keys()][0] == undefined
		)
		
		ok `grouping every items` (
			result.get(undefined).size == 6
		&&	[...result.keys()][0] == undefined
		)
		
	})
	
	await test `groupBy('age')`( async ({ok,log,error})=> {
		
		ok `should generate a function` ( typeof groupBy(`age`)  == 'function' )
		
		log `test age prop`
		result = entry.reduce( groupBy('age') )
		// console.log(result)
		ok `result should be a Map` ( result instanceof Map )
		
		refResult = entry.map( item=> item.age )
		
		ok `containing 6 items` (
			result.size == 6 
		&&	[...result.keys()].every( (age,i)=> refResult[i] == age )
		)
		
		ok `with 1 item each` (
			result.get(32).size == 1
		&&	result.get(52).size == 1
		&&	result.get(27).size == 1
		&&	result.get(78).size == 1
		&&	result.get(5).size == 1
		&&	result.get(45).size == 1
		)
		
	})
	
	await test `groupBy('group')`( async ({ok,log,error})=> {
		
		ok `should generate a function` ( typeof groupBy(`group`)  == 'function' )
		
		log `test group prop`
		result = entry.reduce( groupBy('group') )
		// console.log(result)
		ok `result should be a Map` ( result instanceof Map )
		
		refResult = [1,7,2]
		
		ok `containing 3 items` (
			result.size == 3
		&&	[...result.keys()].every( (age,i)=> refResult[i] == age )
		)
		
		ok `with 3,2,1 item each` (
			result.get(1).size == 3
		&&	result.get(7).size == 2
		&&	result.get(2).size == 1
		)
		
	})
	
	await test `groupBy('name')`( async ({ok,log,error})=> {
		
		ok `should generate a function` ( typeof groupBy(`name`)  == 'function' )
		
		log `test name prop`
		result = entry.reduce( groupBy('name') )
		// console.log(result)
		ok `result should be a Map` ( result instanceof Map )
		
		refResult = 'Toto Tata Tutu Titi'.split(' ')
		
		ok `containing 4 items` (
			result.size == 4
		&&	[...result.keys()].every( (age,i)=> refResult[i] == age )
		)
		
		ok `with 1,2,2,1 items each` (
			result.get('Toto').size == 1
		&&	result.get('Tata').size == 2
		&&	result.get('Tutu').size == 2
		&&	result.get('Titi').size == 1
		)
		
	})
	
		// { name: 'Toto', group: 1, age: 32 },
		// { name: 'Tata', group: 7, age: 52 },
		// { name: 'Tutu', group: 2, age: 27 },
		// { name: 'Tata', group: 1, age: 78 },
		// { name: 'Tutu', group: 7, age: 5 },
		// { name: 'Titi', group: 1, age: 45 },
	
	await test `groupBy('name')( existingMap, newItem )`( async ({ok,log,error})=> {
		
		// groupBy('prop')( existingMap, newItem )
		
	})
	
})
