import React, {Children, cloneElement, isValidElement} from "react"
import {connectField, HTMLFieldProps} from "uniforms"

import {IonLabel, IonListHeader} from "@ionic/react"
import {ListItemField} from "./ListItemField"
import {ListAddField} from "./ListAddField"

export type ListFieldProps = HTMLFieldProps<unknown[],
    HTMLUListElement,
    {initialCount?: number; itemProps?: object}>;

function List({
                  children = <ListItemField name="$"/>,
                  initialCount,
                  itemProps,
                  label,
                  value,
                  ...props
              }: ListFieldProps) {
    return (
        <>
            <IonListHeader style={{paddingRight: 4}}>
                <IonLabel>
                    {label}
                </IonLabel>
                <ListAddField initialCount={initialCount} name="$"/>
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

export const ListField = connectField(List)
