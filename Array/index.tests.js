/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import groupByTest from './reduce/groupBy.tests.js'
import ArrayEmitterTest from './ArrayEmitter.tests.js'
import EmitterMixinTest from './EmitterMixin.tests.js'
import CollectionTest from './Collection.tests.js'

export default async({test})=>

test `Array.js`( async( lvl )=> {
	
	await groupByTest( lvl )
	await ArrayEmitterTest( lvl )
	await EmitterMixinTest( lvl )
	await CollectionTest( lvl )
	
})
