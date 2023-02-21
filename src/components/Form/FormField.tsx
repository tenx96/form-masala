import { Label, Text } from "@innovaccer/design-system";
import { useEffect } from "react";
import { FormFieldProps, FormValues } from "./FormTypes";
import useForm from "./hooks/useForm";
import useFormField from "./hooks/useFormField";
import React from 'react'
function FormField<Values extends FormValues>(
  formFieldProps: FormFieldProps<Values>
) {
  const { children, name, validator, label, required, offset, span } =
    formFieldProps;
  const form = useForm();
  const field = useFormField({ name });

  useEffect(() => {
    // register validation handler
    if (validator) {
      form.registerValidator(name, validator);
    }

    return () => {
      form.unregisterValidator(name);
    };
  }, []);

  const renderChildren = () => {
    if (typeof children === "function") {
      return children({ form, field });
    } else {
      return children;
    }
  };

  return (
    <>
      {offset && <div className={`form-field--span-${offset}`} />}
      <div
        className={`form-field form-field--vertical ${
          span ? `form-field--span-${span}` : ""
        }`}
      >
        {label && <Label required>{label}</Label>}
        {renderChildren()}{" "}
        {field.error && (
          <Text appearance="destructive" size="small">
            {field.error}
          </Text>
        )}
      </div>
    </>
  );
}

export default FormField;
