import {IonButton, IonButtons, IonIcon, IonItemGroup, IonListHeader, IonNote} from "@ionic/react"
import React, {useState} from "react"
import {AutoField} from "../Auto/AutoField"
import {IonicFieldProps} from "../../index"
import {connectField} from "uniforms"
import {caretDown, caretUp} from "ionicons/icons"
import {Collapse} from "react-collapse"

type CustomProps = {itemProps?: object, collapsible?: boolean}
export type NestFieldProps = IonicFieldProps<object, HTMLIonItemGroupElement, CustomProps>

export function createNestField(AutoField: AutoField) {
    function Nest(props: NestFieldProps) {
        let {
            children,
            fields,
            itemProps,
            label,
            description,
            collapsible,
            error,
            showInlineError,
            field,
            value
        } = props
        let [open, setOpen] = useState(!collapsible)

        return (
            <>
                {label &&
                    <IonListHeader style={{color: (showInlineError && error) ? "var(--ion-color-danger)" : "initial"}}>
                        <b>{label}</b>
                        {!!description && <>&ensp;<IonNote style={{fontSize: "0.9em"}}>{description}</IonNote></>}
                        {collapsible &&
                            <IonButtons style={{position: "absolute", right: 0, height: 10}}>
                                <IonButton color={"medium"} onClick={() => setOpen(x => !x)}>
                                    <IonIcon icon={open ? caretUp : caretDown} style={{fontSize: "1em"}}/>
                                </IonButton>
                            </IonButtons>
                        }
                    </IonListHeader>
                }
                <Collapse isOpened={open} theme={{collapse: 'NestFieldCollapse'}}>
                    <IonItemGroup className={"nest-container"}>
                        <>
                            {children ||
                                fields.map(field => (
                                    <AutoField key={field} name={field} {...itemProps}/>
                                ))}
                        </>
                    </IonItemGroup>
                </Collapse>
            </>
        )
    }

    return connectField(Nest)
}

export const NestField = createNestField(AutoField)
