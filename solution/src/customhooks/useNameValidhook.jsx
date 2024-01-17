import { useState, useEffect, useCallback} from "react";
import { isNameValid } from "../mock-api/apis";

// Potentially went too deep with the hook here. Should just be validation of hook.
const useNameValidHook = (INITIAL_STATE) => {
  const [nameValid, setNameValid] = useState(true);
  const [form, setForm] = useState(INITIAL_STATE);
  
  useEffect(() => {
    nameChecker();
  }, [form.name]);

  const nameChecker = async () => {
    const nameValidData = await isNameValid(form.name);
    setNameValid(nameValidData);
  };
  const handleFormChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  }
  const handleClear = useCallback(() => {
      setForm(INITIAL_STATE);
  }, [INITIAL_STATE])
  return { form ,nameValid, handleFormChange, handleClear};
};

export default useNameValidHook;
