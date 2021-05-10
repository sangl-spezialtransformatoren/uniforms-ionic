import React, {Ref, useMemo} from "react"
import {connectField, filterDOMProps, HTMLFieldProps} from "uniforms"
import {DateInput, DateInputHandle} from "../../components/DateInput/DayInput"
import {Label} from "../../components/Label/Label"
import {Container} from "../../components/Container/Container"


export type DateFieldProps = HTMLFieldProps<string,
    typeof Container,
    {inputRef?: Ref<DateInputHandle>; max?: Date; min?: Date}>;

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
            <Label error={error} errorMessage={errorMessage} showInlineError={showInlineError}> {label}</Label>
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
