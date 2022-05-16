import React from "react"
import {connectField} from "uniforms"
import {IonItem, IonListHeader, IonNote, IonRadio, IonRadioGroup} from "@ionic/react"
import {Label} from "../../components/Label/Label"
import {IonicFieldProps} from "../../index"

const base64 =
    typeof btoa !== "undefined"
        ? btoa
        : (x: string) => Buffer.from(x).toString("base64")
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, "")

type CustomProps = {
    allowedValues?: string[];
    checkboxes?: boolean;
    transform?: (value: string) => string;
}

export type RadioFieldProps = IonicFieldProps<string, {}, CustomProps>

function Radio(props: RadioFieldProps) {
    let {
        allowedValues,
        disabled,
        id,
        label,
        name,
        onChange,
        readOnly,
        transform,
        value,
        error,
        errorMessage,
        showInlineError,
        description
    } = props
    return (
        <>
            <IonRadioGroup
                value={value}
                onIonChange={(e) => {
                    if (!readOnly) {
                        onChange(e.detail.value)
                    }
                }}>
                <IonListHeader>
                    <Label {...props} label={<><b>{label}</b>{description && <>&ensp;<IonNote
                        style={{fontSize: "0.9em"}}>{description}</IonNote></>}</>}/>
                </IonListHeader>

                {allowedValues?.map(item => (
                    <IonItem key={item}>
                        <Label>{transform ? transform(item) : item}</Label>
                        <IonRadio
                            value={item}
                            disabled={disabled}
                            id={`${id}-${escape(item)}`}
                            name={name}
                        />
                    </IonItem>
                ))}
            </IonRadioGroup>
        </>
    )
}

export const RadioField = connectField(Radio, {kind: "leaf"})
