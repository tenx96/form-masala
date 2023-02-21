import { RefObject } from "react";

export type FormValues = Record<string, any>;

export interface FormInstance<Values extends FormValues> {
  submitForm: () => void;
  resetForm: () => void;
  validateForm: () => ErrorMap;
  validateField: (name: string) => string;
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values>>;
  setErrors: React.Dispatch<React.SetStateAction<ErrorMap<Values>>>;
  setFieldValue: (name: string, value: any) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  touched: TouchedMap<Values>;
  errors: ErrorMap<Values>;
  initialValues: Values;
  isValid: boolean;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  isValidating: boolean;
  setIsValidating: React.Dispatch<React.SetStateAction<boolean>>;
  registerValidator: (name: string, validator: FieldValidator) => void;
  unregisterValidator: (name: string) => void;
  validators?: FieldValidatorFactory<FormValues>;
  setFieldError: (name: string, error: string) => void;
}

export type ErrorMap<Values extends FormValues = any> = Record<
  keyof Partial<Values> | string,
  string
>;
export type TouchedMap<Values extends FormValues = any> = Record<
  keyof Partial<Values> | string,
  boolean
>;
export interface FormProps<Values extends FormValues> {
  initialValues: Values;
  onSubmit?: (values: Values , instance : FormInstance<Values>) => void;
  validators?: FieldValidatorFactory<Values>;
  children?:
    | ((form: FormInstance<Values>) => React.ReactNode)
    | React.ReactNode;
}

export interface FormFieldInstance {
  onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (value: any) => void;
  setFieldTouched: (touched: boolean) => void;
  setFieldError: (error: string) => void;
  error?: string;
  name: string;
  value?: any;
  checked?: boolean;
}

export interface FormFieldProps<Values extends FormValues> {
  name: string;
  label?: string;
  required?: boolean;
  offset?: number,
  span?: number,
  validator?: FieldValidator;
  children?:
    | ((props: {
        field: FormFieldInstance;
        form: FormInstance<Values>;
      }) => React.ReactNode)
    | React.ReactNode;
}

export type FieldValidator = (value: string) => string;

export type FieldValidatorFactory<Values extends FormValues = any> = {
  [key in keyof Partial<Values>]: FieldValidator;
};
