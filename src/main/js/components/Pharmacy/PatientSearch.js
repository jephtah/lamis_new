import React from 'react';
import MaterialTable from 'material-table';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom'
import "./patientPrescriptions.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const PatientSearch = (props) => {
  const prescriptions = useSelector(state => state.pharmacy.allPrescriptions)
 
  return (
    <div>
      <MaterialTable
        title="Patients Prescriptions Table"
        columns={[
          {
            title: "Patient Name",
            field: "name",
          },
          { title: "Patient ID", field: "Id" },
          { title: "Prescription Date", field: "date", type: "date" },
          {
            title: "Total Prescribed",
            field: "count",
            filtering: false,
          },
          {
            title: "Total Dispensed",
            field: "count",
            filtering: false,
          },
          {
            title: "Action",
            field: "actions",
            filtering: false,
          },
        ]}
        data={prescriptions.map((prescription) => ({
          name: prescription.firstName,
          Id: prescription.patientId,
          date: prescription.dateEncounter,
          count: prescription.formDataObj.length,
          actions: (
            <Link
              to={{
                pathname: "/patientPrescriptions",
                forms: prescription.formDataObj,
                patientName:
                  prescription.firstName + " " + prescription.lastName,
                encounterId: prescription.encounterId,
              }}
              style={{ cursor: "pointer", color: "blue", fontStyle: "bold" }}
            >
              <Tooltip title="Collect Sample">
                <IconButton aria-label="Collect Sample">
                  <VisibilityIcon color="primary" />
                </IconButton>
              </Tooltip>
            </Link>
          ),
        }))}
        options={{
          headerStyle: {
            backgroundColor: "#9f9fa5",
            color: "#000000",
          },
          filtering: true,
          searchFieldStyle: {
            width: "300%",
            margingLeft: "500px",
          },
          searchFieldAlignment: "left"
        }}
      />
    </div>
  );
}

export default PatientSearch;


