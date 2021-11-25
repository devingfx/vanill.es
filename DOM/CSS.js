
/**
 * CSS`selector { prop: val; }`
 */
export default css=> { let s = new CSSStyleSheet; s.replaceSync(css); return s }
