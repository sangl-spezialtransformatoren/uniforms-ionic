import {GuaranteedProps, Override} from "uniforms/src/types"

import "./style/uniforms-ionic.scss"

export * from "./fields"
export * from "./forms"

export {Container} from "./components/Container/Container"
export {Label} from "./components/Label/Label"
export {createAutoFields} from "./fields/Auto/AutoFields"
export {createNestField} from "./fields/Nest/NestField"
export {createListField} from "./fields/List/ListField"
export {createListAddField} from "./fields/List/ListAddField"
export {createListDelField} from "./fields/List/ListDelField"
export {createListItemField} from "./fields/List/ListItemField"

export type IonicExtensionProps = {description?: string}
export type IonicFieldProps<Value, Base, Extension = object> = Override<Base, GuaranteedProps<Value> & IonicExtensionProps & Extension>