import { $, $$, CSS } from '../DOM_.js'
import Base from './Base.js'
import Resizing from './Resizing.mixin.js'
import cssVars from './CSSVars.mixin.js'
import '../Function.js'

export default class InputRange extends Base.mixin(cssVars,Resizing) {
	
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
			--verticality: 0;
			--reverse: 0;
			--angle: 0deg;
			--mirror: 1;
			--width: 130px;
			--height: 22px;
		}
			:host([mirror]) {
				--mirror: -1;
			}
		
		:host,
		:host([horizontal]) {
			--verticality: 0;
			--reverse: 0;
			--angle: 0deg;
			flex-direction: column;
			/*width: var(--width);*/
			/*height: var(--height);*/
		}
			:host([mirror]),
			:host([horizontal][mirror]) {
				flex-direction: column-reverse;
			}
		
		:host([horizontal-reverse]) {
			--verticality: 0;
			--reverse: 1;
			--angle: 180deg;
			flex-direction: column-reverse;
			/*width: var(--width);*/
			/*height: var(--height);*/
		}
			:host([horizontal-reverse][mirror]) {
				flex-direction: column;
			}
		
		:host([vertical]) {
			--verticality: 1;
			--reverse: 0;
			--angle: 90deg;
			--mirror: -1;
			flex-direction: row;
			/*height: var(--width);*/
			/*width: var(--height);*/
		}
			:host([vertical][mirror]) {
				flex-direction: row-reverse;
			}
		:host([vertical-reverse]) {
			--verticality: 1;
			--reverse: 1;
			--angle: -90deg;
			--mirror: -1;
			flex-direction: row-reverse;
			/*height: var(--width);*/
			/*width: var(--height);*/
		}
			:host([vertical-reverse][mirror]) {
				flex-direction: row;
			}
		
		:host([vertical][mirror]),
		:host([vertical-reverse][mirror]) {
			--mirror: 1;
		}
		/*
		ver 0	0	1	1
		rev 0	1	0	1
		ang 0	180	90	-90
		*/
		div {
			/*width: 130px;
			height: 30px;*/
			width: var(--width);
			height: 22px;
		}
		:host([vertical]) div,
		:host([vertical-reverse]) div {
			/*width: 130px;
			height: 30px;*/
			width: 22px;
			height: var(--height);
		}
		
		input {
			position: absolute;
			transform: rotate( var(--angle) ) scale(1, var(--mirror));
			/*transform-origin: 50% 220%;*/
			/*width: var(--width);*/
			width: 100%;
			margin: 0px;
		}
			:host([vertical]) input,
			:host([vertical-reverse]) input {
				width: var(--height);
				/*width: initial;*/
				transform-origin: 0% 0%;
			}
			:host([vertical][mirror]) input {
				transform: rotate( var(--angle) ) scale(1, var(--mirror)) translate(0%,-100%);
			}
			:host([vertical-reverse]) input {
				transform: rotate( var(--angle) ) scale(1, var(--mirror)) translate(-100%,-100%);
			}
			:host([vertical-reverse][mirror]) input {
				transform: rotate( var(--angle) ) scale(1, var(--mirror)) translate(-100%,0%);
			}


		datalist {
			display: flex;
			justify-content: space-between;
			font-size: 0.7em;
			width: calc( 100% - 1.4em);
			height: 1.5em;
			margin: 0 0.7em 0 0.7em;
			position: relative;
		}
		:host([vertical]) datalist,
		:host([vertical-reverse]) datalist {
			width: 1.5em;
			height: calc( 100% - 1.4em);
			margin: 0.7em 0 0.7em 0;
		}
		
		datalist option {
			display: inline;
			position: absolute;
			border-top: 1px solid;
			border-left: 1px solid;
			line-height: 1;
			padding: 0;
		}
		datalist option[big] { font-size: 1.2em }
		datalist option[small] { font-size: 0.8em }
		datalist option[decal] { margin-top: 1em }
			:host([horizontal]) datalist option[decal] { margin-top: 1em }
			:host([horizontal][mirror]) datalist option[decal] { margin-top: initial; margin-bottom: 1em }
			:host([horizontal-reverse]) datalist option[decal] { margin-top: initial; margin-bottom: 1em }
			:host([horizontal-reverse][mirror]) datalist option[decal] { margin-top: 1em }
			:host([vertical]) datalist option[decal] { margin-top: initial; margin-left: 4em }
			:host([vertical][mirror]) datalist option[decal] { margin-top: initial; margin-right: 4em }
			:host([vertical-reverse]) datalist option[decal] { margin-top: initial; margin-right: 4em }
			:host([vertical-reverse][mirror]) datalist option[decal] { margin-top: initial; margin-left: 4em }
		
		datalist option[golden] {
			color: gold;
			text-shadow: 0px -1px lightgoldenrodyellow, 0px 1px darkgoldenrod, 0 3px 4px #0005, 0 2px 0px #0003;
			font-weight: bold;
		}
		datalist option[label]:after {
			content: attr(label);
			display: block;
			white-space: pre;
			text-align: center;
			/*margin-top: -0.5em;
			margin-left: -100%;*/
		}
			:host([horizontal-reverse]) datalist option[label]:after,
			:host() datalist option[label]:after,
			:host([horizontal]) datalist option[label]:after					{ margin-left: -100% }
			:host() datalist option[label]:after,
			:host([horizontal]) datalist option[label]:after,
			:host([horizontal-reverse][mirror]) datalist option[label]:after	{ margin-top: 0em }
			:host([horizontal-reverse]) datalist option[label]:after,
			:host([horizontal][mirror]) datalist option[label]:after			{ margin-top: 1em }
			
			:host([vertical-reverse]) datalist option[label]:after,
			:host([vertical]) datalist option[label]:after					{ margin-top: -0.5em }
			:host([vertical]) datalist option[label]:after,
			:host([vertical-reverse][mirror]) datalist option[label]:after	{ margin-left: 0% }
			:host([vertical-reverse]) datalist option[label]:after,
			:host([vertical][mirror]) datalist option[label]:after			{ margin-left: -100% }
			
			
		
	`
	
	shadowHTML = this.shadowRoot.innerHTML = /*h*/`
		
		<div>
			<input type="range" list="tickmarks" min=0 max=1 step=any
					onchange="console.log(this.value)">
		</div>
		<datalist id="tickmarks"></datalist>
		<slot></slot>
	`
	
	//css = this.css.replaceSync(`:host {
	//	--toto: 42px;
	//}`)
	
	$range = this.shadowRoot.$`input`
	$slot = this.shadowRoot.$`slot`
	
	get isVertical()
	{
		return !!( this.attributes.vertical || this.attributes['vertical-reverse'] )
	}
	
	initialWidth = this.$range.offsetWidth
	initialHeight = this.$range.offsetHeight
	
	//render = data=> TPL`<h1>${this.localName}</h1>`
	//render = data=> ((...o)=>o)`<h1>${this.localName}</h1>`
	
	onSlotChange = this.$slot.addEventListener('slotchange', e=> 
		[...this.$slot.assignedNodes()]
			.map( node=> node.attributes?.label
							? this.attributes.vertical || this.attributes['vertical-reverse']
								? ( node.style.top = node.attributes.label.value, node ) 
								: ( node.style.left = node.attributes.label.value, node ) 
							: node
			)
			.map( node=> this.shadowRoot.children.tickmarks.append(node) )
	)
	
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
	
	//connectedCallback()
	//{
		//super.connectedCallback()
		//this.obsResize.observe( this )
		//this.obsAttributes.observe( this, {attributes:true,attributeOldValue:true} )
		//if( this.isVertical )
		//{
		//	this.style.width = this.initialHeight
		//	this.style.height = this.initialWidth
		//}
		//else
		//{
		//	this.style.width = this.initialWidth
		//	this.style.height = this.initialHeight
		//}
	//}
	//disconnectedCallback()
	//{
		//super.disconnectedCallback()
		//this.obsResize.unobserve( this )
		//this.obsAttributes.disconnect()
	//}
	 
	static observedAttributes = 'min max step'.split(' ')
	//static observedAttributes = 'min max step'.split(' ')
	//attributeChangedCallback = ( name, value, old )=> !'style type list on*'.split(' ').includes( name ) && this.$range.setAttribute( name, value )
	attributeChangedCallback( name, value, old )
	{
		console.log('attribute changed on', this, name, value, old )
	}
	attributeChangedCallback = this.attributeChangedCallback.bind( this )
	
	//obsAttributes = new MutationObserver( changes=> changes.map( ch=> 
	//	this.attributeChangedCallback(
	//		ch.attributeName
	//	,	this.getAttribute( ch.attributeName )
	//	,	ch.oldValue
	//	)
	//))
	
	//static def = customElements.define( 'input-range', this )
	// static def = this.tag = 'input-range'
}
