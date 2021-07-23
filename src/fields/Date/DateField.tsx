import React, {Ref, useMemo} from "react"
import {connectField, filterDOMProps} from "uniforms"
import {DateInput, DateInputHandle} from "../../components/DateInput/DayInput"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"
import {IonicFieldProps} from "../../index"

// TODO: simpler!
type CustomProps = {inputRef?: Ref<DateInputHandle>; max?: Date; min?: Date}
export type DateFieldProps = IonicFieldProps<string, {}, CustomProps>

function Date_({
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
                   value,
                   error,
                   errorMessage,
                   showInlineError,
                   description,
                   ...props
               }: DateFieldProps) {

    let parsedValue = useMemo(() => {
        if (value) {
            return new Date(Date.parse(value))
        }
    }, [value])

    return (
        <Container
            error={error}
            errorMessage={errorMessage}
            showInlineError={showInlineError}
            {...filterDOMProps(props)}>
            <Label error={error}
                   errorMessage={errorMessage}
                   showInlineError={showInlineError}
                   description={description}>
                {label}
            </Label>
            <DateInput
                id={id}
                name={name}
                disabled={disabled}
                value={parsedValue}
                ref={inputRef}
                max={max}
                min={min}
                placeholder={placeholder}
                readOnly={readOnly}
                onChange={(day) => onChange(day ? day.toISOString() : undefined)}/>
        </Container>
    )
}

export const DateField = connectField(Date_, {kind: "leaf"})
