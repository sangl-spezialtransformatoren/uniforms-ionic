import React, {HTMLProps} from "react"
import {connectField, filterDOMProps, Override} from "uniforms"
import {Container} from "../../components/Container/Container"

export type ErrorFieldProps = Override<Omit<HTMLProps<typeof Container>, "onChange">, {error?: any; errorMessage?: string}>;

function Error({children, error, errorMessage, ...props}: ErrorFieldProps) {
    return !error ? null : (
        <Container {...filterDOMProps(props)}>{children || errorMessage}</Container>
    )
}

export const ErrorField = connectField(Error, {initialValue: false, kind: "leaf"})
