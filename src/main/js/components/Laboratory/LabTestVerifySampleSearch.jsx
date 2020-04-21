
import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { fetchAllLabTestOrder } from "actions/laboratory";
import "./laboratory.css";
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const PatientSearch = (props) => {
      useEffect(() => {
        props.fetchAllLabTestOrderToday();
      }, []); //componentDidMount
 
  return (
    <div>
      <MaterialTable
        title="Sample Verifications "
        columns={[
          {
            title: "Patient Name",
            field: "name",
          },
          { title: "Patient ID", field: "Id" },
          { title: "Order Date", field: "date", type: "date" },
          {
            title: "Test  Sample",
            field: "count",
            filtering: false
          },
          {
            title: "Total Verified",
            field: "samplecverify",
            filtering: false
          },
          {
            title: "Action",
            field: "actions",
            filtering: false,
          },
        ]}
        data={props.patientsTestOrderList.map((row) => ({
          name: row.firstName +  ' ' + row.lastName,
          Id: row.patientId,
          date: row.dateEncounter,
          count: row.formDataObj.length,
          samplecverify: 0,
          actions: <Link to ={{ 
                                pathname: "/sample-verifiction",  
                                state: { getpatientlists:{row}}, 
                                patientName: row.firstName + ' ' + row.lastName}}  
                                style={{ cursor: "pointer", color: "blue", fontStyle: "bold" }}>
                                <Tooltip title="Sample Verification">
                                    <IconButton aria-label="Sample Verification" >
                                      <CenterFocusWeakIcon color="primary"/>
                                  </IconButton>
                                  </Tooltip>
                    </Link>
          
        }))}
        options={{
          headerStyle: {
            backgroundColor: "#9F9FA5",
            color: "#000",
          },
          searchFieldStyle: {
            width : '300%',
            margingLeft: '250px',
          },
          filtering: true,
          exportButton: true,
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
      patientsTestOrderList: state.laboratory.list
    };
  };
  
  const mapActionToProps = {
    fetchAllLabTestOrderToday: fetchAllLabTestOrder
  };
  
export default connect(mapStateToProps, mapActionToProps)(PatientSearch);


