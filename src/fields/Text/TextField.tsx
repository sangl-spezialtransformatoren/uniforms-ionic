import React, {Ref} from "react"
import {connectField, filterDOMProps, HTMLFieldProps} from "uniforms"
import {IonInput} from "@ionic/react"
import {AutocompleteTypes, TextFieldTypes} from "@ionic/core/dist/types/interface"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"

export type TextFieldProps = HTMLFieldProps<string,
    typeof Container,
    {inputRef?: Ref<HTMLIonInputElement>}>;

function Text({
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
                  ...props
              }: TextFieldProps) {
    return (
        <Container
            error={error}
            showInlineError={showInlineError}
            errorMessage={errorMessage} {...filterDOMProps(props)}>
            <Label showInlineError={showInlineError} error={error} errorMessage={errorMessage}>{label}</Label>
            <IonInput
                autocomplete={autoComplete as AutocompleteTypes}
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

Text.defaultProps = {type: "text"}

export const TextField = connectField(Text, {kind: "leaf"})
