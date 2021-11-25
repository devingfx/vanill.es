/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import YAML from './YAML.js'

var res, ref

export default async({test})=>

	await test `YAML`( async ({test,ok})=>{
		
		ok `function defined` ( YAML && typeof YAML == 'function' )
		
		await test `import` ( async ({log,ok})=> {
		
			try{
				YAML()
			}catch(e){
				ok `impl. not loaded` ( e )
			}
		
			log `await YAML.import()`
			await YAML.import()
			
			ok `impl. loaded globally` ( jsyaml )
		
		})
		
		ok `parse a string` ( YAML`hello world !` == "hello world !" )
		ok `parse an object` ( YAML`hello: world !`.hello == "world !" )
		
	})
	