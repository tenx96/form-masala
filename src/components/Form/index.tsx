import FormComponent from "./Form";
import FormField from "./FormField";
import FormDropdown from "./inputs/Dropdown.form";
import FormInput from "./inputs/Input.form";

type FormComponentType = typeof FormComponent;

type CompoundedFormComponent = FormComponentType & {
  Field: typeof FormField;
  Input: typeof FormInput;
  Dropdown : typeof FormDropdown
};

let compoundedFormComponent: CompoundedFormComponent =
  FormComponent as CompoundedFormComponent;

compoundedFormComponent.Field = FormField;
compoundedFormComponent.Input = FormInput;
compoundedFormComponent.Dropdown = FormDropdown;
export * from "./FormTypes"
export default compoundedFormComponent;
