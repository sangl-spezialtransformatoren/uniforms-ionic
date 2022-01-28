import React, {useEffect, useImperativeHandle, useMemo, useState} from "react"
import {IonButton, IonModal} from "@ionic/react"
import DayPicker from "react-day-picker"

type DayPickerPopoverProps = {
    value?: Date
    onChange?: (day: Date | undefined) => void
    max?: Date,
    min?: Date
    readOnly?: boolean,
    showUnsetButton?: boolean
}

export type DayPickerHandle = {
    open: (e: Event) => void
}

export const DayPickerPopover = React.forwardRef<DayPickerHandle, DayPickerPopoverProps>(
    ({
         onChange,
         value,
         min,
         max,
         readOnly,
         showUnsetButton
     },
     ref) => {

        let [dayPickerOpen, setDayPickerOpen] = useState(false)
        let [internalValue, setInternalValue] = useState<Date | undefined>(undefined)

        useEffect(() => {
            value && setInternalValue(value)
        }, [value])

        useImperativeHandle(ref, () => {
            return {
                open: (e: Event) => {
                    setDayPickerOpen(true)
                }
            }
        }, [])

        let disabledDays = useMemo(() => {
            if (min && max) {
                return {
                    before: min,
                    after: max
                }
            }
        }, [min, max])

        return <>
            <IonModal
                isOpen={dayPickerOpen}
                onDidDismiss={() => setDayPickerOpen(false)}
                className={"day-input-modal"}>
                <DayPicker
                    showWeekNumbers
                    selectedDays={[internalValue]}
                    disabledDays={disabledDays}
                    month={internalValue}
                    fromMonth={min}
                    toMonth={max}
                    onDayClick={readOnly ? undefined : day => {
                        setTimeout(() => {
                            setInternalValue(day)
                            onChange?.(day)
                            setDayPickerOpen(false)
                        }, 50)
                    }}
                />
                {internalValue !== undefined &&
                <IonButton fill={"clear"} onClick={() => {
                    setInternalValue(undefined)
                    onChange?.(undefined)
                    setDayPickerOpen(false)
                }}>Unset</IonButton>
                }
            </IonModal>
        </>
    }
)