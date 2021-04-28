
const DOM = (ss,...pp)=> (
                ss = Array.from(ss), 
                S0 = ss.shift(), 
                L0 = (LL = LINE(S0)).shift(), 
                ss = [...LL, ...ss], 
                (new DOMParser).parseFromString(
					ss.map( (i,s)=> s + pp[i] || '' ), 
					L0
				).body.childNodes 
            )

const HTML = (ss,...pp)=> DOM( ['text/html\n', ...ss], ...pp ).body.childNodes

const XML = (ss,...pp)=> DOM( ['application/xml\n', ...ss], ...pp ).documentElement

const SVG = (ss,...pp)=> DOM( ['image/svg+xml\n', ...ss], ...pp )



export { DOM, HTML, XML, SVG }