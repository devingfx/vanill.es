import { defineProperties, defineProperty, getOwnPropertyDescriptors, getOwnPropertyDescriptor } from './advancedDescriptor.js'

Object.defineProperties = defineProperties
Object.defineProperty = defineProperty
Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors
Object.getOwnPropertyDescriptor = getOwnPropertyDescriptor

export { defineProperties, defineProperty, getOwnPropertyDescriptors, getOwnPropertyDescriptor }