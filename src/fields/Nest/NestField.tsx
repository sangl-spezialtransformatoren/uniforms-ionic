import {IonItemGroup, IonListHeader} from "@ionic/react"
import React from "react"
import {connectField, HTMLFieldProps} from "uniforms"
import {AutoField} from "../Auto/AutoField"


export type NestFieldProps = HTMLFieldProps<object,
    HTMLIonItemGroupElement,
    {itemProps?: object}>;

export function createNestField(AutoField: AutoField) {
    function Nest({
                      children,
                      fields,
                      itemProps,
                      label,
                      ...props
                  }: NestFieldProps) {
        return (
            <>
                {label && <IonListHeader>
                    {label}
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
