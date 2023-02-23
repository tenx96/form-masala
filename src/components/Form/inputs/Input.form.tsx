import { Input, InputProps } from "@innovaccer/design-system";
import FormField from "../FormField";
import { FormFieldProps } from "../FormTypes";
import useFormField from "../hooks/useFormField";
import omitFields from "../utils/omitFields";
import React from 'react'
const FormInput = (
  props: Omit<InputProps, "onChange" | "onBlur"> & FormFieldProps<any>
) => {
  const { name, children } = props;
  const field = useFormField({ name });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.setFieldValue(e.target.value);
  };
  const onBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    field.setFieldTouched(true);
  };
 
  const inputProps = omitFields(props,
    "onChange",
    "onBlur",
    "validator",
    "label",
    "required",
    "offset",
    "span"
  );

  return (
    <FormField {...props}>
      <Input value={field.value} {...inputProps} onChange={onChange} onBlur={onBlur}>
        {children}
      </Input>
    </FormField>
  );
};

export default FormInput;
