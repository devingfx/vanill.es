/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import selTest from './selectors.tests.js'
import parserTest from './DOC.tests.js'

export default async({test})=>

test `DOM.js`( async( lvl )=> {
	
	await selTest( lvl )
	await parserTest( lvl )
	
})
