import React, {useEffect, useRef, useState} from "react"
import {IonButton, IonButtons, IonIcon} from "@ionic/react"
import {calendarOutline} from "ionicons/icons"
import {DayPickerHandle, DayPickerPopover} from "./DayPickerPopover"


type CommonProps = {
    displayIcons?: boolean
}

type DateInputProps = {
    id?: string
    onChange?: (value: Date | undefined) => void
    value?: Date
    disabled?: boolean
    name?: string
    max?: Date
    min?: Date
    placeholder?: string
    readOnly?: boolean,
    showUnsetButton?: boolean
}

export type DateInputHandle = {}
export const DateInput = React.forwardRef<DateInputHandle, CommonProps & DateInputProps>((
    {
        displayIcons,
        value,
        disabled,
        name,
        max,
        min,
        readOnly,
        placeholder, onChange,
        showUnsetButton
    }, ref) => {

        let [internalValue, setInternalValue] = useState<Date | undefined>(undefined)
        let dayPickerRef = useRef<DayPickerHandle>(null)

        useEffect(() => {
            value && setInternalValue(value)
        }, [value])

        return <>
            <IonButtons slot={"end"}>
                <IonButton
                    onClick={(e) => {
                        dayPickerRef.current?.open(e.nativeEvent)
                    }}
                    disabled={disabled}
                    className={"date-input-button"}
                >
                    {displayIcons && <IonIcon icon={calendarOutline} size={"small"} slot={"start"}/>}
                    {internalValue ? internalValue?.toLocaleDateString() : placeholder ? placeholder : "Choose Date"}
                </IonButton>
            </IonButtons>
            <DayPickerPopover
                ref={dayPickerRef}
                value={internalValue || undefined}
                onChange={(day) => {
                    onChange?.(day)
                    setInternalValue(day)
                }}
                min={min}
                max={max}
                readOnly={readOnly}/>
        </>
    }
)