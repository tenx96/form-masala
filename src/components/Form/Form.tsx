import { Row } from "@innovaccer/design-system";
import React, { ReactElement, RefObject, useImperativeHandle } from "react";
import { FormInstance, FormProps, FormValues } from "./FormTypes";
import useFormManager from "./hooks/useFormManager";
import "./style.css";
import renderChildrenFunction from "./utils/renderChildrenFunction";
export const FormContext = React.createContext<FormInstance<any>>({} as any);
const Form = React.forwardRef(function Form<Values extends FormValues>(
  props: FormProps<Values>,
  ref?: React.ForwardedRef<FormInstance<Values>>
) {
  const { children } = props;

  const form = useFormManager(props);

  // return instance through ref
  useImperativeHandle(ref, () => form);



  return (
    <FormContext.Provider value={form}>
      <form
        autoComplete="on"
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          form.submitForm();
        }}
        onReset={() => {
          form.resetForm();
        }}
      >
        <Row css>
          {renderChildrenFunction<FormInstance<Values>>(children, form)}
        </Row>
      </form>
    </FormContext.Provider>
  );
});

type FormWithRef = <Values extends FormValues>(
  p: FormProps<Values> & { ref?: RefObject<FormInstance<Values>> }
) => ReactElement;

export default Form as FormWithRef;
