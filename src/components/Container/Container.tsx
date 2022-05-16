import React, {useMemo} from "react"
import {IonItem} from "@ionic/react"

type ContainerProps = {
    error?: any
    errorMessage?: string,
    showInlineError?: boolean,
    readOnly?: boolean
}
export const Container: React.FC<ContainerProps> = ({children, error, showInlineError, readOnly}) => {

    let style = useMemo(() => {
        let style: any = {}
        if (readOnly) {
            style["--highlight-height"] = "0px"
            style["--highlight-background"] = "var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))))"
        }
        return style
    }, [readOnly])

    return (
        <IonItem
            lines={"full"}
            style={style}
            className={showInlineError && error ? "item-has-error" : ""}>
            {children}
        </IonItem>
    )
}