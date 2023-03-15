
/**
 * shadowRoot( element ) getter to access shadowRoot with direct creation if not existing yet,
 * with attachShadow given any options avalable at element.shadowOptions or defaults to {mode:'open'}.
 * @exemple class extends HTMLElement { constructor(){ super(); shadowRoot( this ).innerHTML = '...' } }
 */
export default elm=> elm.shadowRoot ?? elm.attachShadow( elm.shadowOptions ?? {mode:'open'} )


