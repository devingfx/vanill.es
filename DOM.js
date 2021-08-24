import '../es-playground/drafts/Object.getPrototypeChainOf.js'
import './String.js'

/*@TODO impl DOM a rapatrier
for reg in 'DOM\s*=' 'XML\s*=' 'HTML\s*=' 'live\s*=' 'XHTML\s*=' 'SVG\s*=' '${1,2}\s*=' ; do /g/dev/search '.*' js "$reg" > /g/dev/search.saved/"$(echo "$reg" | sed 's/[=;:!*%^\/?]//g')".txt ; done
	/g/dev/search '.*' js "$reg" > /g/dev/search.saved/"$(echo "$reg" | sed 's/[=;:!*%^\/?]//g')".txt
done
@see donc /g/dev/search.saved/

*/

/* from yamler/DOM.js
const DOM = mime=> (ss,...pp)=> {

		// Compile place-holders depending on DOM position (tagname, attribute, childnode)
		let ml = '', lm = '', reg, isTag, inTag, inAttr, po
		ss.map( (s,i)=> {
			ml += s
			lm = invStr(s) + lm
			// console.log(i,ml,pp[i])
			reg = /[<>]/.exec(lm)
			inTag = reg ? (reg[0] == '<') : false
			isTag = ml.endsWith('<') || ml.endsWith('</')
			reg = /"/.exec(s)
			inAttr = reg ? !inAttr : inAttr
			// console.log(lm,reg,{isTag,inTag,inAttr})
			
			if( typeof pp[i] != 'undefined' )
				po = isTag
						? (pp[i]||'') 
					: inTag
						? inAttr
							? `$\{pp-${i}}`
							: `pp-${i}=""`
					: `<n i="${i}"></n>`
			else
				po = ''
			ml += po
			lm = invStr(po) + lm
		})

		// Create real DOM, adding root tag and namespaces
		const root = /html/.test( mime ) ? 'html' : /svg/.test( mime ) ? 'svg' : 'root',
			doc = (new DOMParser).parseFromString(
				`<${root} ${xmlns()}>${ml}</${root}>`
				, mime)
		
		// Resolve childNode place-holders (TODO listen change)
		;[...doc.querySelectorAll('n')]
			.map( n=> {
				let o = pp[n.attributes.i.value]
				,	types = o.constructor.protoChain
						.map( cls=> DOM[mime][cls.name] || DOM[cls.name] )
						.filter( o=>o )
						.reverse()
				n.replaceWith(
					types.length
						? types.reduce( (_o,t)=> t( o ) , o )
						: DOM.String( o )
				)
			})
		
		// Resolve attribute place-holders (TODO listen change)
		;[...doc.querySelectorAll('*')]
			.map( node=> 
				[...node.attributes]
					.filter( att=> att.name.startsWith('pp-') || /\$\{pp-\d+\}/.test(att.value) )
					.map( att=> {
						if( att.name.startsWith('pp-') )
						{
							// console.log(att.name.split('-')[1])
							let po = pp[att.name.split('-')[1]]
							// console.log(po)
							node.removeAttributeNode( att )
							let attrs = typeof po == 'string'
											? [...XML([`<node ${po}/>`])[0].attributes]
										: typeof po == 'object'
											? Array.isArray(po)
												? po
												: Object.keys(po).map( k=> ({name:k,value:po[k]}) )
										: po
							// console.log(attrs)
							attrs.map( att=> node.setAttribute(att.name, att.value) )
						}
						else
						{
							// console.log(att.value, att.value.replace( /\$\{pp-(\d+)\}/g, (s,i)=> pp[i]))
							att.value = att.value.replace( /\$\{pp-(\d+)\}/g, (s,i)=> pp[i])
						}
						// node._rawAttributes = [...node.attibutes]
					})
			)

		// let res = new DocumentFragment
		// ;( mime == 'text/html' 
		let res = ( mime == 'text/html' 
				? [...doc.head.childNodes,...doc.body.childNodes]
				: [...doc.documentElement.childNodes]
			)
				.filter( node=> node.localName == 'parsererror' ? XML.error(node) : true )
				// .reduce( (o,n)=> res.append(n), res )
		
		res.doc = doc
		return res
	}

*/

/* from Elliott.ist/waves.svg/DOM.js // use HTMLTemplate, works inside a SVG document
const DOM = (ss,...pp)=> {
	let t = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'template' )
	t.innerHTML = String.merge(ss,...pp)
	return t.content
}
const SVG = (ss,...pp)=> DOM`<svg xmlns="http://www.w3.org/2000/svg">${ss_pp(ss,...pp)}</svg>`
							.children[0].childNodes
*/

