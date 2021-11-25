import DOC from './DOC.js'

export default (...args)=>
	// [...
		[...DOC('text/html')( ...args ).querySelectorAll('head,body')]
			.reduce( (a,n)=> [...a,...n.childNodes], [] )
	// ]
