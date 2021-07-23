import {IonItemGroup, IonListHeader, IonNote} from "@ionic/react"
import React from "react"
import {AutoField} from "../Auto/AutoField"
import {IonicFieldProps} from "../../index"
import {connectField} from "uniforms"

type CustomProps = {itemProps?: object}
export type NestFieldProps = IonicFieldProps<object, HTMLIonItemGroupElement, CustomProps>

export function createNestField(AutoField: AutoField) {
    function Nest(
        {
            children,
            fields,
            itemProps,
            label,
            description
        }: NestFieldProps) {

        return (
            <>
                {label && <IonListHeader>
                    <b>{label}</b>
                    {!!description && <>&ensp;<IonNote style={{fontSize: "0.9em"}}>{description}</IonNote></>}
                </IonListHeader>
                }
                <IonItemGroup className={"nest-container"}>
                    <>
                        {children ||
                        fields.map(field => (
                            <AutoField key={field} name={field} {...itemProps} />
                        ))}
                    </>
                </IonItemGroup>
            </>
        )
    }

    return connectField(Nest)
}

export const NestField = createNestField(AutoField)
