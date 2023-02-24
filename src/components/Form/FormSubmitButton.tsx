import { Button, ButtonProps } from '@innovaccer/design-system'
import React, { forwardRef } from 'react'
import useForm from './hooks/useForm'

const FormSubmitButton = forwardRef<HTMLButtonElement, ButtonProps & React.RefAttributes<HTMLButtonElement>>((props, ref) => {
    const form = useForm()
    return <Button children={"Submit"} disabled={!form.isValid} loading={form.isSubmitting} type="submit" ref={ref} {...props} />
})

export default FormSubmitButton