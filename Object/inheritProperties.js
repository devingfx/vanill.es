
/**
 * Defines a property descriptor as Object.defineProperty but with ability to use old descriptor.
 * @param {Object} obj The target object from wich inherit a descriptor
 * @param {String|Symbol} prop The property to inherit
 * @param {Function} descFn A function that takes the old property descriptor as 1st argument, returning the new descriptor
 * @returns The target object
 * 
 * @example	inheritProperty( target: Object, 'property',  _super=> ({ ... })
 */
export const inheritProperty = ( obj, prop, descFn )=> 
	Object.defineProperty( obj, prop, descFn(Object.getOwnPropertyDescriptor(obj, prop)) )


/**
 * Defines some property descriptors as Object.defineProperties but with ability to use old descriptors.
 * @param {Object} obj The target object from wich inherit descriptors
 * @param {Object} props An object mapping properties names to functions that takes the old property descriptor as 1st argument, returning the new descriptor
 * @returns The target object
 * 
 * @example
 * inheritProperties( target: Object, {
 * 	property1: _super=> ({ ... }),
 * 	property2: _super=> ({ ... })
 * })
 */
export const inheritProperties = ( obj, props )=> 
	Object.keys( props )
		.map( prop=> 
			inheritProperty( obj, prop, props[prop] )
		)
