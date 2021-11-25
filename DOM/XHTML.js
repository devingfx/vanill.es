import DOC from './DOC.js'

export default (...args)=>
	[...DOC('application/xhtml+xml')( ...args ).documentElement.childNodes]
