import { CSS } from '../DOM.js'
import toKebabCase from '../String/toKebabCase.js'

export default sup=> class cssVars extends sup {
	
	#varsCSS = CSS`:host {}`
	
	//this.vars.foo = 'bar'
	//this.vars.foo
	vars = new Proxy( this.varsCSS.cssRules[0].style, {
		get( o, p ){ return o.getPropertyValue('--'+toKebabCase(p)) }
	,	set( o, p, v ){ o.setProperty( '--'+toKebabCase(p), v ); return true }
	})
	
	adoptedCSS = this.shadowRoot.adoptedStyleSheets = [ ...this.shadowRoot.adoptedStyleSheets, this.#varsCSS ]
	
}
