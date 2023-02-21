import { Button } from "@innovaccer/design-system";
import React, { useRef, useState } from "react";
import Form, { FormInstance } from "./components/Form";
const App = () => {
  const [show, setshow] = useState(true);
  const ref = useRef<FormInstance<any>>(null);

  return (
    <>
      <Form<{ email: string }>
        ref={ref}
        initialValues={{ email: "" }}
        onSubmit={async (values, form) => {
          console.log("VALUES ", values);
          await new Promise((r) => setTimeout(r, 2000));
          form.setIsSubmitting(false);
        }}
      >
        {(form) => (
          <>
            <Form.Input span={12} name="email" label="Email" type="text" />
            <Form.Input
              offset={12}
              span={12}
              validator={(val) => (val && val.length > 5 ? "max 5 " : "")}
              name="password"
              label="Password"
              type="password"
            />

            <div className="form-field">
              <Button
                disabled={!form.isValid}
                loading={form.isSubmitting}
                appearance="primary"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </Form>

      <Button
        onClick={() => {
          if (ref && ref.current) {
            ref.current.submitForm();
          }
        }}
        disabled={!ref.current?.isValid}
        loading={ref.current?.isSubmitting}
      >
        Outside Button
      </Button>
    </>
  );
};

export default App;
