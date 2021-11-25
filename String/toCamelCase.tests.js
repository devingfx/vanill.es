/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import toCamelCase from './toCamelCase.js'

var res, ref

export default async({test})=>

	await test `toCamelCase`( async ({ok})=> {
		
		
		ok `underscores` (
			toCamelCase('some_database_field_name')
			== 'someDatabaseFieldName'
		)
		
		ok `spaces` (
			toCamelCase('Some label that needs to be camelized')
			== 'someLabelThatNeedsToBeCamelized'
		)
		
		ok `from kebab case` (
			toCamelCase('some-javascript-property')
			== 'someJavascriptProperty'
		)
		
		ok `mixed` (
			toCamelCase('some-mixed_string with spaces_underscores-and-hyphens')
			== 'someMixedStringWithSpacesUnderscoresAndHyphens'
		)
		
	})
	