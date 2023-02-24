import { Caption, Column, Label } from "@innovaccer/design-system";
import { useEffect } from 'react';
import { FormFieldProps, FormValues } from "./FormTypes";
import useForm from "./hooks/useForm";
import useFormField from "./hooks/useFormField";
function FormField<Values extends FormValues>(
  formFieldProps: FormFieldProps<Values>
) {
  const { children, name, validator, label, required, columnProps, offsetProps } =
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
      {offsetProps && <Column {...offsetProps} />}
      <Column className="pb-4 pr-4" size={12}  {...columnProps}>
        {label && <Label >{label}</Label>}
        {renderChildren()}{" "}
        {field.error && (
          <Caption className="mt-4" error>
            {field.error}
          </Caption>
        )}
      </Column>
    </>
  );
}

export default FormField;
