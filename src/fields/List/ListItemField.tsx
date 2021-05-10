import React, {ReactNode} from "react"
import {connectField} from "uniforms"
import {ListDelField} from "./ListDelField"
import {AutoField} from "../Auto/AutoField"


export type ListItemFieldProps = {children?: ReactNode; value?: unknown};

function ListItem({children = <AutoField label={null} name=""/>}: ListItemFieldProps) {
    return (
        <div className={"list-item-container"}>
            <ListDelField name=""/>
            {children}
        </div>
    )
}

export const ListItemField = connectField(ListItem, {initialValue: false})
