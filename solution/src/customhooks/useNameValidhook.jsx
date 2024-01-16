import { useState, useEffect } from "react";
import { isNameValid } from "../mock-api/apis";

//we can consolidate this even further to have one custom hook for the APIs.
const useNameValidHook = (name) => {
  const [nameValid, setNameValid] = useState(true);
  useEffect(() => {
    nameChecker();
  }, [name]);
  const nameChecker = async () => {
    const nameValidData = await isNameValid(name);
    setNameValid(nameValidData);
  };
  console.log('name', name)
  return { nameValid };
};

export default useNameValidHook;
