import xor from "lodash/xor"
import React, {Ref} from "react"
import {connectField} from "uniforms"
import {IonCheckbox, IonItem, IonListHeader, IonNote, IonSelect, IonSelectOption} from "@ionic/react"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"
import {IonicFieldProps} from "../../index"

const base64: typeof btoa =
    typeof btoa !== "undefined" ? btoa : (x: any) => Buffer.from(x).toString("base64")
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, "")

type CustomProps = {
    allowedValues?: string[];
    checkboxes?: boolean;
    disableItem?: (value: string) => boolean;
    inputRef?: Ref<HTMLIonSelectElement>;
    transform?: (value: string) => string;
    required?: boolean
}

export type SelectFieldProps = IonicFieldProps<string | string[], {}, CustomProps>

function Select(props: SelectFieldProps) {
    let {
        allowedValues,
        checkboxes,
        disabled,
        fieldType,
        id,
        inputRef,
        label,
        name,
        onChange,
        readOnly,
        required,
        disableItem,
        transform,
        value,
        description,
        error,
        errorMessage,
        showInlineError
    } = props
    const multiple = fieldType === Array

    if (checkboxes) {
        return <>
            <IonListHeader>
                <Label {...props}/>
                {description && <>&ensp;<IonNote style={{fontSize: "0.9em"}}>{description}</IonNote></>}
            </IonListHeader>
            <div style={{paddingLeft: 12}}>
                {allowedValues!.map(item => (
                    <IonItem key={item}>
                        <Label {...props} label={transform ? transform(item) : item}/>
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
            <Container {...props}>
                <Label{...props}/>
                <IonSelect
                    interface={"popover"}
                    onIonChange={(e) => {
                        onChange(e.detail.value || undefined)
                    }}
                    disabled={disabled || readOnly}
                    id={id}
                    multiple={multiple}
                    name={name}
                    ref={inputRef}
                    style={{opacity: readOnly && !disabled && 1, overflow: "hidden"}}
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
