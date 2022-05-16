import React, {HTMLProps} from "react"
import {filterDOMProps, useForm} from "uniforms"
import {Container} from "../../components/Container/Container"

export type ErrorsFieldProps = HTMLProps<HTMLDivElement>;

export const ErrorsField = (props: ErrorsFieldProps) => {
    const {error, schema} = useForm()
    return !error && !props.children ? null : (
        <Container {...props}>
            {props.children}

            <ul>
                {schema.getErrorMessages(error).map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </Container>
    )
}
