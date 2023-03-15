
const _nativeODP = {
	defineProperties: Object.defineProperties.bind( Object )
,	defineProperty: Object.defineProperty.bind( Object )
,	getOwnPropertyDescriptors: Object.getOwnPropertyDescriptors.bind( Object )
,	getOwnPropertyDescriptor: Object.getOwnPropertyDescriptor.bind( Object )
}

const _descMap = new Map

export const defineProperties = function( o, d )
{
	_nativeODP.defineProperties( o, d )
	
	const descs = _nativeODP.getOwnPropertyDescriptors( o )
	
	Object.entries( descs )
		.map( ([k,v])=> Object.assign(d[k] = d[k] || {},v) )
	
	_descMap.set( o, d )
	
	return o
}

export const defineProperty = function( o, p, d )
{
	_nativeODP.defineProperty( o, p, d )
	
	const desc = _nativeODP.getOwnPropertyDescriptor( o, p )
	
	Object.assign( d, desc )
	
	( _descMap.get( o ) || {} )[k] = desc
	
// 	_descMap.set( o, descs )
	
	return o
}

export const getOwnPropertyDescriptors = function( o )
{
	let descs = _descMap.get( o )
	
	if( !descs )
		descs = _nativeODP.getOwnPropertyDescriptors( o )
	
	return descs
}

export const getOwnPropertyDescriptor = function( o, p )
{
	return Object.getOwnPropertyDescriptors( o )[p]
}