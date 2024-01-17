import "./CSS/LocationSelect.css";
import getErrorFields from "./helperFunctions/errorFields";
import getDirtyFields from "./helperFunctions/dirtyFields";
import useNameValidHook from '../customhooks/useNameValidhook';
//could move INITIAL STATE and VALIDATION to their own folders for each individual component.
//Kept them here for demonstrative purposes
const INITIAL_STATE = {
  location: "",
  name: "",
};
//further could do validation on a hook level. Reason to why i didnt as I had not thought of it at the time,
const VALIDATION = {
  location: [
    {
      isValid: (value) => !!value,
      message: "Is required.",
    },
  ],
  name: [
    {
      isValid: (value) => /^\s*\S.*$/.test(value),
      message: "Value needs to a name",
    },
  ],
};

const LocationSelect = ({ locationStoreCallback, locations}) => {
  const {form ,nameValid, handleFormChange, handleClear} = useNameValidHook(INITIAL_STATE)
  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return;
    if (nameValid) {
      locationStoreCallback((prevState) => [...prevState, form]);
    }
    handleClear();
  };

  const dirtyFields = getDirtyFields(form, INITIAL_STATE);
  const hasChanges = Object.values(dirtyFields).includes(false);
  //could simplify later. Thinking of combing dirtyFields and validation into a master validator. 
  //idea came in after , way past the designing and planning.
  const errorFields = getErrorFields(form, dirtyFields, VALIDATION);

  return (
    <div  className="container">
    <form className="form" onSubmit={handleSubmit}>
      <div className="labelAligner">
      <label htmlFor="name">Name</label>
       <div>
       <input
          id="name"
          value={form.name}
          onChange={(e) => handleFormChange(e)}
          type="text"
          placeholder="Enter name"
        />
       <div> 
         {!nameValid && (
          <span className="errorHandling" >Name is already taken.</span>
        )}
        {errorFields.name?.length ? (
          <span className="errorHandling">{errorFields.name[0].message}</span>
        ) : <span/>}
        </div>
       </div>
      </div>
        { /* next steps would be to conslidate the nameValid and errorFields logic into one master errorHandler whilst preserving 
        // the functionality of the helperFunction. Possible refactor into a hoc */}
      
      <div className="labelAligner">
        <label htmlFor="location">Location</label>
        <select
          id="location"
          className="locationSelector"
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
        {/* use case is null here due but kept for demonstration purposes */}
        {/* {errorFields.location?.length ? (
          <span style={{ color: "red" }}>
            {errorFields.location[0].message}
          </span>
        ) : null} */}
      </div>
      <div style={{float: 'right'}}>
      <button type="button" onClick={handleClear}>
        Clear
      </button>
      <button
        type="submit"
        disabled={
          hasChanges ||
          !Object.values(errorFields).every((field) => !field.length) ||
          !nameValid
        }  >
        Add
      </button>
      </div>
    </form>
    </div>
  )
};

export default LocationSelect;
