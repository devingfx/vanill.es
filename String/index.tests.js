/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import mergeTest from './merge.tests.js'
import DateTimeTest from './DateTime.tests.js'
import JSONTest from './JSON.tests.js'
import YAMLTest from './YAML.tests.js'
import MDTest from './MD.tests.js'
import toCamelCase from './toCamelCase.tests.js'
import toKebabCase from './toKebabCase.tests.js'

export default async({test})=>

test `String.js`( async( lvl )=> {
	
	await mergeTest( lvl )
	await DateTimeTest( lvl )
	await JSONTest( lvl )
	await YAMLTest( lvl )
	await MDTest( lvl )
	await toCamelCase( lvl )
	await toKebabCase( lvl )
	
})
