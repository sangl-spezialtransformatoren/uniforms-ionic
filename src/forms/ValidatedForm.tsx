import {ValidatedForm as UniformsValidatedForm} from "uniforms"

import {BaseForm} from "./BaseForm"

function Validated(parent: any): any {
    class _ extends UniformsValidatedForm.Validated(parent) {
        static Validated = Validated
    }

    return _
}

export const ValidatedForm = Validated(BaseForm)
