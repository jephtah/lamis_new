import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {
  Row,
  Col,
    FormGroup,
    Input,
    Label,
    Alert,
    Card,
    CardBody,
    CardHeader,
    CardDeck
  } from 'reactstrap';

  import Spinner from 'react-bootstrap/Spinner';
  import moment from 'moment';
  import Select from 'react-select';
  import * as encounterActions from "actions/encounter";
  import * as actions from "actions/laboratory";
  
  import {connect} from 'react-redux';
  import { v1 as uuidv1 } from 'uuid';
  import * as CODES from "api/codes";
  import PreviousTestOrder from './TestOrderHistory'

  
function TestOrderPage(props) {   
   const PatientID = props.patientId;
   const visitId = props.visitId;
    const [testGroups, setTestGroup] = React.useState([]);
    const [tests, setTests] = React.useState([]);
    const [testOrders, setTestOrders] = React.useState([]);
    const [showLoading, setShowLoading] = useState(false);  
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    React.useEffect(() => {
      if(props.testGroupList.length === 0){
        setErrorMessage();
        const onSuccess = () => {
        }
        const onError = errstatus => {
         setErrorMessage("Could not fetch test groups at the moment, try again later")
        }
       props.fetchTestGroup(onSuccess, onError)
       
}
   }, []);
   
   React.useEffect(() => {
    setTestGroup(props.testGroupList.map(({ name, id }) => ({ label: name, value: id })));
}, [props.testGroupList]);

React.useEffect(() => {
  setTests(props.tests);
}, [props.tests]);

  const getTestByTestGroup = (e) => {
    const testGroupId = e.target.value;

    async function fetchTests() {
        setErrorMessage("")
        const onSuccess = () => {
          setTests(props.tests);
        }
        const onError = errstatus => {
         setErrorMessage("Could not fetch test list, please try again later")
         setTests([])
        }
        props.fetchTestByTestGroup(testGroupId, onSuccess, onError)
      }
      fetchTests();
}
function getTestGroupNameById(id) {
  return testGroups.find(x => x.value === id).label;
}
 

const saveTestOrder = (e) => { 
 
  e.preventDefault(); 
  if (!testOrders || testOrders.length < 1) {
      setErrorMessage("You must pick a test before you can submit");
      return;
  }

 // default value that have to go with the form data
 const defaults = { patient_id : props.patientId,
  test_result:"",
  date_result_reported:"",
  date_sample_collected: "",
  comment:"",
  user_id:"",
  sample_type:"",
  lab_test_order_id:uuidv1(),
  lab_test_order_status:0}


  //looping through the test order to create the formData structure expected by the server
 var orders = testOrders.map((x) => {
  return { ...{lab_test_id: x.id,
    description: x.name,
    lab_test_group:  getTestGroupNameById(x.labTestGroupId),
    lab_test_group_id: x.labTestGroupId,
    unit_measurement: x.unitMeasurement}, ...defaults
  }
 });

  const data = {
    data:  orders,
    patientId: PatientID, 
    visitId: visitId,
    formCode: CODES.LAB_TEST_ORDER_FORM,
    programCode: CODES.GENERAL_SERVICE,
    dateEncounter: moment(new Date()).format('DD-MM-YYYY')      
  }; 
  setShowLoading(true);
  setSuccessMessage('');
  const onSuccess = () => {
    setShowLoading(false);
    setTestOrders([]);
    setTests([]);
    setSuccessMessage("Test Order Successfully Saved!");
  }
  const onError = () => {
    setErrorMessage("An error occurred, could not save request!");
    setShowLoading(false)
  }
  props.createLabOrder(data, onSuccess, onError);
  };

  const handleChange = (newValue) => {
    setTestOrders(newValue ? newValue : []);  
  };

return (

  <CardDeck>
            <Card  >
              <CardHeader> Test Order</CardHeader>
                    <CardBody>
                        {successMessage ? 
                        <Alert color="success">
                    {successMessage}
            </Alert> : ""
            }
             {errorMessage ? 
                        <Alert color="danger">
                    {errorMessage}
            </Alert> : ""
            }
                        <br/>
                        <form  onSubmit={saveTestOrder} >
                        <Row>
                        <Col md={12}>
                       
                            <FormGroup>
                                    <Label for="testGroup">Select Test Order</Label>
                                    <Input type="select" name="testGroup" onChange={getTestByTestGroup}>
                                        <option value="">Select Test Group</option>
                                        {testGroups.map(({ label, value }) => (
                                                <option key={value} value={value}>
                                                {label}
                                                </option>
                                                ))}
                                    </Input>
                                </FormGroup> 
                               
</Col>
<Col md={12}>
                            <FormGroup>
                                    <Label for="testGroup">Select Test</Label>
                                    <Select
        isMulti={true}
        value={testOrders}
        onChange={handleChange}
        options={tests.map(x => ({...x, label:x.name, value:x.id}))}
      />
                                    </FormGroup>
                                    </Col>

                                    <Col md={4}>
<Button class="btn btn-primary " type="button" onClick={saveTestOrder} >Save
&nbsp;
                                        { showLoading ? <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner> : ""}
</Button>
                                      </Col>
                        </Row>
                        </form>    
                    </CardBody>                      
                </Card>
                <Card   >
                                 <CardHeader>Previous Test Order</CardHeader>
                                 <PreviousTestOrder  patientId={props.patient.patientId}   />  
                                 </Card>
                                 </CardDeck>
       
)
}

const mapStateToProps = (state) => {
  return {
    patient: state.patients.patient,
    testGroupList: state.laboratory.testGroup,
    tests: state.laboratory.tests
  }
}

const mapActionToProps = {
  fetchTestGroup: actions.fetchAllTestGroup,
  fetchTestByTestGroup: actions.fetchAllTestsByTestGroup,
  createLabOrder: encounterActions.create
}

export default connect(mapStateToProps, mapActionToProps)(TestOrderPage)
