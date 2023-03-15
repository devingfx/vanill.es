
export default function( ...mixins )
{
	return mixins.reduce( (c, mixin)=> mixin(c), this )
}
