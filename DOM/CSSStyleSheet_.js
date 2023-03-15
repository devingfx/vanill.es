
/**
 * let styles1 = CSS`...`, styles2 = CSS`...`, styles3 = CSS`...`
 * styleElm.innerHTML = ` ${styles1} my-selector { and-some-prop: value } ${styles2}`
 */
 CSSStyleSheet.prototype.toString = function()
 {
	 return [...this.cssRules].map( rule=> rule.cssText ).join('\n')
 }
 