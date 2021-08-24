# vanilles

A vanilla javascript... non-framework!

## Load

All at once :
```html
<script type="module" src="https://cdn.jsdelivr.net/gh/devingfx/vanill.es/index.js"></script>
```

Using import:
```html
<script type="module">
import 'https://cdn.jsdelivr.net/gh/devingfx/vanill.es/index.js'
import { HTML } from 'https://cdn.jsdelivr.net/gh/devingfx/vanill.es/index.js'
import { HTML } from 'https://cdn.jsdelivr.net/gh/devingfx/vanill.es/DOM.js'
</script>
```

### Using import maps (with comments switch)

```html
<script>
const importmap = ( imports, scopes )=> {
	const im = document.createElement('script')
	im.type = 'importmap'
	im.textContent = JSON.stringify({ imports, scopes })
	document.currentScript.after(im)
}
importmap({
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
[ ... ]
<script type="module">
import * as vanilles from 'vanill.es'
import { $, $$, DOC, XML, XHTML, HTML, SVG } from 'vanill.es/DOM.js'
</script>
```

## Templates

## Composition

## Working with DOM

```javascript
import { $, $$, HTML, XML, SVG } from 'vanill.es/DOM'

const myNode = $`#my-node`	// querySelector
,	myListOfNodes = $$`div`	// querySelectorAll
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
	<div class="foo"></div>
	<div class="bar"></div>
`)
myNode.addHTMLBefore(`
	<div class="foo"></div>
	<div class="bar"></div>
`)

myNode.$`sub-div`	// node
myNode.$$`sub-div`	// array


```