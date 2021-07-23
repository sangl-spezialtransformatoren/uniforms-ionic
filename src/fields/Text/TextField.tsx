import React, {Ref} from "react"
import {connectField} from "uniforms"
import {IonInput} from "@ionic/react"
import {AutocompleteTypes, TextFieldTypes} from "@ionic/core/dist/types/interface"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"
import {IonicFieldProps} from "../../index"

type CustomProps = {inputRef?: Ref<HTMLIonInputElement>, autoComplete?: AutocompleteTypes, type?: TextFieldTypes}
export type TextFieldProps = IonicFieldProps<string, {}, CustomProps>

function Text(
    {
        autoComplete,
        disabled,
        id,
        inputRef,
        label,
        name,
        onChange,
        placeholder,
        readOnly,
        type,
        value,
        error,
        errorMessage,
        showInlineError,
        description
    }: TextFieldProps) {

    return (
        <Container
            error={error}
            showInlineError={showInlineError}
            errorMessage={errorMessage}
            readOnly={readOnly}>
            <Label
                showInlineError={showInlineError}
                error={error}
                errorMessage={errorMessage}
                description={description}>
                {label}
            </Label>
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
