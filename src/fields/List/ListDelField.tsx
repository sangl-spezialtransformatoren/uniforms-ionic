import {IonButton, IonButtons, IonIcon} from "@ionic/react"
import React from "react"
import {connectField, HTMLFieldProps, joinName, useField} from "uniforms"
import {removeCircleOutline} from "ionicons/icons"
import {AutoField} from "../Auto/AutoField"

export type ListDelFieldProps = HTMLFieldProps<unknown, HTMLSpanElement>;

export function createListDelField(AutoField: AutoField) {
    function ListDel({disabled, name, readOnly, ...props}: ListDelFieldProps) {
        const nameParts = joinName(null, name)
        const nameIndex = +nameParts[nameParts.length - 1]
        const parentName = joinName(nameParts.slice(0, -1))
        const parent = useField<{minCount?: number}, unknown[]>(
            parentName,
            {},
            {absoluteName: true}
        )[0]

        const limitNotReached =
            !disabled && !(parent.minCount! >= parent.value!.length)

        function onAction(
            event:
                | React.KeyboardEvent<HTMLSpanElement>
                | React.MouseEvent<HTMLSpanElement, MouseEvent>
        ) {
            if (
                limitNotReached &&
                !readOnly &&
                (!("key" in event) || event.key === "Enter")
            ) {
                const value = parent.value!.slice()
                value.splice(nameIndex, 1)
                parent.onChange(value)
            }
        }

        return (
            <IonButtons style={{position: "absolute", left: 4, marginTop: 11}}>
                <IonButton onClick={onAction} onKeyDown={onAction} tabIndex={0} className={"list-buttons"}>
                    <IonIcon icon={removeCircleOutline}/>
                </IonButton>
            </IonButtons>
        )
    }

    return connectField(ListDel, {initialValue: false, kind: "leaf"})
}

export const ListDelField = createListDelField(AutoField)
