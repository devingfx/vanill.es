import merge from "./merge.js"





const importScript = url=> {
	document.head.insertAdjacentHTML('beforeend',
	`<script src="${url}"></script>`)
}


const MD = (...a)=> MD.parse( merge(...a) )
// MD.stringify = obj=> new TurndownService().turndown( obj )
MD.parse = str=> new showdown.Converter().makeHtml( str )
MD.import = ()=> {
	importScript('https://unpkg.com/showdown/dist/showdown.min.js') //marche pas
// ,	import('https://unpkg.com/turndown/lib/turndown.browser.umd.js')
}

export default MD