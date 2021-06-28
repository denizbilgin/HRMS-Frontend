import { useField } from 'formik'
import React from 'react'
import { FormField, Label } from 'semantic-ui-react';

export default function DevHrmsDropdownInput({...props}) {

    const [field,meta] = useField(props);

    return (
        <div>

            <FormField error={meta.touched && !!meta.error}>
                <select {...field} {...props} style={{color:"#808080"}}>
                    <option defaultValue value="">{props.placeholder}</option>
                    {props.options.map((option) => (
                        <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                </select>
                {meta.touched && !!meta.error ? (<Label pointing basic color="red" content={meta.error}></Label>):null}
            </FormField>
        </div>
    )
}
