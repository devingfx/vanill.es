import { $, $$, HTML, CSS } from '../DOM_.js'
import Base from './Base.js'
//import Resizing from './Resizing.mixin.js'
//import cssVars from './CSSVars.mixin.js'
import '../Function_.js'
import type from '../Object/type.js'


const defined = o=> typeof o != 'undefined'


//export default class TreeView extends Base.mixin(cssVars,Resizing) {
export default class TreeView extends Base {
	
	static css = CSS`
		
		:host		{ outline: 1px solid blue }
		div			{ outline: 1px solid green }
		input		{ outline: 1px solid darkorchid }
		datalist	{ outline: 1px solid red }
		
		* { box-sizing: border-box }
		:host {
			position: relative;
			display: inline-flex;
			flex-direction: column;
			align-items: stretch;
		}
			
		
		details { padding-left: 1.3em; box-sizing: border-box; border: 1px solid transparent; border-right: none }
		details summary:only-child { list-style: none }
		details summary { list-style-position: outside; position: relative; cursor: default; }
		details summary::marker { font-size: .75em; color: black; }
		details summary > label { color: grey }
		details summary > label::after { content: " :" }
		
		details[open]:hover { border-color: #0003 }
		details summary:hover { background: #0003 }
		details[selected] > summary { color: white; background: var(--normal-col) }

	`
	
	shadowHTML = this.shadowRoot.innerHTML = /*h*/`
		<details open><summary></summary></details>
	`
	
	//css = this.css.replaceSync(`:host {
	//	--toto: 42px;
	//}`)
	
	$details = this.shadowRoot.$`details`
	$summary = this.shadowRoot.$`summary`
	//$slot = this.shadowRoot.$`slot`
	
	//onSlotChange = this.$slot.addEventListener('slotchange', e=> 
	//	[...this.$slot.assignedNodes()]
	//		.map( 
	//		)
	//)
	
	//onResize = e=> {
		//if( this.isVertical )
		//{
			//this.adoptedCSS[1].cssRules[0].style.setProperty( '--width', `${e.contentRect.width}px` )
			//this.adoptedCSS[1].cssRules[0].style.setProperty( '--height', `${e.contentRect.height}px` )
		//	this.$range.style.width = e.contentRect.width
		//	this.$range.style.height = e.contentRect.height
		//}
		//else
		//{
		//	this.$range.style.height = e.contentRect.width
		//	this.$range.style.width = e.contentRect.height
		//}
	//}
	
	//obsResize = new ResizeObserver( changes=> changes.map(this.onResize) )
	
	
	//static observedAttributes = 'min max step'.split(' ')
	//attributeChangedCallback = ( name, value, old )=> !'style type list on*'.split(' ').includes( name ) && this.$range.setAttribute( name, value )
	//attributeChangedCallback( name, value, old )
	//{
	//	console.log('attribute changed on', this, name, value, old )
	//}
	//attributeChangedCallback = this.attributeChangedCallback.bind( this )
	
	//obsAttributes = new MutationObserver( changes=> changes.map( ch=> 
	//	this.attributeChangedCallback(
	//		ch.attributeName
	//	,	this.getAttribute( ch.attributeName )
	//	,	ch.oldValue
	//	)
	//))
	
	//static def = customElements.define( 'input-range', this )
	// static def = this.tag = 'input-range'
	
	// labelRenderer = item=> `${item}`
	// itemRenderer = item=> `<details><summary>${item}</summary></details>`
	getChilds = target=>
	
		//type( target ).name == 'Undefined'
		//|| type( target ).name == 'Null'
		//|| type( target ) == Boolean
		//|| type( target ) == Number
		//|| type( target ) == BigInt
		//|| type( target ) == String
		//|| type( target ) == Symbol
		//	? []
		
		//: type( target ) == Function
		//	? [[undefined,target.toString()]]
		
		//: type( target ) == Array
		//|| type( target ) == Object
		//	? Object.entries( target )
		
