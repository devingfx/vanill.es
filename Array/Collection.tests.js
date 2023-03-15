/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import { ArrayEmitter } from './EmitterMixin.js'
import Collection from './Collection.js'

var res, ref, col, items
,	sym = Symbol`test-id`
,	dummy = [
	{ id: 'one', [sym]: 'ONE', name: 'Cécile', age: 33, gender: 'female' },
	{ id: 'two', [sym]: 'TWO', name: 'Sandra', age: 32, gender: 'female' },
	{ id: 'three', [sym]: 'THREE', name: 'Caroline', age: 25, gender: 'female' },
	{ id: 'four', [sym]: 'FOUR', name: 'Pierre', age: 16, gender: 'male' },
	{ id: 'five', [sym]: 'FIVE', name: 'Paul', age: 42, gender: 'male' },
	{ id: 'six', [sym]: 'SIX', name: 'Jacques', age: 65, gender: 'male' },
]

class Person {
	'@type' = 'Person'
	id
	[sym]
	name
	age
	gender
}

export default async({test})=>

test `Array/Collection.js`( async({test,ok})=> {
	
	ok `function defined` ( Collection && typeof Collection == 'function' )
	
	await test `instanciation` ( async({log,ok})=> {
		
		log `new Collection()`
		res = new Collection()
		console.log(res)
		
		ok `good instanciation + is Array`
		( res instanceof Array && res instanceof ArrayEmitter && res instanceof Collection )
		
		ok `good length` ( res.length == 0 )
		
		log `new Collection(1,2,3)`
		res = new Collection(1,2,3)
		console.log(res)
		
		ok `good instanciation + is Array`
		( res instanceof Array && res instanceof ArrayEmitter && res instanceof Collection )
		
		ok `good length` ( res.length == 3 )
		
		log `new Collection( ...dummy )`
		res = new Collection( ...dummy )
		console.log(res)
		
		ok `good instanciation + is Array`
		( res instanceof Array && res instanceof ArrayEmitter && res instanceof Collection )
		
		ok `good length` ( res.length == 6 )
		
		
	})
	
	await test `whole collection methods` ( async({log,ok})=> {
		
		col = new Collection( ...dummy )
		
		var	replaced = false
		col.on( 'replaced', old=> replaced = old )
		
		log `.replace( 1,2,3 )`
		col.replace( 1,2,3 )
		
		ok `replace all items` 
		( col.length == 3 && col[0] === 1  && col[1] === 2  && col[2] === 3 )
		ok `replaced emitted`( replaced )
		replaced = false
		
		
		log `.empty()`
		col.empty()
		
		ok `replace all items` 
		( col.length == 0 )
		ok `replaced emitted`( replaced )
		replaced = false
		
		
	})
	
	await test `items methods` ( async({log,ok})=> {
		
		col = new Collection( ...dummy )
		
		log `res.get(1)`
		res = col.get(1)
		
		ok `return good object` 
		( JSON.stringify(res) == JSON.stringify(dummy[1]) )
		
		log `res.primary = 'id'`
		log `res.get('three')`
		col.primary = 'id'
		res = col.get('three')
		
		ok `return good object`
		( JSON.stringify(res) == JSON.stringify(dummy[2]) )
		
		log `res.primary = symbol`
		log `res.get('TWO')`
		col.primary = sym
		res = col.get('TWO')
		
		ok `return good object`
		( JSON.stringify(res) == JSON.stringify(dummy[1]) )
		
		// @TODO Do test on
		// insertAt( i, ...items )
		// replaceAt( i, ...items )
		// remove( ...items )
		// removeAt( ...itemIds )
		
		
	})
	
	await test `type enforcement methods` ( async({log,ok})=> {
		
		log `enforcing type Person`
		col = new Collection().type( Person )
		
		
		col.push( dummy[0] )
		ok `pushed a Person`( col[0] instanceof Person )
		
		col.push( dummy[1], dummy[2], dummy[3] )
		ok `pushed many Persons` 
		( col[1] instanceof Person && col[2] instanceof Person && col[3] instanceof Person )
		
		
		col.unshift( dummy[4] )
		ok `unshifted a Person`( col[0] instanceof Person )
		
		col.unshift( dummy[5], dummy[0], dummy[1] )
		ok `unshifted many Persons` 
		( col[0] instanceof Person && col[1] instanceof Person && col[2] instanceof Person )
		
		
		col.set( 0, dummy[3] )
		ok `set a Person`( col[0] instanceof Person )
		
		
		col.splice( 0, 1, dummy[3] )
		ok `spliced a Person`( col[0] instanceof Person )
		
	})
	
	await test `extra methods` ( async({test,ok})=> {
		
		// pluck( key )
		// tap( fn )
		// groupBy( prop )
		
		
	})
	
	await test `iterator (for of)` ( async({test,ok})=> {
		
		col = new Collection( ...dummy )
		
		var ArrayIterator = [].values().__proto__
		
		var viterator = col.values()
		ok `.values() is an ArrayIterator` ( viterator.__proto__ == ArrayIterator )
		
		var kiterator = col.keys()
		ok `.keys() is an ArrayIterator` ( kiterator.__proto__ == ArrayIterator )
		
		var eiterator = col.entries()
		ok `.entries() is an ArrayIterator` ( eiterator.__proto__ == ArrayIterator )
		
		

		console.log(eiterator.next().value)
		// expected output: Array [0, "a"]

		console.log(eiterator.next().value)
		// expected output: Array [1, "b"]

		for (let person of viterator) {
			console.log(person)
		}  //"a" "b" "c" "d" "e"
		
		var i = 0
		
		for( items of col )
			i++
		
		ok `good length` ( i === col.length )
	})
	
	
})



