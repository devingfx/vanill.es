import { inheritProperty } from '../Object/inheritProperties.js'
import shadowRoot from './ShadowRoot.js'

/**
 * node.shadowRoot getter to access shadowRoot with direct creation if not existing yet,
 * with attachShadow given any options avalable at element.shadowOptions or defaults to {mode:'open'}.
 * @exemple class extends HTMLElement { constructor(){ super(); this.shadowRoot.innerHTML = '...' } }
 */
inheritProperty( Element.prototype, 'shadowRoot',  _super=> ({
	get(){ return _super.get.call(this) ?? shadowRoot(this) }
}))

export default shadowRoot