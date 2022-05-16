import React, {Ref} from "react"
import {connectField} from "uniforms"
import {IonInput} from "@ionic/react"
import {AutocompleteTypes, TextFieldTypes} from "@ionic/core/dist/types/interface"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"
import {IonicFieldProps} from "../../index"

type CustomProps = {inputRef?: Ref<HTMLIonInputElement>, autoComplete?: AutocompleteTypes, type?: TextFieldTypes}
export type TextFieldProps = IonicFieldProps<string, {}, CustomProps>

function Text(props: TextFieldProps) {
    let {
        autoComplete,
        disabled,
        id,
        inputRef,
        name,
        onChange,
        placeholder,
        readOnly,
        type,
        value,
    } = props

    return (
        <Container {...props}>
            <Label{...props}/>
            <IonInput
                autocomplete={autoComplete}
                disabled={disabled}
                id={id}
                name={name}
                onIonChange={event => onChange(event.detail.value || undefined)}
                placeholder={placeholder}
                readonly={readOnly}
                ref={inputRef}
                type={type as TextFieldTypes}
                value={value ?? undefined}
            />
        </Container>
    )
}

Text.defaultProps = {type: "text"} as {type: TextFieldTypes}

export const TextField = connectField(Text, {kind: "leaf"})
