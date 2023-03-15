
export default function *protoChain( cls )
{
	let safe = 100
	yield cls = cls.constructor == Function ? cls : cls.constructor
	while( safe-- && cls.__proto__ && cls.__proto__ != Function.prototype )
		yield cls = cls.__proto__
}






/*
[...protoChain(wave.group)]	//> (6) [ƒ, ƒ, ƒ, ƒ, ƒ, ƒ]0: ƒ SVGGElement()1: ƒ SVGGraphicsElement()2: ƒ SVGElement()3: ƒ Element()4: ƒ Node()5: ƒ EventTarget()length: 6__proto__: Array(0)

[...protoChain(wave.group.line)]	//> (7) [ƒ, ƒ, ƒ, ƒ, ƒ, ƒ, ƒ]0: ƒ SVGLineElement()1: ƒ SVGGeometryElement()2: ƒ SVGGraphicsElement()3: ƒ SVGElement()4: ƒ Element()5: ƒ Node()6: ƒ EventTarget()length: 7__proto__: Array(0)

[...protoChain(SVG.Wave)]	//> (3) [ƒ, ƒ, ƒ]0: class extends1: class Wave2: ƒ Array()length: 3__proto__: Array(0)
*/