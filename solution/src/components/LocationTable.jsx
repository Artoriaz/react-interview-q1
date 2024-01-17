import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './CSS/LocationTable.css';

//using material ui, was initially going to use it overall but used it to jot something down, but ended up keeping 
// it.
const LocationTable = ({ locationData }) => {
  return (
    <div class="formattedTable" component={Paper}>
      <table class="custom-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Location</th>
    </tr>
  </thead>
  <tbody>
     {locationData.map((row) => (
            <tr
              key={row.name}
            >
              <td >
                {row.name}
              </td>
              <td>{row.location}</td>
            </tr>
          ))}
  </tbody>
</table>
    </div>
  );
};

export default LocationTable;
