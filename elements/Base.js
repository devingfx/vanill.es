import { CSS } from '../DOM.js'
import { shadowRoot } from './ShadowRoot.js'

const _tag = Symbol`tagName`

export default class Base extends HTMLElement {
	
	get shadowRoot(){ return shadowRoot(this) }

	static css = CSS``
	css = CSS``
	
	adoptedCSS = this.shadowRoot.adoptedStyleSheets = [ this.constructor.css, this.css ]
	
	// Keep that feature?
	// adoptedCSS = this.shadowRoot.adoptedStyleSheets = [
	// 	...Array.isArray( this.constructor.css )
	// 		? this.constructor.css
	// 		: [this.constructor.css],
	// 	...Array.isArray( this.css )
	// 		? this.css
	// 		: [this.css],
	// ]
	
	_upgradeProperty( prop )
	{
		if( this.hasOwnProperty(prop) )
		{
			let value = this[prop]
			delete this[prop]
			this[prop] = value
		}
	}
	
	connectedCallback()
	{
		this.obsAttributes.observe( this, {attributes:true,attributeOldValue:true} )//... aze ? {attributeFilter} : {}
	}
	disconnectedCallback()
	{
		this.obsAttributes.disconnect()
	}
	
	
	//toto = fields.String('toto', { ...descriptor, on(e){}, set(v){}, get(){}, })
	//action = fields.Function(()=>{}, { options })
	//#flag = fields.Boolean(true, { attribute:true, attribute: 'name' })
	//get flag(){ return this.#flag.get() }
	//set flag(v){ return this.#flag.set(v) }
	//get toto = ()=> this.getAttribute('toto')
	//set toto = v=> this.setAttribute('toto',v)
	//on toto = e=> this.update()
	//on toto( e ){ this.update() }
	// Object.defineProperty( this, 'toto', { ...Object.getOwnPropertyDescriptor(), on: this['on toto']} )
	// { get(){}, set(v){}, on(){} }
	
	//static observedAttributes = 'min max step'.split(' ')
	//attributeChangedCallback( name, value, old )
	//{
	//	console.log('attribute changed on', this, name, value, old )
	//}
	
	obsAttributes = new MutationObserver( changes=> changes.map( ch=> 
		this.attributeChangedCallback &&
		this.attributeChangedCallback(
			ch.attributeName
		,	this.getAttribute( ch.attributeName )
		,	ch.oldValue
		)
	))
	
	static get tag(){ return this[_tag] }
	static set tag( v )
	{
		// console.log(this,this[_tag])
		if( v != this[_tag] )
		{
			this[_tag] = v
			customElements.define( v, this )
		}
	}
	
	static [Symbol.toPrimitive]( hint )
	{
		return hint == 'number' 
					? 42 
				: hint == 'default' 
					? `</${this.tag}>`
				: `<${this.tag}>`
	}
}
