import React, {Ref} from "react"
import {connectField} from "uniforms"
import {IonCheckbox} from "@ionic/react"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"
import {IonicFieldProps} from "../../index"

type CustomProps = {inputRef?: Ref<HTMLIonCheckboxElement>}
export type BoolFieldProps = IonicFieldProps<boolean, {}, CustomProps>;

const Bool: React.FC<BoolFieldProps> = (props) => {
    let {
        disabled,
        id,
        inputRef,
        name,
        onChange,
        readOnly,
        value,
    } = props
    return <>
        <Container {...props}>
            <Label {...props}/>
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
