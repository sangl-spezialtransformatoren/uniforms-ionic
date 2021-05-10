import React from "react"
import {IonItem} from "@ionic/react"

type ContainerProps = {
    error?: any
    errorMessage?: string,
    showInlineError?: boolean
}
export const Container: React.FC<ContainerProps> = ({children, error, showInlineError}) => {
    return (
        <IonItem
            lines={"full"}
            className={showInlineError && error ? "item-has-error" : ""}>
            {children}
        </IonItem>
    )
}