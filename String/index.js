export { default as merge } from "./merge.js"

export { default as toKebabCase } from "./toKebabCase.js"
export { default as toCamelCase } from "./toCamelCase.js"
//@TODO @see https://github.com/blakeembrey/change-case
// camelCase: changeFormatToThis
// snakeCase: change_format_to_this
// dashCase/kebabCase: change-format-to-this
// dotCase: change.format.to.this
// pathCase: change/format/to/this
// properCase/pascalCase: ChangeFormatToThis
// lowerCase: change format to this
// sentenceCase: Change format to this,
// constantCase: CHANGE_FORMAT_TO_THIS
// titleCase: Change Format To This

export { default as MD } from "./MD.js"
export { default as YAML } from "./YAML.js"
export { default as JSON } from "./JSON.js"

export * from "./DateTime.js"

export { default as escapeRegExp } from "./escapeRegExp.js"
export { default as trimChar } from "./trimChar.js"

//@TODO live TXT tag ? updates it's properties parts when it changes
// export const TXT

/*impls
es-layground/drafts/CSV.js
*/
// export const CSV
// export const TSV


/*impls:
./customElements/LANG.js:const LANG = (ss, ...pp)=> `<lang>${ss_pp(ss, ...pp)}</lang>`
*/
// export const LANG












