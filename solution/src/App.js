import './App.css';
import {useCallback, useEffect, useState} from 'react';
import {getLocations, isNameValid} from './mock-api/apis';

function App() {
  const [nameValid, setNameValid] = useState(true);
  const [locations, setLocations] = useState([]);  
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const checkName = useCallback(async event => {
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
      console.log('Form submitted with:', { name, location });
    }
  };
  const handleClear = () => {
    setName('');
    setLocation('');
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
      <button type="submit" disabled={!nameValid || !name || !location}>
        Add
      </button>
    </form>
  );

}
export default App;