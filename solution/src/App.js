import { useState, useEffect} from "react";
import LocationTable from "./components/LocationTable";
import LocationSelect from "./components/LocationSelect";
import getLocationsHook from './customhooks/getLocationsHook';
// design change potentially. For dirty or validation.

const INITIAL_STATE = [{
    location: "USA",
    name: "Nathan Tarongoy",
  }]
function App() {
  // placed custom hook here for locations if LocationsTable would need to perform validation and to prevent multiple re-renders.
  const {locations} = getLocationsHook();
  const [locationStore, setLocationStore] = useState(INITIAL_STATE);
  return (
    <div>
      <LocationSelect locationStoreCallback={setLocationStore} locations={locations}/>
      <LocationTable locationData={locationStore} />
    </div>
  );
}
export default App;
