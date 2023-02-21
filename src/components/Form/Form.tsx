import React, { ReactElement, RefObject, useImperativeHandle } from "react";
import { FormInstance, FormProps, FormValues } from "./FormTypes";
import useFormManager from "./hooks/useFormManager";
import "./style.css";
export const FormContext = React.createContext<FormInstance<any>>({} as any);
const Form = React.forwardRef(function Form<Values extends FormValues>(
  props: FormProps<Values>,
  ref?: React.ForwardedRef<FormInstance<Values>>
) {
  const { children } = props;

  const form = useFormManager(props);

  // return instance through ref
  useImperativeHandle(ref, () => form);

  const renderChildren = () => {
    if (typeof children === "function") {
      return children(form);
    } else {
      return children;
    }
  };

  return (
    <FormContext.Provider value={form}>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          form.submitForm();
        }}
        onReset={() => {
          form.resetForm();
        }}
      >
        {renderChildren()}
      </form>
    </FormContext.Provider>
  );
});

type FormWithRef = <Values extends FormValues>(
  p: FormProps<Values> & { ref?: RefObject<FormInstance<Values>> }
) => ReactElement;

export default Form as FormWithRef;
