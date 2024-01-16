import { useCallback, useEffect, useState } from "react";
import { getLocations, isNameValid } from "../mock-api/apis";
import "../App.css";
import getErrorFields from "./helperFunctions/errorFields";
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
      isValid: (value) => /^\s*\S.*$/.test(value),
      message: "Value needs to a name",
    },
  ],
};
const getDirtyFields = (form) =>
  Object.keys(form).reduce((acc, key) => {
    // check all form fields that have changed
    const isDirty = form[key] !== INITIAL_STATE[key];

    return { ...acc, [key]: isDirty };
  }, {});
const LocationSelect = ({ locationStoreCallback }) => {
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
      locationStoreCallback((prevState) => [...prevState, form]);
    }
    handleClear();
  };
  const handleClear = () => {
    setForm(INITIAL_STATE);
    setNameValid(true);
  };

  const dirtyFields = getDirtyFields(form);
  const hasChanges = Object.values(dirtyFields).includes(false);
  //could simplify later.
  const errorFields = getErrorFields(form, dirtyFields, VALIDATION);
  console.log(
    Object.values(errorFields).every((field) => field.length === 0),
    "error fields parsed"
  );
  console.log(errorFields, "error fields");
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
      <button
        type="submit"
        disabled={
          hasChanges ||
          !Object.values(errorFields).every((field) => !field.length) ||
          !nameValid
        }
      >
        Add
      </button>
    </form>
  );
};

export default LocationSelect;
