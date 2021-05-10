import React, {MouseEvent as ReactMouseEvent, useCallback, useState} from "react"
import {IonLabel, IonPopover} from "@ionic/react"

type LabelProps = {
    error?: any
    errorMessage?: string
    showInlineError?: boolean,
    position?: any
}

export const Label: React.FC<LabelProps> = ({children, error, errorMessage, showInlineError, position}) => {
    let [errorPopoverOpen, setErrorPopoverOpen] = useState(false)
    let [errorPopoverEvent, setErrorPopoverEvent] = useState<MouseEvent>()

    let onLabelClick = useCallback((e: ReactMouseEvent<HTMLIonLabelElement, MouseEvent>) => {
        if (error && showInlineError) {
            setErrorPopoverEvent(e.nativeEvent)
            setErrorPopoverOpen(true)
        }
    }, [error, showInlineError])


    if (children) {
        return <>
            <IonLabel
                onClick={onLabelClick}
                className={showInlineError && error ? "item-has-error" : ""}
                position={position}
            >
                {children}
            </IonLabel>
            {showInlineError &&
            <IonPopover
                isOpen={errorPopoverOpen}
                event={errorPopoverEvent}
                onDidDismiss={() => setErrorPopoverOpen(false)}>
                <div style={{padding: 12}}>
                    {errorMessage && errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}
                </div>
            </IonPopover>
            }
        </>
    }
    return <></>
}