import React, {Ref, useCallback, useMemo, useState} from "react"
import {connectField} from "uniforms"
import {DateInputHandle} from "../../components/DateInput/DayInput"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"
import {IonButton, IonButtons, IonModal} from "@ionic/react"
import {Interval, Settings} from "luxon"
import DayPicker from "react-day-picker"
import {IonicFieldProps} from "../../index"

Settings.defaultLocale = "de"

type CustomProps = {inputRef?: Ref<DateInputHandle>; max?: Date; min?: Date}
export type DateIntervalFieldProps = IonicFieldProps<string, {}, CustomProps>

function DateInterval_(
    {
        disabled,
        id,
        inputRef,
        label,
        max,
        min,
        name,
        onChange,
        placeholder,
        readOnly,
        value: stringValue,
        error,
        errorMessage,
        showInlineError,
        description
    }: DateIntervalFieldProps) {

    let value = useMemo(() => {
        if (stringValue) {
            return Interval.fromISO(stringValue)
        }
    }, [stringValue])

    let [selectedStartDate, setSelectedStartDate] = useState<number | undefined>(undefined)
    let [modalOpen, setModalOpen] = useState(false)

    let handleClick = useCallback((day) => {
        if (selectedStartDate) {
            let selectedDay = day
            let selectedStartDay = new Date(selectedStartDate)
            let interval

            if (selectedDay > selectedStartDay) {
                interval = Interval.fromDateTimes(selectedStartDay, selectedDay)
            } else {
                interval = Interval.fromDateTimes(selectedDay, selectedStartDay)
            }
            setSelectedStartDate(undefined)
            onChange(interval.toISO())
            setModalOpen(false)
        } else {
            setSelectedStartDate(day)
        }
    }, [selectedStartDate, setSelectedStartDate, onChange])

    let onDidDismiss = useCallback(() => {
        setSelectedStartDate(undefined)
        setModalOpen(false)
    }, [setSelectedStartDate, setModalOpen])
    return <>
        <Container
            error={error}
            errorMessage={errorMessage}
            showInlineError={showInlineError}>
            <Label
                error={error}
                errorMessage={errorMessage}
                showInlineError={showInlineError}
                description={description}>
                {label}
            </Label>
            <IonButtons slot={"end"}>
                <IonButton
                    onClick={() => setModalOpen(true)}
                    disabled={disabled || readOnly}
                    className={"date-input-button"}
                    style={{opacity: readOnly && !disabled && 1}}
                >
                    {value ? value.toFormat("EEE d.L.", {separator: " – "}) : placeholder ? placeholder : "Select interval"}
                </IonButton>
            </IonButtons>
        </Container>
        <IonModal isOpen={modalOpen} onDidDismiss={onDidDismiss} cssClass={"day-interval-modal"}>
            <DayPicker
                className="Selectable"
                showWeekNumbers
                firstDayOfWeek={1}
                modifiers={
                    (!selectedStartDate && value) ? {
                        start: value.start.toJSDate(),
                        end: value.end.toJSDate()
                    } : undefined}
                selectedDays={
                    selectedStartDate ? new Date(selectedStartDate) :
                        value ? {
                            from: value.start.toJSDate(),
                            to: value.end.toJSDate()
                        } : undefined}
                month={value ? value.start.toJSDate() : undefined}
                onDayClick={handleClick}
                fromMonth={min}
                toMonth={max}
            />
        </IonModal>
    </>
}

export const DateIntervalField = connectField(DateInterval_, {kind: "leaf"})
