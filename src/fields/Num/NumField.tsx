import React, {Ref} from "react"
import {connectField} from "uniforms"
import {IonInput} from "@ionic/react"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"
import {IonicFieldProps} from "../../index"

type CustomProps = {decimal?: boolean; inputRef?: Ref<HTMLIonInputElement>, max: number, min: number, step: number}
export type NumFieldProps = IonicFieldProps<number, {}, CustomProps>;

function Num(props: NumFieldProps) {
    let {
        decimal,
        disabled,
        id,
        inputRef,
        max,
        min,
        name,
        onChange,
        placeholder,
        readOnly,
        step,
        value
    } = props


    return (
        <Container {...props}>
            <Label {...props}/>
            <IonInput
                disabled={disabled}
                id={id}
                max={max !== undefined ? `${max}` : undefined}
                min={min !== undefined ? `${min}` : undefined}
                name={name}
                onIonInput={event => {
                    const parse = decimal ? parseFloat : parseInt
                    const value = event.detail.value ? parse(event.detail.value) : undefined
                    onChange(value ? (isNaN(value) ? undefined : value) : undefined)
                }}
                placeholder={placeholder}
                readonly={readOnly}
                ref={inputRef}
                step={(step && step.toString()) || (decimal ? "0.01" : "1")}
                type="number"
                value={value}
            />
        </Container>
    )
}

export const NumField = connectField(Num, {kind: "leaf"})
