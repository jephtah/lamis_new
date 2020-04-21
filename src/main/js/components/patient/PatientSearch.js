
import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { fetchAll, Delete as Del } from "../../actions/patients";
import "./PatientSearch.css";
import { Dashboard } from "@material-ui/icons";
import IconButton from '@material-ui/core/IconButton';

const PatientSearch = (props) => {
      useEffect(() => {
        props.fetchAllPatients();
      }, []); //componentDidMount

      const calculate_age = dob => {
        var today = new Date();
        var dateParts = dob.split("-");
        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        var birthDate = new Date(dateObject); // create a date object directly from `dob1` argument
        console.log(dateObject);
        console.log(birthDate);
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age_now--;
        }
      
        if (age_now === 0) {
          return m + " month(s)";
        }
        console.log(age_now);
        return age_now + " year(s)";
      };

    
  return (
    <div>
      <MaterialTable
        title="Find Patients"
        columns={[
          {
            title: "Patient Name",
            field: "name",
          },
          { title: "Patient ID", field: "id" },
          { title: "Age", field: "age", filtering: false },
          {
            title: "Action",
            field: "actions",
            filtering: false,
          },
        ]}
      
        data={props.patientsList.map((row) => ({
          name: row.firstName +  ' ' + row.lastName,
          id: row.hospitalNumber,
          age: (row.dob === 0 ||
          row.dob === undefined ||
          row.dob === null ||
          row.dob === "" )
            ? 0
            : calculate_age(row.dob),
          actions: 
          <div>
          <IconButton
          color="primary"
          aria-label="View Patient"
          title="View Patient"
        >
          <Link
            to={{
              pathname: "/patient-dashboard",
              state: { hospitalNumber: row.hospitalNumber  }
            }}
          >
            <Dashboard title="Patient Dashboard" aria-label="View Patient" />
          </Link>
        </IconButton></div>
          
        }))}
        
        options={{
          headerStyle: {
            backgroundColor: "#1D4380",
            color: "#FFF",
          },
          filtering: true,
          exportButton: false,
          searchFieldAlignment: 'left',
          icon: 'refresh',
           tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
        }}
      />
    </div>
  );
}

const mapStateToProps = state => {

    return {
      patientsList: state.patients.list
    };
  };
  
  const mapActionToProps = {
    fetchAllPatients: fetchAll,
    deletePatient: Del
  };
  
export default connect(mapStateToProps, mapActionToProps)(PatientSearch);


