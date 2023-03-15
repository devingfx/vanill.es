# Vanill<b>.</b>es
> **V**anill<b>.</b>es, **a**nother **n**ebulous **i**nteroperable **l**inted **l**oot of **E**cma **s**cripts
<!-- https://www.thefreedictionary.com/words-that-start-with-i
Another
Nebulous
Non -opiniated conventional destructive restrictive conflicting
International Ideas
Linted Limited Low Latency
Lonely Loot of Location for
Ecmascript
Super-lib Supply Solutions -->
A vanilla javascript... non-framework!

## Load / install

Vanill<b>.</b>es is a just a bunch of standard es-modules, so there is nothing special importing them...  
The only thing you have to know is from which origin you want to start.  

You may use :

- a CDN
  - [x] https://cdn.jsdelivr.net/gh/devingfx/vanill.es

- Github pages
  - [ ] https://vanill.es
  - [ ] https://devingfx.github.io/vanill.es

- NPM
  - [ ] ./node_modules/vanill.es/  
        vanill<b>.</b>es  
	```bash
	yarn/npm install vanill.es
	```

- or a local copy
  - [x] http://localhost:8080
	```bash
	git clone https://github.com/devingfx/vanill.es
	some-static-server -p:8080 ./vanill.es
	```

along with:
- [x] a browser
	```html
	<script type="module" src="<origin>/path/to/module.js?global=myExportName"></script>
	```
	```html
	<script type="module">
	import '<origin>/path/to/module.js?global=myExportName'
	import * as vanilles from '<origin>/index.js'
	import { HTML } from '<origin>/DOM.js'
	</script>
	```
- [ ] nodejs (goal, not tested yet)
	```js
	const vanilles = require('vanill.es')
	const { thing } = require('vanill.es/path/to/module.js')
	```
	```js
	import * as vanilles from 'vanill.es'
	import { thing } from 'vanill.es/path/to/module.js'
	```
- [ ] Deno (goal, not tested yet)
	```js
	import * as vanilles from '<origin>/index.js'
	import { thing } from '<origin>/path/to/module.js'
	```

All at once :

```html
<script type="module" src="<origin>/vanill.es/index.js"></script>
```

Using import:

```html
<script type="module">
import 'https://cdn.jsdelivr.net/gh/devingfx/vanill.es/index.js'
import { HTML } from 'https://cdn.jsdelivr.net/gh/devingfx/vanill.es/index.js'
import { HTML } from 'https://cdn.jsdelivr.net/gh/devingfx/vanill.es/DOM.js'
</script>
```

