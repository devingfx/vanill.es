import merge from "./merge.js"
import toKebabCase from "./toKebabCase.js"
import toCamelCase from "./toCamelCase.js"

import escapeRegExp from "./escapeRegExp.js"
import trimChar from "./trimChar.js"

String.merge = merge
String.prototype.toCamelCase = function(){ return toCamelCase(this) }
String.prototype.toKebabCase = function(){ return toKebabCase(this) }
String.prototype.escapeRegExp = function(){ return escapeRegExp(this) }
String.prototype.trimChar = function( char ){ return trimChar(this, char) }



export * from './index.js'
