import React, { useState, useEffect, useMemo} from "react";
import DataTable from "react-data-table-component";
import { Card, CardContent } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import { Edit } from "@material-ui/icons";
import "./PatientSearch.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Form
} from "reactstrap";
import { Link } from "react-router-dom";
import { fetchAll, Delete as Del } from "../../actions/patients";
import { connect } from "react-redux";
import { Dashboard } from "@material-ui/icons";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <Form className="cr-search-form" onSubmit={e => e.preventDefault()}>
    <Card>
      <CardContent>
        <Input
          type="search"
          placeholder="Search by Patient Name, Patient ID "
          className="cr-search-form__input pull-right"
          value={filterText}
          onChange={onFilter}
        />
      </CardContent>
    </Card>
  </Form>
);

const SampleExpandedComponent = ({ data }) => (
  <div>
    <span>
      <b> Date Of Registration:</b> {data.dateRegistration}{" "}
    </span>{" "}
    <br></br>{" "}
    <span>
      <b>Date Of Birth:</b> {data.dob}{" "}
    </span>
  </div>
);

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

const columns = modalClickHandler => [
  {
    name: "Patient ID",
    selector: "hospitalNumber",
    sortable: false,
    Display: true
  },
  {
    name: "Patient Name",
    selector: "name",
    sortable: false,
    cell: row => (
      <span>
        {row.firstName} {row.lastName}
      </span>
    )
  },
  {
    name: "Age",
    selector: "dob",
    sortable: false,
    cell: row => (
      <span>
        {row.dob === 0 ||
        row.dob === undefined ||
        row.dob === null ||
        row.dob === ""
          ? 0
          : calculate_age(row.dob)}
      </span>
    )
  },
  {
    name: "Action",
    cell: row => (
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
        </IconButton>
        <IconButton
          color="primary"
          aria-label="Archive Patient"
          title="Edit Patient"
        >
          <Link to="/patient-registration">
            <Edit title="Edit Patient" aria-label="Edit Patient" />
          </Link>
        </IconButton>
        <IconButton
          color="primary"
          onClick={modalClickHandler}
          aria-label="Archive Patient"
          title="Archive Patient"
        >
          <Delete />
        </IconButton>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true
  }
];

const customStyles = {
  headCells: {
    style: {
      color: "#202124",
      fontSize: "14px",
      fontWeight: "bold"
    }
  }
};

const PatientTable = props => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  console.log(props.patientsList);
  // const [data, setData] = useState([])
  const filteredItems =
    !filterText && props.patientsList
      ? []
      : props.patientsList.filter(
          item =>
            (item.firstName &&
              item.firstName
                .toLowerCase()
                .includes(filterText.toLowerCase())) ||
            (item.lastName &&
              item.lastName.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.hospitalNumber &&
              item.hospitalNumber
                .toLowerCase()
                .includes(filterText.toLowerCase()))
        );
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    props.fetchAllPatients();
    //setData(props.patientsList);
  }, []); //componentDidMount

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div>
      <card>
        <CardContent>
          <DataTable
            columns={columns(toggle)}
            data={filteredItems}
            customStyles={customStyles}
            pagination
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            highlightOnHover={true}
            striped={true}
            subHeaderAlign={"left"}
            // noHeader={false}
            fixedHeader={true}
            expandableRows
            persistTableHead
            expandableRowsComponent={<SampleExpandedComponent />}
          />
        </CardContent>
      </card>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Achieve Patient</ModalHeader>
        <ModalBody>Are you sure you want to delete this patient?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Continue
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  patientsList: state.patients.list
});

const mapActionToProps = {
  fetchAllPatients: fetchAll,
  deletePatient: Del
};

export default connect(mapStateToProps, mapActionToProps)(PatientTable);
