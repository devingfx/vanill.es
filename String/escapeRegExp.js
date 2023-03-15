// @from https://github.com/denorg/dpx/blob/master/src/utils.ts
export default function escapeRegExp( input )
{
	return input.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&" )
}