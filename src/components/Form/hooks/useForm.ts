import { useContext } from "react";
import { FormContext } from "../Form";
const useForm = () => {
  const context = useContext(FormContext);
  return context;
};

export default useForm;
