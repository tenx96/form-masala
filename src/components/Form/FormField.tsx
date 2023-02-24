import { Caption, Column, Label } from "@innovaccer/design-system";
import { useEffect } from 'react';
import { FormFieldInstance, FormFieldProps, FormInstance, FormValues } from "./FormTypes";
import useForm from "./hooks/useForm";
import useFormField from "./hooks/useFormField";
import renderChildrenFunction from "./utils/renderChildrenFunction";
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



  return (
    <>
      {offsetProps && <Column {...offsetProps} />}
      <Column className="pb-4 pr-4" size={12}  {...columnProps}>
        {label && <Label required={required}>{label}</Label>}
        {renderChildrenFunction<{
          field: FormFieldInstance,
          form: FormInstance<Values>;
        }>(children, { field, form })}
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
