import FormComponent from "./Form";
import FormField from "./FormField";
import FormInput from "./inputs/Input.form";

type FormComponentType = typeof FormComponent;

type CompoundedFormComponent = FormComponentType & {
  Field: typeof FormField;
  Input: typeof FormInput;
};

let compoundedFormComponent: CompoundedFormComponent =
  FormComponent as CompoundedFormComponent;

compoundedFormComponent.Field = FormField;
compoundedFormComponent.Input = FormInput;
export * from "./FormTypes"
export default compoundedFormComponent;
