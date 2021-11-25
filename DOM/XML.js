import DOC from './DOC.js'

export default (...args)=>
	[...DOC('application/xml')( ...args ).documentElement.childNodes]

