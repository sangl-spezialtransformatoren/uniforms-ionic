import React, {Children, cloneElement, isValidElement} from "react"
import {connectField} from "uniforms"

import {IonListHeader, IonNote} from "@ionic/react"
import {createListItemField, ListItemField} from "./ListItemField"
import {createListAddField} from "./ListAddField"
import {AutoField} from "../Auto/AutoField"
import {Label} from "../../components/Label/Label"
import {IonicFieldProps} from "../../index"

type CustomProps = {initialCount?: number; itemProps?: object, children?: React.DOMAttributes<any>["children"]}
export type ListFieldProps = IonicFieldProps<unknown[], {}, CustomProps>;

export function createListField(AutoField: AutoField) {
    let ListAddField = createListAddField(AutoField)
    let ListItemField = createListItemField(AutoField)


    function List({
                      children = <ListItemField name="$"/>,
                      initialCount,
                      itemProps,
                      label,
                      value,
                      error,
                      errorMessage,
                      showInlineError,
                      readOnly,
                      description
                  }: ListFieldProps) {
        return (
            <>
                <IonListHeader style={{paddingRight: 4}}>
                    <Label error={error} errorMessage={errorMessage} showInlineError={showInlineError}>
                        <b>{label}</b>{!!description && <>
                        &ensp;<IonNote style={{fontSize: "0.9em"}}>{description}</IonNote>
                    </>
                    }
                    </Label>
                    <ListAddField initialCount={initialCount} readOnly={readOnly} name="$"/>
                </IonListHeader>
                <div style={{paddingLeft: 22}}>
                    {value?.map((item, itemIndex) =>
                        Children.map(children, (child, childIndex) => {
                                if (isValidElement(child)) {
                                    return cloneElement(child, {
                                        key: `${itemIndex}-${childIndex}`,
                                        name: child.props.name?.replace("$", "" + itemIndex), ...itemProps
                                    })
                                } else {
                                    return child
                                }
                            }
                        )
                    )}
                </div>
            </>
        )
    }

    return connectField(List)
}


export const ListField = createListField(AutoField)
