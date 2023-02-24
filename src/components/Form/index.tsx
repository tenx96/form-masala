import FormComponent from "./Form";
import FormField from "./FormField";
import FormDropdown from "./inputs/Dropdown.form";
import FormInput from "./inputs/Input.form";
import FormSubmitButton from "./FormSubmitButton";

type FormComponentType = typeof FormComponent;

type CompoundedFormComponent = FormComponentType & {
  Field: typeof FormField;
  Input: typeof FormInput;
  Dropdown : typeof FormDropdown
  SubmitButton : typeof FormSubmitButton
};

let compoundedFormComponent: CompoundedFormComponent =
  FormComponent as CompoundedFormComponent;

compoundedFormComponent.Field = FormField;
compoundedFormComponent.Input = FormInput;
compoundedFormComponent.Dropdown = FormDropdown;
compoundedFormComponent.SubmitButton = FormSubmitButton;
export * from "./FormTypes"
export default compoundedFormComponent;
