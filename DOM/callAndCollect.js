
// callAndCollect( node, {}, o=>o )
// callAndCollect.addedChilds( node, o=>o )
// callAndCollect.removedChilds( node, o=>o )
// callAndCollect.addedAttrs( node, o=>o )
// callAndCollect.removedAttrs( node, o=>o )

const callAndCollect = ( node, options, fn )=> {
	
	const obs = new MutationObserver( o=>o )
	obs.observe( node, options )
	
	fn()
	
	const res = obs.takeRecords()
// 	console.log('take',obs.takeRecords())
	obs.disconnect()
// 	console.log('take',obs.takeRecords())
// 	console.log('res=',res)
	return res
}

callAndCollect.addedChilds = ( node, fn )=> 
	callAndCollect( node, { childList:true, subtree: true }, fn )
		// .map( rec=> res = res.concat(...rec.addedNodes) )
		.flatMap( rec=> [...rec.addedNodes] )

callAndCollect.removedChilds = ( node, fn )=> 
	callAndCollect( node, { childList:true, subtree: true }, fn )
		// .map( rec=> res = res.concat(...rec.addedNodes) )
		.flatMap( rec=> [...rec.removedNodes] )

callAndCollect.addedAttrs = ( node, fn )=> 
	callAndCollect( node, { attributes:true, attributeOldValue: true }, fn )
		// .map( rec=> res = res.concat(...rec.addedNodes) )
		.flatMap( rec=> rec.attributeName )

callAndCollect.removedAttrs = ( node, fn )=> 
	callAndCollect( node, { attributes:true, attributeOldValue: true }, fn )
		// .map( rec=> res = res.concat(...rec.addedNodes) )
		.flatMap( rec=> rec.attributeName )

export default callAndCollect