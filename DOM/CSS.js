import merge from "../String/merge.js"
/**
 * CSS`selector { prop: val; }`
 */
export default (...css)=> { let s = new CSSStyleSheet; s.replaceSync(merge(...css)); return s }
