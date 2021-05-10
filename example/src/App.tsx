import React from "react"
import {IonApp, IonCard, IonCardHeader, IonCardTitle, IonContent} from "@ionic/react"

import Ajv from "ajv"
import addFormats from "ajv-formats"
import {JSONSchemaBridge} from "uniforms-bridge-json-schema"
import {AutoFields, AutoForm, SubmitField} from "uniforms-ionic"
import "uniforms-ionic/uniforms-ionic.css"

const schema = {
    title: "My awesome form",
    type: "object",
    properties: {
        address: {
            title: "Address",
            type: "object",
            properties: {
                city: {type: "string"},
                state: {type: "string"},
                street: {type: "string"},
                zip: {type: "string", pattern: "[0-9]{5}"}
            },
            required: ["street", "zip", "state"]
        },
        participants: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    birthday: {
                        type: "string",
                        format: "date-time"
                    }
                }
            }
        }
    }
}

const ajv = new Ajv({allErrors: true, useDefaults: true})
addFormats(ajv)

function createValidator(schema: object) {
    const validator = ajv.compile(schema)

    return (model: object) => {
        validator(model)
        return validator.errors?.length ? {details: validator.errors} : null
    }
}

const schemaValidator = createValidator(schema)

export const bridge = new JSONSchemaBridge(schema, schemaValidator)

function App() {
    return <IonApp>
        <IonContent fullscreen>
            <div className="main">
                <IonCard className={"formCard"}>
                    <IonCardHeader>
                        <IonCardTitle>
                            {bridge.schema?.title}
                        </IonCardTitle>
                    </IonCardHeader>
                    <AutoForm schema={bridge} showInlineError={true}>
                        <AutoFields/>
                        <SubmitField/>
                    </AutoForm>
                </IonCard>
            </div>
        </IonContent>
    </IonApp>
}

export default App
