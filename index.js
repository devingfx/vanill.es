
const LINE = s=> s.split('\n')

const LINE1 = s=> s

const EACH = (o,f)=> ( Array.isArray(o)
                         ? o.map(f)
                         : Object.keys(o).map(k=>f.call(this,o[k],k,o))
                    ).join('')

const LOAD = url=> fetch(url).then(o=>o.json())

const PROX = obj=> new Proxy( obj, {} )
console.log(EACH({aze:42,foo:true},f=>f))


export { LINE, EACH, LOAD, PROX } 

export const isSym = obj=> typeof obj == 'symbol'
export const isFunc = obj=> typeof obj == 'function' || obj instanceof Function
export const isBool = obj=> typeof obj == 'boolean' || obj instanceof Boolean
export const isNum = obj=> typeof obj == 'number' || obj instanceof Number
export const isString = obj=> typeof obj == 'string' || obj instanceof String
export const isArray = obj=> typeof obj == 'object' && Array.isArray( obj )
export const isObject = obj=> typeof obj == 'object' // always true! useless


export { DOM, HTML, XML, SVG } from './DOM.js'