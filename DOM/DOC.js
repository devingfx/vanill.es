import merge from '../String/merge.js'


//Issue: don't init customElements in foreign documents, neither in <template> in document or not, only doc.createElement init customElement or .append
//Issue: can't placehold "<wbr i/>" in attributes with XML parser
const DOC = ( mime = 'text/html')=> (...args)=> {
				// Create real DOM, adding root tag and namespaces
				const root = /html/.test( mime ) ? 'html' : /svg/.test( mime ) ? 'svg' : 'root'
				,	  nss = /html/.test( mime ) ? HTMLns : /svg/.test( mime ) ? SVGns : XMLns
				,	  doc = DOC.parser.parseFromString(
					  	`<${root} ${xmlns(nss)}>${merge(...args)}</${root}>`
					  , mime )
				return doc
}
//                 (new DOMParser).parseFromString(
// 					String.merge(...args),
// 					mime || 'text/html'
// 				)
DOC.parser = new DOMParser


const html = "http://www.w3.org/1999/xhtml"
,	  xmlnsns = 'http://www.w3.org/1999/xmlns'
,	  js = 'javascript:'
,	  svg = 'http://www.w3.org/2000/svg'
,	  xlink = 'http://www.w3.org/1999/xlink'

const XMLns = { html, svg, xlink }
const HTMLns = { '': html, svg, xlink, js }
const SVGns = { '': svg, xlink, html }

const xmlns = nss=> Object.keys( nss ).filter( ns=> ns != 'xmlns' )
						.map( ns=> `xmlns${ns?':'+ns:''}="${nss[ns]}"` )
						.join(' ')

// const xmlns = ns=> typeof ns != 'undefined'
						// ? `xmlns${ns?':'+ns:''}="${xmlns[ns]}"`
						// : Object.keys( xmlns ).filter( ns=> ns != 'xmlns' ).map( xmlns ).join(' ')

// xmlns[''] = "http://www.w3.org/1999/xhtml"
// xmlns.xmlns = 'http://www.w3.org/1999/xmlns'
// xmlns.js = 'javascript:'
// xmlns.svg = 'http://www.w3.org/2000/svg'
// xmlns.xlink = 'http://www.w3.org/1999/xlink'

export { xmlns }
export default DOC