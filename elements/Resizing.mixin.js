import CSSVarsMixin from "./CSSVars.mixin.js"

export default sup=> class Resizing extends sup.mixin(CSSVarsMixin) {
	
	onResize( e )
	{
		console.log(e.contentRect)
		this.vars.width = `${e.contentRect.width}px`
		this.vars.height = `${e.contentRect.height}px`
	}
	
	obsResize = new ResizeObserver( changes=> console.log(changes)||changes.map(this.onResize.bind(this)) )
	
	connectedCallback()
	{
		super.connectedCallback()
		this.obsResize.observe( this )
	}
	disconnectedCallback()
	{
		this.obsResize.unobserve( this )
		super.disconnectedCallback()
	}
	
}