		//: typeof target == 'object'
		//	? Array.isArray( target )
		//		? Object.entries( target )
				//: 
				( [...Object.getPrototypeChainOf(type(target))]
					.map( cls=> TreeView.types[cls.name] )
					.filter( defined )
					[0]
					|| TreeView.types.default )( target )
		//: []
	
	constructor( obj )
	{
		super()
		this.target = obj
		//this._label = label
	}
	
	connectedCallback()
	{
		super.connectedCallback()
		let typeLabel = ( [...Object.getPrototypeChainOf(type(this.target))]
							.map( cls=> TreeView.typeLabels[cls.name] )
							.filter( defined )
							[0]
							|| TreeView.typeLabels.default )
		
		this.$summary.innerHTML =
			typeLabel( this.target )
		
		for( const [ key, child ] of this.getChilds(this.target) )
			this.$details.append( this.makeItem( child, key ) )
	}
	//disconnectedCallback()
	//{
		//super.disconnectedCallback()
		//this.obsResize.unobserve( this )
		//this.obsAttributes.disconnect()
	//}
	
	
	
	//set label( obj )
	//{
	//	this.$summary.append( this.labelRenderer(obj) )
	//}
	
	makeItem( item, label )
	{
		//let tItem = new TreeView( item, label )
		//tItem.labelRenderer = this.labelRenderer
		let node
		,	typeLabel = ( [...Object.getPrototypeChainOf(type(item))]
							.map( cls=> TreeView.typeLabels[cls.name] )
							.filter( defined )
							[0]
							|| TreeView.typeLabels.default )
		//if( label )
		//	this.$details.append( HTML`<summary>${label}</summary>` )
		
		
		
		node = HTML`<details open>
			<summary><label>${defined(label)?label:''}</label>${typeLabel(item)}</summary>
		</details>`[0]
		node.target = item
		
		node.append(
			...this.getChilds(item)
				.map( ([key,child])=> this.makeItem(child,key) )
				.filter(o=>o)
		)
		
		return node
	}
	
	
	//render = node=>
	//	( this.$tree.innerHTML = '', this.$tree.append( toDetails(node) ) )
	
		
}

TreeView.JSONLabelRenderer = item=>
	typeof item == 'string'
		? item
	: typeof item == 'object'
		? `${JSON.stringify(item)}`
	: item

TreeView.DOMLabelRenderer = item=> `<${item.localName}>`

TreeView.types = {}
TreeView.types.default = obj=> []
TreeView.types.Array = 
TreeView.types.Object = obj=> Object.entries(obj)
TreeView.types.Node = obj=> [...obj.childNodes]
							.map( n=> [n.id||undefined,n] )

TreeView.typeLabels = {}
TreeView.typeLabels.default = obj=> `<span>${JSON.stringify(obj)}</span>`
TreeView.typeLabels.Node = obj=> `<span>${
		obj.nodeType == 1
			? `&lt;${obj.prefix?obj.prefix+':':''}${obj.localName}>`
		: obj.nodeType == 3
			? obj.textContent
		: ''
	}</span>`


const toDetails = node=> {
	//console.log(node, getComputedStyle(node).display)||
	// node.localName != 'title' && node != fo
	if( ! toDetails.excludes.includes( node.localName ) )
	{
		const details = HTML
			`<details ${node.localName == 'svg' ? `open=""` : ''}>
				<summary>${toDetails.sum(node)}<button>${getComputedStyle(node).display == 'none' ? toDetails.icons.hide : toDetails.icons.display }</button></summary>
			</details>`
			[0]
		details.append(
			...[...node.children].map( toDetails ).filter(o=>o)
		)
		details.target = node
		return details
	}
	else {}
}
toDetails.excludes = ['title']

toDetails.sum = ( node, id = node.id||'', title = node.querySelector(':scope > title')?.innerHTML||'' )=>
	`${toDetails.icons[node.localName]||toDetails.icons['unknown']}<label contenteditable="true">${id+title == ''? `&lt;${node.localName}&gt;`:''} ${id} ${title}</label>`


//toDetails.icons = window.icons = icons
