
import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { fetchAllLabTestOrder } from "actions/laboratory";
import "./laboratory.css";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const PatientSearch = (props) => {
      useEffect(() => {
        props.fetchAllLabTestOrderToday();
      }, []); //componentDidMount
function getTotalcount(formId) {
    return formId
}     
  return (
    <div>
      <MaterialTable
        title="Laboratory Test Orders"
        columns={[
          {
            title: "Patient Name",
            field: "name",
          },
          { title: "Patient ID", field: "Id" },
          { title: "Order Date", field: "date", type: "date" },
          {
            title: "Total  Orders",
            field: "count",
            filtering: false,
          },
          {
            title: "Sample Collected",
            field: "samplecount",
            filtering: false,
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
          samplecount: getTotalcount(row.formDataObj.length),
          actions: <Link to ={{ 
                                pathname: "/collect-sample",  
                                state: { getpatientlists:{row}}, 
                                patientName: row.firstName + ' ' + row.lastName}} 
                                style={{ cursor: "pointer", color: "blue", 
                                fontStyle: "bold" }}>
                                  <Tooltip title="Collect Sample">
                                    <IconButton aria-label="Collect Sample" >
                                      <VisibilityIcon color="primary"/>
                                  </IconButton>
                                  </Tooltip>
                                </Link>
          
        }))}
        
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#9F9FA5",
            color: "#000",
            margin: "auto"
          },
          filtering: true,
         
          searchFieldStyle: {
            width : '300%',
            margingLeft: '250px',
          },
      
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


