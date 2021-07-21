import React, {Ref} from "react"
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
                autoGrow={!!(value?.length && value.length > 0)}
                disabled={disabled}
                id={id}
                name={name}
                onIonChange={event => event.detail.value && onChange(event.detail.value)}
                placeholder={placeholder}
                readonly={readOnly}
                ref={inputRef}
                value={value ?? ""}
            />
        </Container>
    )
}

export const LongTextField = connectField(LongText, {kind: "leaf"})
