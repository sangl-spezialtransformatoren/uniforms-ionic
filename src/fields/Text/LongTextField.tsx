import React, {Ref, useState} from "react"
import {connectField, filterDOMProps, HTMLFieldProps} from "uniforms"
import {IonTextarea} from "@ionic/react"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"

export type LongTextFieldProps = HTMLFieldProps<string,
    typeof Container,
    {inputRef?: Ref<HTMLIonTextareaElement>}>;

function LongText({
                      disabled,
                      id,
                      inputRef,
                      label,
                      name,
                      onChange,
                      placeholder,
                      readOnly,
                      value,
                      error,
                      errorMessage,
                      showInlineError,
                      ...props
                  }: LongTextFieldProps) {
    let [autogrow, setAutogrow] = useState(false)
    return (
        <Container
            error={error}
            errorMessage={errorMessage}
            showInlineError={showInlineError}
            readOnly={readOnly}
            {...filterDOMProps(props)}>
            <Label
                position={"stacked"}
                error={error}
                errorMessage={errorMessage}
                showInlineError={showInlineError}
                readOnly={readOnly}>
                {label}
            </Label>
            <IonTextarea
                autoGrow={autogrow && !!(value?.length && value.split("\n").length > 1) && !readOnly && !disabled}
                disabled={disabled}
                id={id}
                name={name}
                onIonChange={event => {
                    setAutogrow(true)
                    event.detail.value && onChange(event.detail.value)
                }}
                placeholder={placeholder}
                readonly={readOnly}
                ref={inputRef}
                value={value ?? ""}
            />
        </Container>
    )
}

export const LongTextField = connectField(LongText, {kind: "leaf"})
