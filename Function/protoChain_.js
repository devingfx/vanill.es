import protoChain from './protoChain.js'
import '../Object/getPrototypeChainOf_.js'


Object.defineProperty( Function.prototype, 'protoChain', {
	get(){ return [...Object.getPrototypeChainOf(this)] } 
})
//> ƒ () { [native code] }

export { protoChain }