### Using import maps
_(@see [How to control the behavior of JavaScript imports](https://github.com/WICG/import-maps#installation))_

```html
<script type=importmap>{"imports":{
	"vanill.es":
		"https://cdn.jsdelivr.net/gh/devingfx/vanill.es/index.js"
,	"vanill.es/":
		"https://cdn.jsdelivr.net/gh/devingfx/vanill.es/"
}}</script>
```

or generated in js to get comments available, and be able to easily switch between origins during development

```html
<script>
(( imports, scopes )=> {
	const m = document.createElement('script')
	m.type = 'importmap'
	m.textContent = JSON.stringify({ imports, scopes })
	document.currentScript.after(m)
})({
	"vanill.es":
		// "https://cdn.jsdelivr.net/gh/devingfx/vanill.es/index.js"
		// "http://localhost:8080/vanill.es/index.js"
		"../vanill.es/index.js"
,	"vanill.es/":
		// "https://cdn.jsdelivr.net/gh/devingfx/vanill.es/"
		// "http://localhost:8080/vanill.es/"
	 	"../vanill.es/"
})
</script>
or
<script>
document.write(`<`+`script type="importmap">${JSON.stringify({"imports":
{
	"vanill.es":
		// "https://cdn.jsdelivr.net/gh/devingfx/vanill.es/index.js"
		// "http://localhost:8080/vanill.es/index.js"
		"../vanill.es/index.js"
,	"vanill.es/":
		// "https://cdn.jsdelivr.net/gh/devingfx/vanill.es/"
		// "http://localhost:8080/vanill.es/"
	 	"../vanill.es/"
}}
)}<`+`/script>`)
</script>
```
### Dynamic 

or with `vanill.es/importmap.js` ( *external fetch is [not recommended](https://github.com/WICG/import-maps#installation)* )
> Note that the `<script>` tag should **NOT** be `type=module` because importmap need to be loaded before any `import`.  any import maps must be present and successfully fetched before any module resolution is done. This means that module graph fetching is blocked on import map fetching.

> This means that the inline form of import maps is strongly recommended for best performance. 
```html
<script src="https://cdn.jsdelivr.net/gh/devingfx/vanill.es/importmap.js">
{
	"vanill.es":
		// "https://cdn.jsdelivr.net/gh/devingfx/vanill.es/index.js"
		// "http://localhost:8080/vanill.es/index.js"
		"../vanill.es/index.js"
,	"vanill.es/":
		// "https://cdn.jsdelivr.net/gh/devingfx/vanill.es/"
		// "http://localhost:8080/vanill.es/"
	 	"../vanill.es/"
}
</script>
```
then all module import statements ( including `await import()` ) 
can be shortened to only `vanill.es/....js` and easily switched from
importmap instead of in every scripts:
```html
<script type="module">
import * as vanilles from 'vanill.es'
import { $, $$, HTML } from 'vanill.es/DOM.js'

import('vanill.es/Array.js')
	.then( mod=> new mod.ArrayEmitter(1,2,3).on(...) )

</script>
```
### Module tree

Generally each leaf module exports a default feature, so you have to 
import it without `{}` in the import statement:

```js
import   groupBy   from 'vanill.es/Array/reduce/groupBy.js'
```

Each folder contains a `index.js` module *to rule them all*, and also
a `<folder>.js` file is present in the parent folder. So any module can be accessed directly (usualy the default export),
from the folder index or the parent :

```js
import   groupBy   from 'vanill.es/Array/reduce/groupBy.js'
// or
import { groupBy } from 'vanill.es/Array/reduce/index.js'
// or
import { groupBy } from 'vanill.es/Array/reduce.js'
// or
import { groupBy } from 'vanill.es/Array/index.js'
// or
import { groupBy } from 'vanill.es/Array.js'
// or
import { groupBy } from 'vanill.es/index.js'
// or
import { groupBy } from 'vanill.es'
```

> Of course, using index modules in browsers will also import everything else in that module !
> Avoid it to get benefit of **tree shaking** or use a packager like [rollup](https://rollupjs.org/guide/en/)...

You may also add custom entries to the importmap to name it
your way :

```html
<script src="https://cdn.jsdelivr.net/gh/devingfx/vanill.es/importmap.js">
{
	"vanill.es":
		"https://cdn.jsdelivr.net/gh/devingfx/vanill.es/index.js"
,	"vanill.es/":
		"https://cdn.jsdelivr.net/gh/devingfx/vanill.es/"
		
,	"vaniGroup":
		"vanill.es/Array/reduce/groupBy.js"
}
</script>
```

then

```js
import grp from 'vaniGroup'
```

A bit cumbersome, but it's your choice!


### Natives polluting

Every modules are standalone and exports a feature.

```js
import toCamelCase from 'vanill.es/String/toCamelCase.js'

console.assert( toCamelCase('My awesome title') == 'myAwesomeTitle' )
```

Sometimes it can be usefull to get access to the feature from a native 
object or class.  
Module files finishing by a `_` are the ones to import
to get the feature added to the corresponding usefull context:

```js
import 'vanill.es/String/toCamelCase_.js'	//@TODO
// or
import 'vanill.es/String/index_.js'

console.assert( 'My awesome title'.toCamelCase() == 'myAwesomeTitle' )
```

The same rule apply to index modules `<folder>/index_.js` and parent shortcut `<folder>_.js`:

```js
import 'vanill.es/String/index_.js'
// or
import 'vanill.es/String_.js'

console.assert( typeof String.merge == 'function' )
console.assert( typeof String.prototype.toCamelCase == 'function' )
console.assert( typeof String.prototype.toKebabCase == 'function' )
```

> Notice you can still import named exports that doesn't hook to a context, from these index files:
> ```js
> import { YAML } from 'vanill.es/String_.js'
> 
> let myKey = 'list of interesting files'.toCamelCase()
> 
> await YAML.import()
> 
> const config = YAML`
> flag: true
> ${myKey}:
>   - file1.ext
>   - file2.ext
>   - file3.ext
> `
> //> { flag: true, listOfInterestingFiles: ["file1.ext", "file2.ext", "file3.ext"] }
> 
> ```


## Templates

## Composition
TODO Speak more about class mixins

Mixins are functions with 1 argument that return a class extending that argument:

```js
AwesomeMixin = parent=> class Awesomeness extends parent {
	isAwesome = true
}
```

You can use it by calling it with the base class to extend into the `extends` part of class definition:

```js
class Toto extends AwesomeMixin(Base) {
	isMixined = this.isAwesome == true
}
```

> See also  
> [Function mixin()](#Function/mixin) helper  
> [elements](#elements) mixins  

## Working with DOM

```javascript
import { $, $$, HTML, XML, SVG } from 'vanill.es/DOM'

const myNode = $`#my-node`	// querySelector
,	myListOfNodes = $$`div`	// querySelectorAll in a real Array
,	myFragment = HTML`<div class="foo"></div>`
,	myIcon = SVG`<rect fill="red" width="100%" height="100%"></rect>`

console.log( myFragment[0] )
// > div

myNode.add(
	myListOfNodes[5]
,	myListOfNodes[6]
//,	...
)
myNode.add(
	...myListOfNodes
)
myNode.add(
	...myFragment
)

myNode.addHTML(`
	plain text
	<div class="foo">foo</div>
	<div class="bar">bar</div>
`)
myNode.addHTMLBefore(`
	<div class="foo"></div>
	<div class="bar"></div>
`)

myNode.$`sub-div`	// node
myNode.$$`sub-div`	// array


```

> See also  
> [DOM](#DOM) modules