/* from es-playground/drafts/json-dom-proxy.js
let  dom = (ss,...pp)=>(new DOMParser).parseFromString(ss.map((s,i)=>s+(pp[i]||'')).join(''),'application/xml').documentElement
*/

/* from es-playground/drafts/live.js
var dom = (new DOMParser).parseFromString( '<body>'+html.join(''), 'text/html' ).body;
*/

//Issue: don't init customElements in foreign documents, neither in <template> in document or not, only doc.createElement init customElement or .append
//Issue: can't placehold "<wbr i/>" in attributes with XML parser
const DOC = ( mime = 'text/html')=> (...args)=> {
				// Create real DOM, adding root tag and namespaces
				const root = /html/.test( mime ) ? 'html' : /svg/.test( mime ) ? 'svg' : 'root'
				,	  nss = /html/.test( mime ) ? HTML.ns : /svg/.test( mime ) ? SVG.ns : XML.ns
				,	  doc = DOC.parser.parseFromString(
					  	`<${root} ${xmlns(nss)}>${String.merge(...args)}</${root}>`
					  , mime )
				return doc
}
//                 (new DOMParser).parseFromString(
// 					String.merge(...args),
// 					mime || 'text/html'
// 				)
DOC.parser = new DOMParser

const HTML = (...args)=>
			// [...
				[...DOC('text/html')( ...args ).querySelectorAll('head,body')]
					.reduce( (a,n)=> [...a,...n.childNodes], [] )
			// ]

const XHTML = (...args)=>
			[...DOC('application/xhtml+xml')( ...args ).documentElement.childNodes]

const XML = (...args)=>
			[...DOC('application/xml')( ...args ).documentElement.childNodes]


/* from ./Elliott.ist/waves.svg/DOM.js
const SVG = (ss,...pp)=> DOC`<svg xmlns="http://www.w3.org/2000/svg">${String.merge(ss,...pp)}</svg>`
*/
// Wrong: works on string
const SVG = (...args)=>
			[...DOC('image/svg+xml')( ...args ).documentElement.childNodes]
			// [...DOC('image/svg+xml')`<svg xmlns="http://www.w3.org/2000/svg">${String.merge(...args)}</svg>`
			// .documentElement.childNodes]
// 			.querySelectorAll(':root>*')]

const html = "http://www.w3.org/1999/xhtml"
,	  xmlnsns = 'http://www.w3.org/1999/xmlns'
,	  js = 'javascript:'
,	  svg = 'http://www.w3.org/2000/svg'
,	  xlink = 'http://www.w3.org/1999/xlink'

XML.ns = { html, svg, xlink }
HTML.ns = { '': html, svg, xlink, js }
SVG.ns = { '': svg, xlink, html }

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

const CSS = css=> { let s = new CSSStyleSheet; s.replaceSync(css); return s }
CSSStyleSheet.prototype.toString = function()
{
	return [...this.rules].map( rule=> rule.cssText ).join('\n')
}


export { xmlns, DOC, XML, XHTML, HTML, SVG, CSS }

/**
 * Query selectors
 */


/*@TODO impl $ a rapatrier
x dev/Elliott.ist/waves.svg/DOM.js
./Elliott.ist/waves.svg/DOM.js:// const $ = (ss,...pp)=> document.querySelector( ss_pp(ss,...pp) )
./Elliott.ist/waves.svg/DOM.js:// const $$ = (ss,...pp)=> [...document.querySelectorAll( ss_pp(ss,...pp) )]

/g/dev/odoo/module_recorder_cleanner/bookmarklet.js
/g/dev/VisualProgrammingNodes/nouilles/DOM.js:// const $ = (ss,...pp)=> document.querySelector( ss_pp(ss,...pp) )
/g/dev/VisualProgrammingNodes/nouilles/DOM.js:// const $$ = (ss,...pp)=> [...document.querySelectorAll( ss_pp(ss,...pp) )]

*/


// from dev/Elliott.ist/waves.svg/DOM.js
const $ = (...args)=> document.$( ...args )
const $$ = (...args)=> document.$$( ...args )
Node.prototype.$ = function( ...args )
{
	return this.querySelector( String.merge(...args) )
}
Node.prototype.$$ = function( ...args )
{
	return [...this.querySelectorAll( String.merge(...args) )]
}
Node.prototype.add = function( ...args )
{
	this.append( ...args )
	return this
}
// end from dev/Elliott.ist/waves.svg/DOM.js

/* inline-exemple
$`body`
$$`section.about > .menu:not([disabled]) li`
document.head.$`script[src*="exemple.com"]`
document.head.$$`link,script`
let pics = $$`.about > img`.map( img=> img.href )
$`body`.$`.debug`.add(
	HTML`<ul class="pic-list">
		${pics.map( src=> `<li>${src}</li>` ).join('')}
	</ul>`[0]
)
*/

export { $, $$ }