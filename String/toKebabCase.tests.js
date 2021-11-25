/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import toKebabCase from './toKebabCase.js'

var res, ref

export default async({test})=>

	await test `toKebabCase`( async ({ok})=> {
		
		
		ok `from camel case` (
			toKebabCase('camelCase')
			== 'camel-case'
		)
		
		ok `spaces` (
			toKebabCase('some text')
			== 'some-text'
		)
		
		ok `mixed` (
			toKebabCase('AllThe-small Things')
			== 'all-the-small-things'
		)
		
		ok `mixed` (
			toKebabCase('some-mixed_string With spaces_underscores-and-hyphens')
			== 'some-mixed-string-with-spaces-underscores-and-hyphens'
		)
		
		ok `uppercase` (
			toKebabCase('IAmEditingSomeXMLAndHTML')
			== 'i-am-editing-some-xml-and-html'
		)
		
	})
	