import React, {MouseEvent as ReactMouseEvent, ReactNode, useCallback, useMemo, useState} from "react"
import {IonLabel, IonNote, IonPopover} from "@ionic/react"

type LabelProps = {
    label?: string | ReactNode
    error?: any
    errorMessage?: string
    showInlineError?: boolean,
    position?: any,
    readOnly?: boolean
    description?: string
    value?: unknown,
    field?: unknown & {default?: any}
}

export const Label: React.FC<LabelProps> = (
    {
        label,
        error,
        errorMessage,
        showInlineError,
        position,
        readOnly,
        description,
        value,
        field
    }) => {
    let [errorPopoverOpen, setErrorPopoverOpen] = useState(false)
    let [defaultPopoverOpen, setDefaultPopoverOpen] = useState(false)

    let [popoverEvent, setPopoverEvent] = useState<MouseEvent>()

    let notDefault = useMemo(() => {
        return field?.default && value != field?.default
    }, [field?.default, value])

    let onLabelClick = useCallback((e: ReactMouseEvent<HTMLIonLabelElement, MouseEvent>) => {
        if (error && showInlineError) {
            setPopoverEvent(e.nativeEvent)
            setErrorPopoverOpen(true)
        } else if (notDefault) {
            setPopoverEvent(e.nativeEvent)
            setDefaultPopoverOpen(true)
        }
    }, [error, showInlineError, notDefault, setPopoverEvent, setErrorPopoverOpen, setDefaultPopoverOpen])

    let style = useMemo(() => {
        let style: any = {}
        if (readOnly) {
            style["color"] = "initial"
            style["opacity"] = 1
        } else if (!!notDefault) {
            style["color"] = "var(--ion-color-primary)"
        }
        return style
    }, [readOnly, notDefault])

    if (label) {
        return <>
            <IonLabel
                onClick={onLabelClick}
                className={(showInlineError && error ? "item-has-error" : "") + (notDefault ? " item-not-default" : "")}
                position={position}
                style={style}
            >
                {label}
                {!!description && <><br/><IonNote>{description}</IonNote></>}
            </IonLabel>
            {showInlineError &&
                <IonPopover
                    isOpen={errorPopoverOpen}
                    event={popoverEvent}
                    onDidDismiss={() => setErrorPopoverOpen(false)}>
                    <div style={{padding: 12}}>
                        {errorMessage && errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}
                    </div>
                </IonPopover>
            }
            <IonPopover
                isOpen={defaultPopoverOpen}
                event={popoverEvent}
                onDidDismiss={() => setDefaultPopoverOpen(false)}>
                <div style={{padding: 12}}>
                    Default: {JSON.stringify(field?.default)}
                </div>
            </IonPopover>
        </>
    }
    return <></>
}