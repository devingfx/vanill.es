import DOC from './DOC.js'

// Wrong: works on string
export default (...args)=>
	[...DOC('image/svg+xml')( ...args ).documentElement.childNodes]
	// [...DOC('image/svg+xml')`<svg xmlns="http://www.w3.org/2000/svg">${String.merge(...args)}</svg>`
	// .documentElement.childNodes]
	// .querySelectorAll(':root>*')]
