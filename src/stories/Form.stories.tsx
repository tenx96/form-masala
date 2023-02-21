import React from "react";
import Form from "../components/Form";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
import { Button } from "@innovaccer/design-system";
import "@innovaccer/design-system/css";
import { ComponentMeta, ComponentStory } from "@storybook/react";
const CustomCode: React.FC = () => {
  return (
    <>
      <Form<{ email: string }>
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
    </>
  );
};

export default {
  title: "Example/Form Form",
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  parameters: {
    docs: {
      docsPage: {
        customCode: CustomCode,
        title: "Basic form",
        props: {
          components: { Form },
          exclude: ["showHead"],
        },
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof CustomCode> = (args) => (
  <CustomCode {...args} />
);

export const BasicForm = Template.bind({});
