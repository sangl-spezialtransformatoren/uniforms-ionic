import React, {MouseEvent as ReactMouseEvent, useCallback, useMemo, useState} from "react"
import {IonLabel, IonPopover} from "@ionic/react"

type LabelProps = {
    error?: any
    errorMessage?: string
    showInlineError?: boolean,
    position?: any,
    readOnly?: boolean
}

export const Label: React.FC<LabelProps> = ({children, error, errorMessage, showInlineError, position, readOnly}) => {
    let [errorPopoverOpen, setErrorPopoverOpen] = useState(false)
    let [errorPopoverEvent, setErrorPopoverEvent] = useState<MouseEvent>()

    let onLabelClick = useCallback((e: ReactMouseEvent<HTMLIonLabelElement, MouseEvent>) => {
        if (error && showInlineError) {
            setErrorPopoverEvent(e.nativeEvent)
            setErrorPopoverOpen(true)
        }
    }, [error, showInlineError])

    let style = useMemo(() => {
        let style: any = {}
        if (readOnly) {
            style["color"] = "initial"
        }
        return style
    }, [readOnly])

    if (children) {
        return <>
            <IonLabel
                onClick={onLabelClick}
                className={showInlineError && error ? "item-has-error" : ""}
                position={position}
                style={style}
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