import React, {HTMLProps} from "react"
import {connectField, Override} from "uniforms"
import {Container} from "../../components/Container/Container"

export type ErrorFieldProps = Override<Omit<HTMLProps<typeof Container>, "onChange">, {error?: any; errorMessage?: string}>;

function Error(props: ErrorFieldProps) {
    let {children, error, errorMessage} = props
    return !error ? null : (
        <Container {...props}>{children || errorMessage}</Container>
    )
}

export const ErrorField = connectField(Error, {initialValue: false, kind: "leaf"})
