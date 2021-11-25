import merge from "./merge.js"

// from ./Candler/elliott.js
export const D = (ss,...pp)=> new Date( merge(ss,...pp) )
export const T = day=> (ss,...pp)=> D`${day} ${merge(ss,...pp)}`












