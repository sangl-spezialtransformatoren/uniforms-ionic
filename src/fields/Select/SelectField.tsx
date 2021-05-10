import xor from "lodash/xor"
import React, {Ref} from "react"
import {connectField, HTMLFieldProps} from "uniforms"
import {IonCheckbox, IonItem, IonListHeader, IonSelect, IonSelectOption} from "@ionic/react"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"

const base64: typeof btoa =
    typeof btoa !== "undefined" ? btoa : x => Buffer.from(x).toString("base64")
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, "")

export type SelectFieldProps = HTMLFieldProps<string | string[],
    typeof Container,
    {
        allowedValues?: string[];
        checkboxes?: boolean;
        disableItem?: (value: string) => boolean;
        inputRef?: Ref<HTMLIonSelectElement>;
        transform?: (value: string) => string;
    }>;

function Select(
    {
        allowedValues,
        checkboxes,
        disabled,
        fieldType,
        id,
        inputRef,
        label,
        name,
        onChange,
        placeholder,
        readOnly,
        required,
        disableItem,
        transform,
        value,
        ...props
    }: SelectFieldProps) {
    const multiple = fieldType === Array

    if (checkboxes) {
        return <>
            <IonListHeader>
                <Label>{label}</Label>
            </IonListHeader>
            <div style={{paddingLeft: 12}}>
                {allowedValues!.map(item => (
                    <IonItem key={item}>
                        <Label>{transform ? transform(item) : item}</Label>
                        <IonCheckbox
                            checked={
                                fieldType === Array ? value!.includes(item) : value === item
                            }
                            disabled={disableItem?.(item) ?? disabled}
                            id={`${id}-${escape(item)}`}
                            name={name}
                            onChange={() => {
                                if (!readOnly) {
                                    onChange(fieldType === Array ? xor([item], value) : item)
                                }
                            }}
                        />
                    </IonItem>
                ))}
            </div>
        </>
    } else {
        return <>
            <Container>
                <Label>{label}</Label>
                <IonSelect
                    interface={"popover"}
                    onIonChange={(e) => {
                        onChange(e.detail.value || undefined)
                    }}
                    disabled={disabled}
                    id={id}
                    multiple={multiple}
                    name={name}
                    ref={inputRef}
                    value={value ?? null}>

                    {value !== undefined && !required && !multiple &&
                    <IonSelectOption value={null} disabled={required} hidden={required}>
                        {"Remove selection"}
                    </IonSelectOption>
                    }

                    {allowedValues?.map(value => (
                        <IonSelectOption disabled={disableItem?.(value)} key={value} value={value}>
                            {transform ? transform(value) : value}
                        </IonSelectOption>
                    ))}
                </IonSelect>
            </Container>
        </>
    }
}

export const SelectField = connectField(Select, {kind: "leaf"})
