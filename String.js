
// String.merge = (ss,...pp)=> [].concat(ss).map((s,i)=>s+(typeof pp[i] != 'undefined'?pp[i]:'')).join('')
export const merge = (ss,...pp)=> [].concat(ss).map( (s,i)=> s + (i in pp ? pp[i] : '') ).join('')
// String.merge = (...args)=> (new sspp).push(...args).map2( sspp.merge )

String.merge = merge


/* from HTML+template+...+...+.js
pp is a function like when `<span>${o=> o.name}</span>` `<line x1="${p=> p.x}" y1="${p=> p.y}" x2="${p=> p.x + 500 }" y2="${p=> p.y}" />`
String.merge = (ss,...pp)=> [].concat(ss).map( (s,i)=> s + ((pp[i]||(()=>''))(obj))    ).join('')
*/





const importScript = url=> {
	document.head.insertAdjacentHTML('beforeend',
	`<script src="${url}"></script>`)
}


//@TODO live TXT tag ? updates it's properties parts when it changes
// export const TXT

/*impls
es-layground/drafts/CSV.js
*/
// export const CSV
// export const TSV

export const MD = (...a)=> MD.parse( String.merge(...a) )
// MD.stringify = obj=> new TurndownService().turndown( obj )
MD.parse = str=> new showdown.Converter().makeHtml( str )
MD.import = ()=> {
	importScript('https://unpkg.com/showdown/dist/showdown.min.js') //marche pas
// ,	import('https://unpkg.com/turndown/lib/turndown.browser.umd.js')
}

export const YAML = (...a)=> jsyaml.load( String.merge(...a) )
YAML.import = ()=> import('https://unpkg.com/js-yaml@4.1.0/dist/js-yaml.min.js')

const J = JSON
export const tJSON = (ss,...pp)=> J.parse( String.merge(ss,...pp) )
Object.getOwnPropertyNames(J).map( k=> tJSON[k] = J[k] )
export { tJSON as JSON }
/*impls:
./customElements/LANG.js:const LANG = (ss, ...pp)=> `<lang>${ss_pp(ss, ...pp)}</lang>`
*/
// export const LANG

// from ./Candler/elliott.js
export const D = (ss,...pp)=> new Date( String.merge(ss,...pp) )
export const T = day=> (ss,...pp)=> D`${day} ${String.merge(ss,...pp)}`















