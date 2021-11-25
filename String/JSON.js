import merge from "./merge.js"

const J = JSON
const tJSON = (ss,...pp)=> J.parse( merge(ss,...pp) )

Object.getOwnPropertyNames(J).map( k=> tJSON[k] = J[k] )

export default tJSON