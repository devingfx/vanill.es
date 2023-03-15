
// String.merge = (ss,...pp)=> [].concat(ss).map((s,i)=>s+(typeof pp[i] != 'undefined'?pp[i]:'')).join('')
export default (ss,...pp)=> [].concat(ss).map( (s,i)=> s + (i in pp ? pp[i] : '') ).join('')
