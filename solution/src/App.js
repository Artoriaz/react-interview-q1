import "./App.css";
import { useCallback, useEffect, useState, useRef } from "react";
import { getLocations, isNameValid } from "./mock-api/apis";
// design change potentially. For dirty or validation.
const INITIAL_STATE = {
  location: "",
  name: "",
};
const VALIDATION = {
  location: [
    {
      isValid: (value) => !!value,
      message: "Is required.",
    },
  ],
  name: [
    {
      //change this regex to something.
      isValid: (value) => /\S+@\S+\.\S+/.test(value),
      message: "Improper Value",
    },
  ],
};
const getErrorFields = (form, dirtyFields) =>
  Object.keys(form).reduce((acc, key) => {
    if (!VALIDATION[key] || dirtyFields[key] === false) return acc;

    const errorsPerField = VALIDATION[key]
      // get a list of potential errors for each field
      // by running through all the checks
      .map((validation) => ({
        isValid: validation.isValid(form[key]),
        message: validation.message,
      }))
      // only keep the errors
      .filter((errorPerField) => !errorPerField.isValid);

    return { ...acc, [key]: errorsPerField };
  }, {});
const getDirtyFields = (form) =>
  Object.keys(form).reduce((acc, key) => {
    // check all form fields that have changed
    const isDirty = form[key] !== INITIAL_STATE[key];

    return { ...acc, [key]: isDirty };
  }, {});
function App() {
  //create a store of names so we can check against that?  () => after we re-structure the componentss
  const [nameValid, setNameValid] = useState(true);
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState(INITIAL_STATE);
  // make abstraction later.
  const handleFormChange = useCallback(
    (event) => {
      setForm({
        ...form,
        [event.target.id]: event.target.value,
      });
    },
    [form]
  );

  //utilize these APIs as a custom hook later.
  //should change this later since useCallback wouldnt be effective since handleFormChange would be the same every time?
  const checkName = useCallback(
    async (event) => {
      handleFormChange(event);
      const nameTaken = await isNameValid(event.target.value);
      setNameValid(nameTaken);
    },
    [setNameValid, handleFormChange]
  );

  const getLocationsCallback = useCallback(async () => {
    const locations = await getLocations();
    setLocations(locations);
  }, setLocations);

  useEffect(() => {
    getLocationsCallback();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return;
    if (nameValid) {
      // Do something with the valid form data
      // context provider right here.
      console.log("Form Data:", form);
    }
    handleClear();
  };
  const handleClear = () => {
    setForm(INITIAL_STATE);
    setNameValid(true);
  };

  const dirtyFields = getDirtyFields(form);
  console.log(dirtyFields, "dirtyFields");
  const hasChanges = Object.values(dirtyFields).includes(false);
  const errorFields = getErrorFields(form, dirtyFields);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={form.name}
          onChange={(e) => checkName(e)}
          type="text"
          placeholder="Enter name"
        />
        {!nameValid && (
          <span style={{ color: "red" }}>Name is already taken.</span>
        )}
        {errorFields.name?.length ? (
          <span style={{ color: "red" }}>{errorFields.name[0].message}</span>
        ) : null}
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <select
          id="location"
          value={form.location}
          onChange={(e) => handleFormChange(e)}
        >
          <option value="">Select location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        {errorFields.location?.length ? (
          <span style={{ color: "red" }}>
            {errorFields.location[0].message}
          </span>
        ) : null}
      </div>
      <button type="button" onClick={handleClear}>
        Clear
      </button>
      <button type="submit" disabled={hasChanges}>
        Add
      </button>
    </form>
  );
}
export default App;
