import cloneDeep from "lodash/cloneDeep"
import React from "react"
import {connectField, HTMLFieldProps, joinName, useField} from "uniforms"
import {IonButton, IonButtons, IonIcon} from "@ionic/react"
import {addCircleOutline} from "ionicons/icons"
import {AutoField} from "../Auto/AutoField"

export type ListAddFieldProps = HTMLFieldProps<unknown,
    HTMLIonButtonsElement,
    {initialCount?: number}>;

export function createListAddField(AutoField: AutoField) {
    function ListAdd({
                         disabled,
                         initialCount,
                         name,
                         readOnly,
                         value,
                         ...props
                     }: ListAddFieldProps) {
        const nameParts = joinName(null, name)
        const parentName = joinName(nameParts.slice(0, -1))
        const parent = useField<{initialCount?: number; maxCount?: number},
            unknown[]>(parentName, {initialCount}, {absoluteName: true})[0]

        const limitNotReached =
            !disabled && !(parent.maxCount! <= parent.value!.length)

        function onAction(event: React.KeyboardEvent | React.MouseEvent) {
            if (
                limitNotReached &&
                !readOnly &&
                (!("key" in event) || event.key === "Enter")
            ) {
                parent.onChange(parent.value!.concat([cloneDeep(value)]))
            }
        }

        return (
            <IonButtons style={{visibility: (readOnly || disabled) && "hidden"}}>
                <IonButton onClick={onAction} onKeyDown={onAction} tabIndex={0} className={"list-buttons"}>
                    <IonIcon icon={addCircleOutline}/>
                </IonButton>
            </IonButtons>
        )
    }

    return connectField(ListAdd, {initialValue: false, kind: "leaf"})
}


export const ListAddField = createListAddField(AutoField)
