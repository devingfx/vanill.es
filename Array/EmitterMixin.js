
export const EmitterMixin = parent=>
	class EmitterMixin extends parent {
		
		#listeners = {}
		/**
		 * `.on( type: string, fn: (any)=>any ) => this`  
		 * Adds an event listener for a given event type.  
		 * If only type is given, it reactivate this event.  
		 * (You can temporary deactivate the event with `.off('type')` 
		 * without removing the listeners).  
		 */
		on( type, fn )
		{
			if( fn )
			{
				this.#listeners[type] = this.#listeners[type] || []
				this.#listeners[type].push(fn)
				return this
			}
			// else
			delete this.#listeners[type]?.off
		}
		/**
		 * `.off( type: string, fn: boolean | (any)=>any ) => this`  
		 * Removes event listener(s) for a given event type.  
		 * If only type is given, it temporary deactivate this event.  
		 * (You can reactivate the event with `.on('type')`).  
		 * If 2nd argument is true, also deletes all the event listeners from
		 * the internal list, therefore it can't be reactivated with `.on`.  
		 * If 2nd argument is a callback, only this callback is removed, and
		 * the event is not deactivated.
		 */
		off( type, fn )
		{
			if( typeof fn == 'function' ) return this.#listeners[type]?.splice( this.#listeners[type].indexOf(fn), 1 )
			if( fn ) return this.#listeners[type]?.splice( 0, this.#listeners[type].length )
			this.#listeners[type] &&
				( this.#listeners[type].off = true )
		}
		/**
		 * `.emit( type: string, ...any ) => any[]`  
		 * Emits an event with given type. If there are listeners in
		 * the internal list ad if the event is not deactivated, all
		 * the listeners are called with the rest of arguments.  
		 * (Note the event type is not given to the listener is the author
		 * the responsability of passing this information along with arguments).  
		 * @exemple .emit('foo', 'bar')
		 * @exemple .emit('foo', { type: 'foo', details: 'bar'} )
		 * @returns {Array} The return values of each listeners in order.
		 * @exemple myObj.emit('foo', { type: 'foo', details: 'bar'} )  
		 * 			.map( (res,i)=> console.log('listener %s retuned: %s', i, res) )
		 */
		emit( type, ...args )
		{
			if( !this.#listeners[type]?.off )
				return this.#listeners[type]?.map( fn=> fn(...args) )
		}
	}

EmitterMixin.new = ()=> new (EmitterMixin(class{}))
// EmitterMixin.new()
EmitterMixin.new = EmitterMixin( class{} )
// new EmitterMixin.new

export class ArrayEmitter extends EmitterMixin(Array) {

	copyWithin( ...a ){	const ret = super.copyWithin(...a);	this.emit('copiedWithin',	...a); return ret }
	fill( ...a ){		const ret = super.fill(...a);		this.emit('filled',			...a); return ret }
	pop(){				const ret = super.pop();			this.emit('poped',			ret); return ret }
	push( ...a ){		const ret = super.push(...a);		this.emit('pushed',			...a); return ret }
	reverse(){			const ret = super.reverse();		this.emit('reversed'			); return ret }
	shift(){			const ret = super.shift();			this.emit('shifted',		ret); return ret }
	// sort( ...a ){		const ret = super.sort(...a);		this.emit('sorted',			...a); return ret }
	splice( ...a ){		const ret = super.splice(...a);		this.emit('spliced',		...a); return ret }
	unshift( ...a ){	const ret = super.unshift(...a);	this.emit('unshifted',		...a); return ret }
	set( i, item )
	{
		const l = this.length
		this[i] = item
		this.length !== l &&
			this.emit('lengthchanged')
		this.emit('set', i, item)
	}
	
	self = this
	.on('pushed', items=> this.emit('lengthchanged') )
	.on('poped', item=> this.emit('lengthchanged') )
	.on('shifted', item=> this.emit('lengthchanged') )
	.on('unshifted', items=> this.emit('lengthchanged') )
	.on('spliced', args=> this.emit('lengthchanged') )
}