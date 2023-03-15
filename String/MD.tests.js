/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import MD from './MD.js'

var res, ref

export default async({test})=>

	await test `MD`( async ({test})=>{
		
		await test `MD.import()`( async ({ok})=>{
			
			await MD.import()
			ok `library imported` ( window?.markdownit )
			ok `parser created` (
				MD._parser
			&&	MD._parser.inline
			&&	MD._parser.block
			&&	MD._parser.core
			&&	MD._parser.renderer
			&&	MD._parser.utils
			&&	MD._parser.helpers
			&&	MD._parser.options
			)
			
			/*@TODO test
			MD._parser.options ==
			{
				html: false,
				xhtmlOut: false,
				breaks: false,
				langPrefix: "language-",
				linkify: false,
				typographer: false,
				quotes: "“”‘’",
				highlight: null,
				maxNesting: 100
			}
			*/
			
			delete MD._parser
			delete window.markdownit
			
		})
		
		await test `MD.import( options )`( async ({ok})=>{
			
			await MD.import({
				html: true,
				linkify: true,
				typographer: true,
				//highlight,	//@see https://markdown-it.github.io/markdown-it/#MarkdownIt
				addons: {
					markdownitFrontMatter: 'https://unpkg.com/markdown-it-front-matter@0.2.3/index.js',
					markdownitDecorate: 'https://unpkg.com/markdown-it-decorate@1.2.2/index.js'
				}
			})
			.then( md=>md
				.use( md.options.addons.markdownitFrontMatter, fm=> MD.onFrontMatter(YAML(fm)) )
				.use( md.options.addons.markdownitDecorate )
			)
			
			ok `library imported` ( window?.markdownit )
			ok `parser created` (
				MD._parser
			&&	MD._parser.inline
			&&	MD._parser.block
			&&	MD._parser.core
			&&	MD._parser.renderer
			&&	MD._parser.utils
			&&	MD._parser.helpers
			&&	MD._parser.options
			)
			ok `parser have good options` ()
			
		})
		
	})
