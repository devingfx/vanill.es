import { ArrayEmitter } from "./EmitterMixin.js"
import groupBy from "./reduce/groupBy.js"

export default class Collection extends ArrayEmitter {
	
	// constructor( cls )
	// {
	// 	this.type = cls
	// }
	
	/* vector<type> */
	
	#mayType = item=>
		this.#type ?
			!( item instanceof this.#type ) ?
				Object.assign(new this.#type, item)
			: item
		: item
	
	#type
	/**
	 * Sets the type (class) for the Collection to enforce on 
	 * all objects "entering" in the Collection, via push/unshift/splice/set.
	 * @param {Class} cls The class to apply.
	 */	
	type( cls )
	{
		this.#type = cls
		return this
	}
	
	push( ...args ){ return super.push( ...args.map(this.#mayType) ) }
	unshift( ...args ){ return super.unshift( ...args.map(this.#mayType) ) }
	splice( start, deleteCount, ...items ){ return super.splice( start, deleteCount, ...items.map(this.#mayType) ) }
	
	set( i, item ){ return super.set( i, this.#mayType(item) ) }
	
	/**
	 * @property {string|Symbol} The name or symbol of items in the Collection
	 * to use as id like on .get(id). If this property is falsy the array 0 based 
	 * index is used.
	 */
	primary
	
	/**
	 * Gets the 1st item that match id, being the Array index (default) or
	 * used in conjuction of .primary to test on `item[this.primary] === id`.
	 * If no values satisfy the test, undefined is returned.
	 * @param {number|any} id The value to select test against primary
	 * @returns {any} The value of the first element in the array that satisfies the test. Otherwise, undefined is returned.
	 * @see .primary
	 */
	get( id )
	{
		return this.find( (item,i)=>
					this.primary
						? item[this.primary] === id
						: i === id
				)
	}
	/**
	 * Shorthand to replace whit nothing `.replace()`
	 * @memberof Collection
	 * @emits replaced
	 * @see Collection.replace
	 */
	empty() {
		this.replace()
	}
	/**
	 * Replaces in place all items by new ones (doesn't make a copy).
	 * @memberof Collection
	 * @emits replaced Fired when the entire Collection is replaced  
	 * @exemple .on( 'replaced', ( old: any[] )=> {} )
	 * @see .replaceAt() to replace only some items.
	 */
	replace( ...items )
	{
		const old = this.slice()
		this.off('spliced')
		this.splice( 0, this.length, ...items )
		this.on('spliced')
		old.length !== items.length && this.emit('lengthchanged')
		this.emit('replaced', old )
	}
	
	/**
	 * Inserts items at index without removing any other items,
	 * kinda "push" the items indexes.
	 * @memberof Collection
	 * @param {number} i The Array index where to insert items.
	 * @param  {...any} items The one or several object(s) to insert.
	 * @returns this
	 * @emits replaced Fired when the entire Collection is replaced  
	 * @example `col.insertAt( 2, x ) >> [ 0, 1, x 2, 3, 4, 5 ]`
	 */
	insertAt( i, ...items )
	{
		this.off('spliced')
		this.splice( i, 0, ...items )
		this.on('spliced')
		
		this.emit('lengthchanged')
		this.emit('item-inserted', ...items )
		
		return this
	}
	
	/**
	* Replace one item at index i with one or many items.
	* @memberof Collection
	* @emits item-replaced Fired when an item in the Collection is replaced  
	* @param {number} i The index of one item to replace with items.
	* @param  {...any} items The items to place starting at the replaced item.
	* @returns The replaced item.
	*/
	replaceAt( i, ...items )
	{
		this.off('spliced')
		const ret = this.splice( i, 1, ...items )[0]
		this.on('spliced')
		// this.emit('lengthchanged')
		this.emit('item-replaced', ret, ...items )
		
		return ret
	}
	remove( ...items )
	{
		const ids = items.map( item=> this.indexOf(item) )
						.filter( n=> n >= 0 )
		return this.removeAt( ...ids )
	}
	removeAt( ...itemIds )
	{
		this.off('spliced')
		// Should start deleting from end to start to
		// avoid deleted item to mess with other ids
		const ret = itemIds.sort().reverse()
						.flatMap( item=>
							this.splice( typeof item == 'number' ? item : this.indexOf(item), 1 )
						)
		this.on('spliced')
		itemIds.length && this.emit('lengthchanged')
		this.emit('removed', ...ret )
		return ret
	}
	
	/**
	 * @see https://michaelzanggl.com/articles/subclassing-arrays/
	 */
	pluck( key )
	{
		return this.map( item => item[key] )
	}
	tap( fn )
	{
		fn( this )
		return this
	}
	
	groupBy( prop )
	{
		return this.reduce( groupBy(prop) )
	}
	
	/* views */
	
	// #views = {}
	// view( name ){ this[name] = this.#views[name] = 'view' }
}


// Job.s.view('done').filter().sort().on()
// Job.s.done.on().off()


	