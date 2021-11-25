
// String.merge = (ss,...pp)=> [].concat(ss).map((s,i)=>s+(typeof pp[i] != 'undefined'?pp[i]:'')).join('')
export default (ss,...pp)=> [].concat(ss).map( (s,i)=> s + (i in pp ? pp[i] : '') ).join('')
// String.merge = (...args)=> (new sspp).push(...args).map2( sspp.merge )

// console.log( new URL(import.meta.url).search )
// console.log( 'import.meta.url' )
// String.merge = merge



/* from HTML+template+...+...+.js
pp is a function like when `<span>${o=> o.name}</span>` `<line x1="${p=> p.x}" y1="${p=> p.y}" x2="${p=> p.x + 500 }" y2="${p=> p.y}" />`
String.merge = (ss,...pp)=> [].concat(ss).map( (s,i)=> s + ((pp[i]||(()=>''))(obj))    ).join('')
*/


