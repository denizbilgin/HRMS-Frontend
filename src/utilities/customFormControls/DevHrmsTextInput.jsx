import { useField } from 'formik'
import React from 'react'
import { FormField, Label } from 'semantic-ui-react';

export default function DevHrmsTextInput({...props}) {

    const [field,meta] = useField(props);

    return (
        <div>
            <FormField error={meta.touched && !!meta.error}>
                <input {...field} {...props} style={{color:"#808080"}}/>
                {meta.touched && !!meta.error ? (
                <Label pointing basic color="red" content={meta.error}></Label>
                ):null}
            </FormField>
        </div>
    )
}
