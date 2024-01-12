import './App.css';
import {useCallback, useEffect, useState} from 'react';
import {getLocations, isNameValid} from './mock-api/apis';

function App() {
  const [nameValid, setNameValid] = useState(true);
  const [locations, setLocations] = useState([]);  
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');

  // utilize these APIs as a custom hook later.
  const checkName = useCallback(async event => {
    setName(event.target.value)
    const nameTaken = await isNameValid(event.target.value);
    setNameValid(nameTaken);
    
  }, [setNameValid]);
  
  const getLocationsCallback = useCallback(async () => {
    const locations = await getLocations();
    setLocations(locations);
  }, setLocations);

  useEffect(() => {
    getLocationsCallback();
  }, [])
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameValid) {
      // Do something with the valid form data
      console.log('Form submitted with:', {name, nameValid , location });
    }
  };
  const handleClear = () => {
    setLocation('');
    setName('')
    setNameValid(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={checkName}
          type="text"
          placeholder="Enter name"
        />
        {!nameValid && <p>This name has already been taken</p>}
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <select id="location" value={location} onChange={handleLocationChange}>
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
      <button type="submit" disabled={!nameValid | !name | !location}>
        Add
      </button>
    </form>
  );

}
export default App;

//import * as React from 'react';

// const LoginForm = () => {
//   const [form, setForm] = React.useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (event) => {
//     setForm({
//       ...form,
//       [event.target.id]: event.target.value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     alert(form.email + ' ' + form.password);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           type="text"
//           value={form.email}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password</label>
//         <input
//           id="password"
//           type="password"
//           value={form.password}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };
// const INITIAL_STATE = {
//   email: '',
//   password: '',
// };

// const LoginForm = ({ onLogin }) => {
//   const [form, setForm] = React.useState(INITIAL_STATE);