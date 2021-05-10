import React, {Ref} from "react"
import {connectField, filterDOMProps, HTMLFieldProps} from "uniforms"
import {IonInput} from "@ionic/react"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"

export type NumFieldProps = HTMLFieldProps<number,
    HTMLDivElement,
    {decimal?: boolean; inputRef?: Ref<HTMLIonInputElement>}>;

function Num({
                 decimal,
                 disabled,
                 id,
                 inputRef,
                 label,
                 max,
                 min,
                 name,
                 onChange,
                 placeholder,
                 readOnly,
                 step,
                 value,
                 error,
                 errorMessage,
                 showInlineError,
                 ...props
             }: NumFieldProps) {
    return (
        <Container
            error={error}
            errorMessage={errorMessage}
            showInlineError={showInlineError}
            {...filterDOMProps(props)}>
            <Label
                error={error}
                errorMessage={errorMessage}
                showInlineError={showInlineError}>
                {label}
            </Label>
            <IonInput
                disabled={disabled}
                id={id}
                max={max !== undefined ? `${max}` : undefined}
                min={min !== undefined ? `${min}` : undefined}
                name={name}
                onIonChange={event => {
                    const parse = decimal ? parseFloat : parseInt
                    const value = event.detail.value ? parse(event.detail.value) : undefined
                    onChange(value ? (isNaN(value) ? undefined : value) : undefined)
                }}
                placeholder={placeholder}
                readonly={readOnly}
                ref={inputRef}
                step={(step && step.toString()) || (decimal ? "0.01" : "1")}
                type="number"
                value={value ?? ""}
            />
        </Container>
    )
}

export const NumField = connectField(Num, {kind: "leaf"})
