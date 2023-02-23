import { Button, Text } from "@innovaccer/design-system";
import React, { useRef } from "react";
import Form, { FormInstance } from "./components/Form";
const App = () => {
  const ref = useRef<FormInstance<any>>(null);

  return (
    <div
      style={{
        width: "50rem",
        margin: "auto",
        border: "1px solid gray",
        padding: "4px"
      }}
    >
      <Form<{ email: string, color: string }>
        ref={ref}
        initialValues={{ email: "", color: "blue" }}
        onSubmit={async (values, form) => {
          console.log("SUBMIT VALUES ",values)
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
              validator={(val) =>
                !val ? "is required" : val.length < 5 ? "min 5 " : ""
              }
              name="password"
              label="Password"
              type="password"
            />
            <Form.Input
              offset={12}
              span={8}
              name="field1"
              label="Field1"
            />
            <Form.Dropdown
              label="Colors"
              name="color"
              validator={(val) => val !== "red" ? "You must selected 'RED'" : ""}
              options={[
                { label: "Red", value: "red", optionType: "WITH_META", subInfo: "#da1709" },
                { label: "Blue", value: "blue" },
              ]}
            />

            <div className="form-field">
              {/* Button inside Form context can set type as 'submit' to initiate submit */}
              <Button
                disabled={!form.isValid}
                loading={form.isSubmitting}
                appearance="primary"
                type="submit"
              >
                Submit
              </Button>

              <div>
                {`values : ${JSON.stringify(form.values)}`} <br />
                {`isValid : ${form.isValid}`} <br />
                {`isSubmitting : ${form.isSubmitting}`} <br />
              </div>
            </div>
          </>
        )}
      </Form>

      <Button
        className="mt-6"
        onClick={() => {
          if (ref && ref.current) {
            ref.current.submitForm();
          }
        }}
      >
        External Submit
      </Button>
      <Text>This button is outside of Form provider and can use ref to perform form actions</Text>
    </div>
  );
};

export default App;
