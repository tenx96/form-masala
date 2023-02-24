import { useMemo, useState } from "react";
import {
  ErrorMap,
  FieldValidator,
  FieldValidatorFactory,
  FormInstance,
  FormProps,
  FormValues,
  TouchedMap,
} from "../FormTypes";

const useFormManager = <Values extends FormValues>(
  formProps: FormProps<Values>
): FormInstance<Values> => {
  // PROPS
  const [validators, setValidators] = useState<FieldValidatorFactory<any>>({});

  // STATES
  const [errors, setErrors] = useState<ErrorMap>({});
  const [touched, setTouched] = useState<TouchedMap>({});
  const [values, setValues] = useState<Values>(formProps.initialValues);

  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  //   calc if form is valid
  const isValid = useMemo(() => {
    return Object.keys(errors || {}).length === 0;
  }, [JSON.stringify(errors)]);

  // reset the form to initial values
  const resetForm = () => {
    setValues(formProps.initialValues);
  };
  // set touched value to true|false for particular
  const setFieldTouched = (name: string, touched: boolean) => {
    setTouched((touchedRecord) => {
      return { ...touchedRecord, [name]: touched };
    });
  };

  // sets the value to the values state
  const setFieldValue = (name: string, value: any) => {
    validateField(name, value);
    setValues((values) => {
      return { ...values, [name]: value };
    });
  };
  // sets the value to the values state
  const setFieldError = (name: string, error: string) => {
    setErrors((errs) => {
      return { ...errs, [name]: error };
    });
  };

  // validate a field an update the error map
  const validateField = (name: string, value?: any) => {
    let val = value != undefined ? value : values[name];
    if (validators && validators[name]) {
      const error = validators[name](val);
      if (error) {
        // set error obj if isvalid
        setErrors((err) => ({ ...err, [name]: error }));
      } else {
        // remove error if valid
        setErrors((err) => {
          const errDraft = err;
          delete errDraft[name];
          return errDraft;
        });
      }
      return error;
    } else {
      return "";
    }
  };
  // validate all the values using the validator object
  const validateForm = () => {
    if (validators) {
      const draftErrors = errors;
      Object.keys(validators || {}).forEach((name) => {
        if (validators && validators[name]) {
          const error = validators[name](values[name]);
          if (error) {
            draftErrors[name] = error;
            setFieldTouched(name, true);
          } else {
            delete draftErrors[name];
          }
        }
      });

      setErrors(draftErrors);
      return draftErrors;
    } else {
      return {};
    }
  };

  // register the validator fact
  const registerValidator = (name: string, validator: FieldValidator) => {
    setValidators((vals) => ({ ...vals, [name]: validator }));
  };

  // remove validator fn from validator obj
  const unregisterValidator = (name: string) => {
    setValidators((vals) => {
      const draft = vals;
      delete draft[name];
      return draft;
    });
  };

  const formInstance = {
    resetForm,
    initialValues: formProps.initialValues,
    isValid,
    touched,
    values,
    errors,
    setErrors,
    setTouched,
    validateField,
    validateForm,
    setValues,
    setFieldTouched,
    setFieldValue,
    isSubmitting,
    isValidating,
    setIsSubmitting,
    setIsValidating,
    registerValidator,
    unregisterValidator,
    validators,
    setFieldError,
  };

  // submit form if valid
  const submitForm = () => {
    const valid = Object.keys(validateForm() || {}).length === 0;
    if (valid && !isSubmitting && !isValidating) {
      setIsSubmitting(true);
      if (formProps.onSubmit) {
        formProps.onSubmit(values, { ...formInstance, submitForm });
      }
    }
  };

  return { ...formInstance, submitForm };
};

export default useFormManager;
