/**
 * groupBy( property: string )
 * Generates a callback to be used with Array.reduce (without needing the 2nd argument).
 * It takes care of iterable property, so a group is created for every item in the iterable.
 * @export
 * @exemple myArrayOfNodes.reduce( groupBy('classList') )  
 * //> Map { class1 => Set {node,node,...}, class2 => Set {node,node,...} }
 */
const groupBy = prop=> ( map, obj, i, arr = [] )=> { //console.log( map, obj, i, arr )
	map = map === arr[0]	// using Array.reduce( fn ) without initial accumulator
		? groupBy(prop)( new Map, map, 0, arr )
		: map
	
	;( typeof obj[prop] != 'string' && isIterable(obj[prop]) ? [...obj[prop]] : [obj[prop]] )
		.map( group=>
			map.has(group)
				? map.get(group).add(obj)
				: map.set( group, new Set([obj]) )
				// : map.set( group, new arr.constructor([obj]) )
		)
	
	return map
}
export default groupBy

/** ideas
groupByClass = groupBy.bind(null,'classList')
;[...document.all]
	.reduce( groupBy('classList') )
	[name]`classGroups`
	.map()
	.filter()
	[name]`filteredClasses`
	[goto]`classGroups`
*/

// @see http://stackoverflow.com/questions/18884249/ddg#32538867
const isIterable = obj=> {
	// checks for null and undefined
	if( obj == null ) return false
	return typeof obj[Symbol.iterator] === 'function'
}