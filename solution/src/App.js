import "./App.css";
import LocationTable from "./components/LocationTable";
import LocationSelect from "./components/LocationSelect";
// design change potentially. For dirty or validation.
function App() {
  return (
    <div>
      <LocationSelect />
      <LocationTable />
    </div>
  );
}
export default App;
