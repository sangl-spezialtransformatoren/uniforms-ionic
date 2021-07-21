import React, {Ref} from "react"
import {connectField, FieldProps} from "uniforms"
import {IonCheckbox} from "@ionic/react"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"

export type BoolFieldProps = FieldProps<boolean, typeof Container, {inputRef?: Ref<HTMLIonCheckboxElement>}>;
const Bool: React.FC<BoolFieldProps> = (
    {
        disabled,
        id,
        inputRef,
        label,
        name,
        onChange,
        readOnly,
        value,
        error,
        errorMessage,
        showInlineError
    }) => {
    return <>
        <Container
            error={error}
            errorMessage={errorMessage}
            showInlineError={showInlineError}
            readOnly={readOnly}>
            <Label
                error={error}
                errorMessage={errorMessage}
                showInlineError={showInlineError}
                readOnly={readOnly}>
                {label}
            </Label>
            <IonCheckbox
                slot={"end"}
                checked={value}
                indeterminate={value === undefined || value === null}
                disabled={disabled || readOnly}
                id={id}
                name={name}
                style={{opacity: readOnly && 1}}
                color={readOnly && !disabled ? "dark" : undefined}
                onIonChange={(e) => {
                    if (!disabled && !readOnly) {
                        onChange(e.detail.checked)
                    }
                }}
                ref={inputRef}
            />
        </Container>
    </>
}

export const BoolField = connectField(Bool, {kind: "leaf"})
