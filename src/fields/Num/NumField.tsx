import React, {Ref} from "react"
import {connectField} from "uniforms"
import {IonInput} from "@ionic/react"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"
import {IonicFieldProps} from "../../index"

type CustomProps = {decimal?: boolean; inputRef?: Ref<HTMLIonInputElement>, max: number, min: number, step: number}
export type NumFieldProps = IonicFieldProps<number, {}, CustomProps>;

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
                 description
             }: NumFieldProps) {
    return (
        <Container
            error={error}
            errorMessage={errorMessage}
            showInlineError={showInlineError}
            readOnly={readOnly}>
            <Label
                error={error}
                errorMessage={errorMessage}
                showInlineError={showInlineError}
                readOnly={readOnly}
                description={description}>
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
