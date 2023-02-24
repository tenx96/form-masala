import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubdued,
  Column,
  Heading,
  InlineMessage,
  Row
} from "@innovaccer/design-system";
import { Fragment, useRef } from "react";
import Form, { FormInstance } from "./components/Form";
const App = () => {
  const ref = useRef<FormInstance<any>>(null);

  return (
    <Row css className="justify-content-center pt-8 bg-secondary-lightest">
      <Column sizeXS="12" sizeS="8" sizeM="6" sizeL="6" sizeXL="4">
        <div className=" vh-100 p-6">
          <Card>
            <CardHeader>
              <Heading>Signup</Heading>
            </CardHeader>
            <CardBody>
              <Form<{ email: string; color: string }>
                ref={ref}
                initialValues={{ email: "", color: "blue" }}
                onSubmit={async (values, form) => {
                  console.log("SUBMIT VALUES ", values);
                  await new Promise((r) => setTimeout(r, 2000));
                  form.setIsSubmitting(false);
                }}
              >
                {(form) => (
                  <Fragment>
                    <Form.Input
                      name="email"
                      label="Email"
                      type="text"
                    />
                    <Form.Input
                      validator={(val) =>
                        !val ? "is required" : val.length < 5 ? "min 5 " : ""
                      }
                      name="password"
                      label="Password"
                      type="password"
                    />

                    <Form.Input
                      columnProps={{
                        size: "6",
                        sizeM: "12",
                      }}
                      name="field1"
                      label="Field1"
                    />
                    <Form.Input
                      columnProps={{
                        size: "6",
                        sizeM: "12",
                      }}
                      name="field2"
                      label="Field2"
                    />
                    <Form.Dropdown
                      columnProps={{
                        size: 6
                      }}
                      label="Colors"
                      name="color"
                      validator={(val) =>
                        val !== "red" ? "You must selected 'RED'" : ""
                      }
                      options={[
                        {
                          label: "Red",
                          value: "red",
                          optionType: "WITH_META",
                          subInfo: "#da1709",
                        },
                        { label: "Blue", value: "blue" },
                      ]}
                    />

                    <Column className="pb-6" size="12">
                      {/* Button inside Form context can set type as 'submit' to initiate submit */}
                      <Button
                        disabled={!form.isValid}
                        loading={form.isSubmitting}
                        appearance="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Column>

                    <Column size="12">
                      <CardSubdued>
                        <pre>
                          <code>
                            {`values : ${JSON.stringify(form.values, null, 2)}`}{" "}
                            <br />
                            {`isValid : ${form.isValid}`} <br />
                            {`isSubmitting : ${form.isSubmitting}`} <br />
                          </code>
                        </pre>
                      </CardSubdued>
                    </Column>
                  </Fragment>
                )}
              </Form>

              <Row css>
                <Column className="pb-6">
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
                  <InlineMessage
                    className="pt-6"
                    appearance="info"
                    description="This button is outside of Form provider and can use ref to
                    perform form actions"
                  />
                </Column>
              </Row>
            </CardBody>
          </Card>
        </div>
      </Column>
    </Row>
  );
};

export default App;
