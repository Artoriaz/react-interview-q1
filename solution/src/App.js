import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { getLocations, isNameValid } from "./mock-api/apis";

const INITIAL_STATE = {
  location: "",
  name: "",
};
// const VALIDATION = {
//   location: [
//     {
//       isValid: (value) => !!value,
//       message: 'Is required.',
//     },
//     {
//       isValid: (value) => /\S+@\S+\.\S+/.test(value),
//       message: 'Needs to be an email.',
//     },
//   ],
//   name: [
//     {
//       isValid: (value) => !!value,
//       message: 'Is required.',
//     },
//   ],
// };
const getDirtyFields = (form) =>
  Object.keys(form).reduce((form, key) => {
    const isDirty = form[key] !== INITIAL_STATE[key];

    return { ...form, [key]: isDirty };
  }, {});
function App() {
  const [nameValid, setNameValid] = useState(true);
  const [locations, setLocations] = useState([]);

  const [form, setForm] = useState(INITIAL_STATE);
  const handleFormChange = async (event) => {
    await setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
    console.log(form);
  };

  // utilize these APIs as a custom hook later.
  const checkName = useCallback(
    async (event) => {
      handleFormChange(event);
      const nameTaken = await isNameValid(event.target.value);
      setNameValid(nameTaken);
    },
    [setNameValid]
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
  const hasChanges = Object.values(dirtyFields).every((isDirty) => !isDirty);
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
        {!nameValid && <p>This name has already been taken</p>}
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
