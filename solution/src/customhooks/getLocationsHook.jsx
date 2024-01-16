import { useState, useEffect } from "react";
import { getLocations } from "../mock-api/apis";

//creating a custom hook in case this functionality is used app-wide.
// small bug is that every use is calling it 4x.
// something that needs to be workeked on
const useLocationsHook = () => {
  const [locations, setLocations] = useState([]);
  const awaitLocations = async () => {
    const locationsData = await getLocations();
    setLocations(locationsData);
  };
  useEffect(() => {
    awaitLocations();
  }, []);
  console.log(locations);
  return { locations };
};

export default useLocationsHook;
