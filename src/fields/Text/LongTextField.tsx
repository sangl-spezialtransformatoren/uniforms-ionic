import React, {Ref, useState} from "react"
import {connectField} from "uniforms"
import {IonNote, IonTextarea} from "@ionic/react"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"
import {IonicFieldProps} from "../../index"

type CustomProps = {inputRef?: Ref<HTMLIonTextareaElement>}
export type LongTextFieldProps = IonicFieldProps<string, {}, CustomProps>;

function LongText(props: LongTextFieldProps) {
    let {
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
        description,
        ...otherProps
    } = props
    let [autogrow, setAutogrow] = useState(false)
    return (
        <Container {...props}>
            <Label {...props} label={<>{label}{description && <><IonNote
                style={{fontSize: "0.9em"}}>&ensp;{description}</IonNote></>}</>}/>
            <IonTextarea
                autoGrow={autogrow && typeof value === "string" && (value.split("\n").length > 1) && !readOnly && !disabled}
                disabled={disabled}
                id={id}
                name={name}
                onIonInput={event => {
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
