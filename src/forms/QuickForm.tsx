import {QuickForm as UniformsQuickForm} from "uniforms"

import {AutoField, ErrorsField, SubmitField} from "../fields"
import {BaseForm} from "./BaseForm"

function Quick(parent: any): any {
    class _ extends UniformsQuickForm.Quick(parent) {
        static Quick = Quick

        getAutoField() {
            return AutoField
        }

        getErrorsField() {
            return ErrorsField
        }

        getSubmitField() {
            return SubmitField
        }
    }

    return _
}

export const QuickForm = Quick(BaseForm)
