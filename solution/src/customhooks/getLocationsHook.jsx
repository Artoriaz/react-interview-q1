import { useState, useEffect } from "react";
import { getLocations } from "../mock-api/apis";

//creating a custom hook in case this functionality is used app-wide.
const useLocationsHook = () => {
  const [locations, setLocations] = useState([]);
  const awaitLocations = async () => {
    const locationsData = await getLocations();
    setLocations(locationsData);
  };
  //set it for on start up only, but can be changed depending on use case.
  useEffect(() => {
    awaitLocations();
  }, []);
  return { locations };
};

export default useLocationsHook;
