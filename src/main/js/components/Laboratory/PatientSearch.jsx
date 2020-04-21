import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import "./PatientSearch.css";
import { Input, Form } from "reactstrap";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";
import { fetchAllLabTestOrder } from "actions/laboratory";
import { connect } from "react-redux";
import { url } from "../../api";


function getTotalcount(formId) {
  async function getCharacters() {
    const response = await fetch(url + `encounters/${formId}/form-data`);
    const totalCount = await response.json();
    return console.log(totalCount.length) 
    
  }
  getCharacters();
  
}

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <Form className="cr-search-form" onSubmit={e => e.preventDefault()}>
    <Input
      type="search"
      placeholder="Search by Patient Name, Patient ID "
      className="cr-search-form__input pull-right"
      value={filterText}
      onChange={onFilter}
    />
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

const columns = [
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
        {row.firstName}
        {row.lastName}
      </span>
    )
  },
  {
    name: "Test Order Date",
    selector: "test order",
    sortable: false,
  cell: row => <span>{row.dateEncounter}{' '} {row.timeCreated}</span>
  },
  {
    name: "Total Test Order",
    selector: "test order",
    sortable: false,
    cell: row => <span>{getTotalcount(row.encounterId)}</span>
  },
  {
    name: "Sample Collected",
    selector: "test order",
    sortable: false,
    cell: row => <span>{0}</span>
  },
  {
    name: "Action",
    cell: row => (
      <div>
        <Link
          to={{
            pathname: "/collect-sample",
            state: { getpatientlists: { row } }
          }}
        >
          Collect Sample  { ' '}
        </Link>
        {/* <Link to={`/patient-lab-test/${row.encounterId}/${row.hospitalNumber}`}>
          Collect Sample
        </Link> */}
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    grow: 2
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

const LaboratoryTestOrder = props => {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  // const [data, setData] = useState([])

  const filteredItems = props.patientsTestOrderList.filter(
    item =>
      (item.firstName &&
        item.firstName.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.lastName &&
        item.lastName.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.hospitalNumber &&
        item.hospitalNumber.toLowerCase().includes(filterText.toLowerCase()))
  );

  useEffect(() => {
    props.fetchAllLabTestOrderToday();
  }, []); //componentDidMount

  const subHeaderComponentMemo = React.useMemo(() => {
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
    <div className="searchTable">
      <Card>
        <cardContent>
          <DataTable
            columns={columns}
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
        </cardContent>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {

  return {
    patientsTestOrderList: state.laboratory.list
  };
};

const mapActionToProps = {
  fetchAllLabTestOrderToday: fetchAllLabTestOrder
};

export default connect(mapStateToProps, mapActionToProps)(LaboratoryTestOrder);
