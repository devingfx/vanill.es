import escapeRegExp from './escapeRegExp.js'

/**
 * @from https://github.com/denorg/dpx/blob/master/src/utils.ts
 * Trim the input string with specified char.
 * @param input input string.
 * @param char char to trim.
 */
export default function trimChar( input, char )
{
	char = escapeRegExp( char )
	var regEx = new RegExp( "^[" + char + "]+|[" + char + "]+$", "g" )
	return input.replace( regEx, "" )
}