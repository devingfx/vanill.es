import merge from "./merge.js"

const YAML = (...a)=> jsyaml.load( merge(...a) )
YAML.import = ()=> import('https://unpkg.com/js-yaml@4.1.0/dist/js-yaml.min.js')
YAML.stringify = obj=> jsyaml.dump(obj)

export default YAML
