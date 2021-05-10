import React, {HTMLProps, Ref} from "react"
import {Override, useForm} from "uniforms"
import {IonButton} from "@ionic/react"

export type SubmitFieldProps = Override<HTMLProps<HTMLInputElement>,
    {inputRef?: Ref<HTMLIonButtonElement>; value?: string}>;

export const SubmitField: React.FC<SubmitFieldProps> = (
    {
        disabled,
        inputRef,
        readOnly,
        value,
        label,
        ...props
    }) => {
    const {error, state} = useForm()

    return (<>
            <IonButton
                disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
                ref={inputRef}
                {...(value ? {value} : {})}
                type="submit"
                fill={"clear"}
                expand={"block"}
            >
                {label || "Submit"}
            </IonButton>
        </>
    )
}
