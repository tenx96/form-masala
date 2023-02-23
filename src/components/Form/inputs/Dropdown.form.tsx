import { Dropdown, DropdownProps } from '@innovaccer/design-system'
import React from 'react'
import { FormFieldProps } from '../'
import FormField from '../FormField'
import useForm from '../hooks/useForm'
import useFormField from '../hooks/useFormField'
import omitFields from '../utils/omitFields'

const FormDropdown = (props: FormFieldProps<any> & Partial<Omit<DropdownProps , "onChange" >>) => {
    const { name } = props;
    const field = useFormField({ name: props.name })
    const form = useForm()
    const dropdownProps = omitFields(props,
        "onChange",
        "onBlur",
        "validator",
        "label",
        "required",
        "offset",
        "span"
    );
    return (
        <FormField  {...props}>
            <Dropdown  {...dropdownProps} options={(props.options || []).map(item => ({ ...item, selected: form.values[name] === item.value }))} onChange={(selected) => {
                field.setFieldValue(selected)
                field.setFieldTouched(true)
            }} />

        </FormField>
    )
}

export default FormDropdown