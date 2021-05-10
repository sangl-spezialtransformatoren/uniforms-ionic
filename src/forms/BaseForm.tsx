import {BaseForm as UniformsBaseForm} from "uniforms"

function Ionic(parent: any): any {
    class _ extends parent {
        static Ionic = Ionic

        static displayName = `Unstyled${parent.displayName}`
    }

    return _
}

export const BaseForm = Ionic(UniformsBaseForm)
