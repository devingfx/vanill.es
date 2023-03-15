Object.mergeDescriptors = ( all, cls )=> ({
	...all,
	...Object.getOwnPropertyDescriptors(cls.prototype)
})