import {BaseForm} from "./BaseForm"
import {QuickForm} from "./QuickForm"
import {ValidatedForm} from "./ValidatedForm"

export const ValidatedQuickForm = ValidatedForm.Validated(QuickForm.Quick(BaseForm))
