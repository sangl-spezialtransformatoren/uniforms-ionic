import React from "react"
import {connectField, HTMLFieldProps} from "uniforms"
import {IonItem, IonListHeader, IonRadio, IonRadioGroup} from "@ionic/react"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"

const base64 =
    typeof btoa !== "undefined"
        ? btoa
        : (x: string) => Buffer.from(x).toString("base64")
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, "")

export type RadioFieldProps = HTMLFieldProps<string,
    typeof Container,
    {
        allowedValues?: string[];
        checkboxes?: boolean;
        transform?: (value: string) => string;
    }>;

function Radio({
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
                   ...props
               }: RadioFieldProps) {
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
                    <Label
                        error={error}
                        errorMessage={errorMessage}
                        showInlineError={showInlineError}>
                        {label}
                    </Label>
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
