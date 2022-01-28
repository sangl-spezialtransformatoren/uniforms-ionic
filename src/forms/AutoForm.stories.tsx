import React from "react"
import {Meta} from "@storybook/react/types-6-0"
import {AutoForm} from "./AutoForm"
import {JSONSchemaBridge} from "uniforms-bridge-json-schema"
import Ajv from "ajv"
import addFormats from "ajv-formats"
import {IonApp, IonCard, IonCardHeader, IonCardTitle, IonNote} from "@ionic/react"
import {AutoFields, SubmitField} from "../fields"

import "../style/uniforms-ionic.css"

export default {
    title: "Test",
    component: AutoForm
} as Meta

const schema = {
    title: "My awesome form",
    description: "With awesome descriptions",
    type: "object",
    properties: {
        address: {
            title: "Address",
            type: "object",
            description: "Test",
            collapsible: true,
            properties: {
                city: {type: "string", readOnly: true, default: "Test", description: "Where you live"},
                state: {type: "string", description: "Where you work"},
                street: {type: "string", description: "Where your gf lives"},
                zip: {type: "string", pattern: "[0-9]{5}"},
                x: {
                    type: "boolean",
                    default: true,
                    readOnly: true,
                    "title": "titel",
                    "description": "Beschreibung"
                }
            },
            required: ["street", "zip", "state", "x"]
        },
        interval: {
            "title": "Zeitraum",
            "type": "string",
            "readOnly": true,
            "format": "date-time-interval",
            "default": "2021-01-15T00:00:00/2021-02-03T00:00:00",
            "const": "2021-01-15T00:00:00/2021-02-03T00:00:00",
            description: "TEgbh"
        },
        "list": {
            "type": "array",
            title: "Liste",
            "description": "Text",
            items: {
                "title": "Titel",
                type: "string"
            }
        },
        text: {
            type: "string",
            default: "Test!!\nLala",
            readOnly: true,
            "description": "Beschreibung"
        },
        participants: {
            type: "array",
            readOnly: true,
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
ajv.addKeyword("collapsible")
ajv.addFormat(
    "date-time-interval",
    {
        type: "string",
        validate: () => true
    }
)

function createValidator(schema: object) {
    const validator = ajv.compile(schema)

    return (model: object) => {
        validator(model)
        return validator.errors?.length ? {details: validator.errors} : null
    }
}

const schemaValidator = createValidator(schema)
const bridge = new JSONSchemaBridge(schema, schemaValidator)

export const Test = () => {
    return <IonApp>
        <div className="main">
            <IonCard className={"formCard"}>
                <IonCardHeader>
                    <IonCardTitle>
                        {bridge.schema?.title}
                        {bridge.schema?.description && <><br/><IonNote>{bridge.schema?.description}</IonNote></>}
                    </IonCardTitle>
                </IonCardHeader>
                <AutoForm
                    schema={bridge}
                    showInlineError={true}
                    onChangeModel={(data: any) => console.log(data)}>
                    <AutoFields/>
                    <SubmitField/>
                </AutoForm>
            </IonCard>
        </div>
    </IonApp>
}

