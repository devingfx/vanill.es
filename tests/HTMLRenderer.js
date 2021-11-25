
export const escHTML = txt=> new Option(txt).innerHTML

export const HTMLsspp = ( ss, ...pp )=> 
		ss.map( ( s, i, a
					,  type = ( ss[i+1] || '' )[0]
					)=>
						escHTML( s.slice( i == 0 ? 0 : 1 ) )
							+ ( i in pp
								? type == 'c'
									? pp[i] == ''
										? `</span>`
										: `<span style="${pp[i]}">`
									: pp[i]
							:'')
		).join('')

export const HTMLTest = ( lvl = 2 )=> test=>
			test.length || test.icon == '☢️'
			// ?	`<details ${!['✔️','☢️'].includes( test.icon ) ? 'open' : ''}>
			?	`<details ${ test.icon != '✔️' ? 'open' : ''}>
					<summary>
						<h${lvl}>${HTMLsspp( test.ss, ...test.pp )}</h${lvl}>
					</summary>
					${test.length ? test.map(HTMLTest(lvl+1)).join('') : ''}
				</details>`
			:	`<h${lvl}>${HTMLsspp( test.ss, ...(test.pp||[]) )}</h${lvl}>`
		