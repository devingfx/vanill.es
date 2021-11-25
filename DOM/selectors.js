
/**
 * Query selectors
 */


/*@TODO impl $ a rapatrier
x dev/Elliott.ist/waves.svg/DOM.js
./Elliott.ist/waves.svg/DOM.js:// const $ = (ss,...pp)=> document.querySelector( ss_pp(ss,...pp) )
./Elliott.ist/waves.svg/DOM.js:// const $$ = (ss,...pp)=> [...document.querySelectorAll( ss_pp(ss,...pp) )]

/g/dev/odoo/module_recorder_cleanner/bookmarklet.js
/g/dev/VisualProgrammingNodes/nouilles/DOM.js:// const $ = (ss,...pp)=> document.querySelector( ss_pp(ss,...pp) )
/g/dev/VisualProgrammingNodes/nouilles/DOM.js:// const $$ = (ss,...pp)=> [...document.querySelectorAll( ss_pp(ss,...pp) )]

*/


// from dev/Elliott.ist/waves.svg/DOM.js
const $ = (...args)=> document.$( ...args )
const $$ = (...args)=> document.$$( ...args )
// end from dev/Elliott.ist/waves.svg/DOM.js

export { $, $$ }


/* inline-exemple
$`body`
$$`section.about > .menu:not([disabled]) li`
document.head.$`script[src*="exemple.com"]`
document.head.$$`link,script`
let pics = $$`.about > img`.map( img=> img.href )
$`body`.$`.debug`.add(
	HTML`<ul class="pic-list">
		${pics.map( src=> `<li>${src}</li>` ).join('')}
	</ul>`[0]
)
*/