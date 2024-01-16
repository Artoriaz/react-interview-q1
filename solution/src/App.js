import { useState } from "react";
import LocationTable from "./components/LocationTable";
import LocationSelect from "./components/LocationSelect";
// design change potentially. For dirty or validation.
function App() {
  const [locationStore, setLocationStore] = useState([
    {
      location: "USA",
      name: "Nathan Tarongoy",
    },
  ]);
  return (
    <div>
      <LocationSelect locationStoreCallback={setLocationStore} />
      <LocationTable locationData={locationStore} />
    </div>
  );
}
export default App;
