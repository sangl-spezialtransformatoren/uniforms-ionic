import {AutoForm as UniformsAutoForm} from "uniforms"

import {ValidatedQuickForm} from "./ValidatedQuickForm"

function Auto(parent: any): any {
    class _ extends UniformsAutoForm.Auto(parent) {
        static Auto = Auto
    }

    return _
}

export const AutoForm = Auto(ValidatedQuickForm)
