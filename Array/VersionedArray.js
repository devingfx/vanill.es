/**
 * VersionedMixin
 * @mixin
 * @export
 * @extends {Array}
 * @see https://hacks.mozilla.org/2015/08/es6-in-depth-subclassing/
 */
export const VersionedMixin = parent=> 
	parent.prototype instanceof Array &&
		class VersionedArray extends parent {
			constructor()
			{
				super( ...arguments )
				this.history = []
			}
			commit()
			{
				// Save changes to history.
				this.history.push( this.slice() )
			}
			revert()
			{
				this.splice( 0, this.length, this.history[this.history.length - 1] )
			}
		}

/**
 * VersionedArray
 * @export
 * @class VersionedArray
 * @extends {Array}
 * @mixins {VersionedMixin}
 * @see https://hacks.mozilla.org/2015/08/es6-in-depth-subclassing/
 */
export class VersionedArray extends VersionedMixin(Array) {}
