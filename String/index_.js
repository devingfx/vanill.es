import merge from "./merge.js"
import toKebabCase from "./toKebabCase.js"
import toCamelCase from "./toCamelCase.js"

String.merge = merge
String.prototype.toCamelCase = function(){ return toCamelCase(this) }
String.prototype.toKebabCase = function(){ return toKebabCase(this) }



export * from './index.js'
