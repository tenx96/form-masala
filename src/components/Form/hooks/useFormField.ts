import { FormFieldInstance, FormValues } from "../FormTypes";
import useForm from "./useForm";

const useFormField = <Values extends FormValues>(formFieldProps: {
  name: string;
}): FormFieldInstance => {
  const { name } = formFieldProps;
  const form = useForm();

  // set field value
  const setFieldValue = (value: any) => {
    form.setFieldValue(name, value);
  };
  const setFieldTouched = (touched: boolean) => {
    form.setFieldTouched(name, touched);
  };
  const setFieldError = (error: string) => {
    form.setFieldError(name, error);
  };

  return {
    name,
    error: form.errors[name],
    setFieldError,
    setFieldTouched,
    setFieldValue,
    onChange(e) {
      if (e && e.target) {
        const { value } = e.target;
        form.setFieldValue(name, value);
        form.validateField(name);
      }
    },
    onBlur(e) {
      form.setFieldTouched(name, true);
    },
    value: form.values[name],
  };
};

export default useFormField;
