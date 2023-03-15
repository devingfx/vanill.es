export class Undefined {}
export class Null {}

const type = obj=> 
	typeof obj == "undefined"
		? Undefined
	: obj === null
		? Null
	: typeof obj == "boolean"
		? Boolean
	: typeof obj == "number"
		? Number
	: typeof obj == "bigint"
		? BigInt
	: typeof obj == "string"
		? String
	: typeof obj == "symbol"
		? Symbol
	: typeof obj == "function"
		? Function
	: typeof obj == "object"
		? Object.getPrototypeOf(obj).constructor
	: false


export default type