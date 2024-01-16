import { useState, useEffect } from "react";
import { getLocations } from "../mock-api/apis";

//creating a custom hook in case this functionality is used app-wide.
const useLocationsHook = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const awaitLocations = async () => {
      const locationsData = await getLocations();
      setLocations(locationsData);
    };
    awaitLocations();
  }, [locations]);
  console.log(locations);
  return { locations };
};

export default useLocationsHook;