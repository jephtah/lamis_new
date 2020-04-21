import axios from 'axios';
import Page from "components/Page";
import React, { useState, useEffect } from "react";
import MatButton from "@material-ui/core/Button";
import "./PatientRegistrationPage.css";
import { Col, Form, FormGroup, Input, Label, Row, Alert, FormFeedback } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { Card, CardContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
// import { IoMdFingerPrint } from "react-icons/io";
// import { FaFileImport } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { connect } from "react-redux";
//Date Picker
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from "react-widgets";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
// React Notification
import Title from "components/Title/CardTitle";
import { url } from "../../api";
import { create } from "../../actions/patients";
import { initialfieldState_patientRegistration } from "./InitialFieldState";
import useForm from "../Functions/UseForm";
import {fetchCountries} from "../../actions/patients";

//Dtate Picker package
Moment.locale("en");
momentLocalizer();

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  cardBottom: {
    marginBottom: 20
  },
  Select: {
    height: 45,
    width: 300
  },
  button: {
    margin: theme.spacing(1)
  },
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.default
  },
  inline: {
    display: "inline"
  }
}));

const PatientRegistration = props => {
  // const [currentId, setCurrentId] = useState(0) ;
  const classes = useStyles();
  const apicountries = url + "countries";
  const apistate = url + "countries/";

  
  const { values, setValues, handleInputChange } = useForm(
    initialfieldState_patientRegistration
  );
  /**
   * Initializing state properties
   */
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [gender, setGender] = useState([]);
  const [occupation, setOccupation] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [maritalStatus, setMaterialStatus] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [relatives, setRelatives] = useState([]);
  const [relative, setRelative] = useState([{}]);
  const relationshipTypes = [
    { id: "1", name: "Father" },
    { id: "2", name: "Mother" },
    { id: "3", name: "Sister" },
    { id: "4", name: "Brother" }
  ];
  const [saving, setSaving] = useState(false);
  const [display, setDisplay] = useState(false);

    //Get countries
  useEffect(() => {
    props.fetchCountries();
      async function getCharacters() {
        try {
          const response = await fetch(apicountries);
          const body = await response.json();
          setCountries(body.map(({ name, id }) => ({ label: name, value: id })));
          const defaultCountryId = body.find(x => x.name === "Nigeria").id;
          setValues({ ...values, countryId: defaultCountryId });
          setStateByCountryId(defaultCountryId);
        } catch (error) {
          console.log(error);
        }
      }
      getCharacters();
    }, []);

/*# Get list of gender parameter from the endpoint #*/
useEffect(() => {
  async function getCharacters() {
    try {
      const response = await fetch('http://lamisplus.org/base-module/api/application-codesets/codesetGroup?codesetGroup=GENDER');
      const body = await response.json();
      setGender(body.map(({ display, id }) => ({ label: display, value: id })));
    } catch (error) {
      console.log(error);
    }
  }
  getCharacters();
}, []);
/* ##### End of gender parameter from the endpoint ##########*/

/*# Get list of OCUUPATION parameter from the endpoint #*/
useEffect(() => {
  async function getCharacters() {
    try {
      const response = await fetch('http://lamisplus.org/base-module/api/application-codesets/codesetGroup?codesetGroup=OCCUPATION');
      const body = await response.json();
      setOccupation(body.map(({ display, id }) => ({ label: display, value: id })));
    } catch (error) {
      console.log(error);
    }
  }
  getCharacters();
}, []);

/*# Get list of EDUCATION parameter from the endpoint #*/
useEffect(() => {
  async function getCharacters() {
    try {
      const response = await fetch('http://lamisplus.org/base-module/api/application-codesets/codesetGroup?codesetGroup=EDUCATION');
      const body = await response.json();
      setQualification(body.map(({ display, id }) => ({ label: display, value: id })));
    } catch (error) {
      console.log(error);
    }
  }
  getCharacters();
}, []);
/* ##### End of gender parameter from the endpoint ##########*/

/*# Get list of MARITAL STATUS parameter from the endpoint #*/
useEffect(() => {
  async function getCharacters() {
    try {
      const response = await fetch('http://lamisplus.org/base-module/api/application-codesets/codesetGroup?codesetGroup=MARITAL_STATUS');
      const body = await response.json();
      setMaterialStatus(body.map(({ display, id }) => ({ label: display, value: id })));
    } catch (error) {
      console.log(error);
    }
  }
  getCharacters();
}, []);
/* ##### End of gender parameter from the endpoint ##########*/

  const findAge = date => {
    var dob = new Date(date);
    var today = new Date();
    var dateParts = dob.split("-");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    var birthDate = new Date(dateObject);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }

    if (age_now === 0) {
      return m + " month(s)";
    }
    return m;
  };

  // const handleDateChange = e => {
  //   const age = findAge(e.target.value);
  //   setValues({ ...values, dob: e.target.values });
  //   console.log(age);
  // };

  /**
   * Estimates the dob of an individual given
   */
  const estimatedob = age => {
    const newage = (values["age"] = age);
    var d = new Date();
    var year = d.getFullYear();
    // var month = d.getMonth();
    // var day = d.getDate();
    var c = new Date(year - newage, 6, 15);

    return c;
  };

  /**
   * Handles UI behaviour on Age Input change
   */
  const onAgeInputChange = e => {
    setDisplay(true);
    setValues({ ...values, dobEstimated: 1 });

    if (e.target.value === "" || e.target.value === null) {
      setDisplay(false);
    }
    handleEstimation();
  };

  /**
   * Handles UI behaviour on check of Estimation box
   */
  const handleEstimation = () => {
    if (display) {
      const actualAge = document.getElementById("age").value;
      const dateOfBirth = moment(estimatedob(actualAge)).format("MM/DD/YYYY");
      document.getElementById("dob").value = dateOfBirth;
    }
  };




  useEffect(() => {
     getCharacters();
   }, []); 

     async function getCharacters() {
       try {
         const countries = await axios.get(apicountries);
         setCountries(countries.data.map(({ name, id }) => ({ label: name, value: id })));
         const defaultCountryId = countries.data.find(x => x.name === "Nigeria").id;
         setValues({ ...values, countryId: defaultCountryId });
         setStateByCountryId(defaultCountryId);
       } catch (error) {
         console.log(error);
       }
     }

  
  //Get States from selected country
  const getStates = e => {
    const getCountryId =
     e.target.value;
    setStateByCountryId(getCountryId); 
    setValues({ ...values, countryId: getCountryId });
  };

  function setStateByCountryId(getCountryId) {
    async function getCharacters() {
      const response = await fetch(apistate + getCountryId+"/states");
      console.log(response)
      const stateList = await response.json();
      console.log(stateList)
      setStates(stateList.map(({ name, id }) => ({ label: name, value: id })));
    }
    getCharacters();
  }

  //fetch province
  const getProvinces = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    const stateId = e.target.value;
    async function getCharacters() {
      const response = await fetch(`${url}state/` + stateId+"/provinces");
      const provinceList = await response.json();

      setProvinces(provinceList);
    }
    getCharacters();
  };

  function getRelationshipName(id) {
    return id ? relationshipTypes.find(x => x.id === id).name : "";
  }

  const addRelative = value => {
    const allRelatives = [...relatives, value];
    setRelatives(allRelatives);
  };

  const removeRelative = index => {
    const allRelatives = [...relatives];
    allRelatives.splice(index, 1);
    setRelatives(allRelatives);
  };

  const handleAddRelative = e => {
    e.preventDefault();
    if (!relative) return;
    addRelative(relative);
    setRelative({
      email: "",
      firstName: "",
      lastName: "",
      otherNames: "",
      relationshipTypeId: "",
      mobilePhoneNumber: "",
      address: ""
    });
  };

  const onRelativeChange = e => {
    //  e.preventDefault();
    setRelative({ ...relative, [e.target.name]: e.target.value });
  };


  //The Submit Button Implemenatation
  const handleSubmit = e => {
    e.preventDefault();
   
    const newDatenow = moment(values.regDate).format("DD-MM-YYYY");
    const dateOfBirth = moment(values.dateOfBirth).format("DD-MM-YYYY");
    //setValues({ dateRegistration: newDatenow});
    values["dateRegistration"] = newDatenow;
    values["personRelativesDTO"] = relatives;
    values["dob"] = dateOfBirth;
    //console.log(values);
    //setSaving(true);
    props.create(values);
    //toast.success("Registration Successful")
  
  };

  return (
    <Page title="Patient Registration">
      <ToastContainer autoClose={3000} hideProgressBar />
      <Alert color="primary">
        All Information with Asterisks(*) are compulsory
      </Alert>
      
      <Form onSubmit={handleSubmit}>
        {/* First  row form entry  for Demographics*/}
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card className={classes.cardBottom}>
              <CardContent>
                <Title>
                  Basic Information <br />
                  {/* <MatButton
                    variant="contained"
                    color="primary"
                    className=" float-right mr-1" >
                    </MatButton> */}

                </Title>
                <br />
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="hospitalNumber">Patient Id *</Label>
                      <Input
                        type="text"
                        name="hospitalNumber"
                        id="hospitalNumber"
                        
                        value={values.hospitalNumber}
                        onChange={handleInputChange}

                      />
                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup>
                      <Label for="middleName">Date Of Registration *</Label>

                      <DateTimePicker
                        time={false}
                        name="regDate"
                        id="regDate"
                        value={values.regDate}
                        onChange={value1 =>
                          setValues({ ...values, regDate: value1 })
                        }
                        defaultValue={new Date()}
                        max={new Date()}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="firstName">First Name *</Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                      
                        value={values.firstName}
                        onChange={handleInputChange}
                        
                      />
                      <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="middleName">Other Name(s)</Label>
                      <Input
                        type="text"
                        name="otherNames"
                        id="otherNames"
                    
                        onChange={handleInputChange}
                        value={values.otherNames}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="lastName">Last Name * </Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                      
                        onChange={handleInputChange}
                        value={values.lastName}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="maritalStatus">Gender *</Label>
                      <Input
                        type="select"
                        name="genderId"
                        id="genderId"
                        value={values.genderId}
                        onChange={handleInputChange}
                        required
                      >
                      {gender.map(({ label, value }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="occupation">Occupation *</Label>
                      <Input
                        type="select"
                        name="occupationId"
                        id="occupationId"
                        value={values.occupationId}
                        onChange={handleInputChange}
                      >
                        {occupation.map(({ label, value }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="qualification">Hightest Qualification *</Label>
                      <Input
                        type="select"
                        name="educationId"
                        value={values.educationId}
                        onChange={handleInputChange}
                      >
                        {qualification.map(({ label, value }) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="maritalStatus">Marital Status *</Label>
                      <Input
                        type="select"
                        name="maritalStatusId"
                        id="maritalStatusId"
                        value={values.maritalStatusId}
                        onChange={handleInputChange}
                      >
                        {maritalStatus.map(({ label, value }) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    {!display ? (
                      <FormGroup>
                        <Label>Date OF Birth *</Label>
                        <DateTimePicker
                          time={false}
                          name="dob"
                          dropUp
                          value={values.regDate}
                          onChange={value1 =>
                            setValues({ ...values, dob: value1 })
                          }
                          defaultValue={new Date()}
                          max={new Date()}
                          required
                        />
                      </FormGroup>
                    ) : (
                      <FormGroup>
                        <Label>Date OF Birth</Label>
                        <Input type="text" id="dob" disabled />
                      </FormGroup>
                    )}
                  </Col>
                  <Col md={4}>
                    {/* Estimate Date of birth in a row  */}
                    <Row form>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="year">Age</Label>
                          <Input
                            id="age"
                            type="text"
                            name="age"
                           
                            onChange={onAgeInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}></Col>
                </Row>
              </CardContent>
            </Card>
          </Col>
        </Row>
        {/* Second row form entry  for contact details*/}
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card className={classes.cardBottom}>
              <CardContent>
                <Title>
                  Contact Details <br />
                </Title>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="phoneNumber">Phone Number *</Label>
                      <Input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        
                        value={values.mobilePhoneNumber}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="altPhoneNumber">Alt. Phone Number</Label>
                      <Input
                        type="text"
                        name="alternatePhoneNumber"
                        id="alternatePhoneNumber"
                        
                        value={values.alternatePhoneNumber}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="emailAddress">Email Address</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                       
                        value={values.email}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl={12} lg={12} md={12}>
                    <Card className={classes.cardBottom}>
                      <CardContent>
                        <Title>
                          {" "}
                          Address <br />
                        </Title>

                        <Row form>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="country">Country *</Label>
                              <Input
                                type="select"
                                name="countryId"
                                id="countryId"
                                value={values.countryId}
                                onChange={getStates}
                              >
                                {countries.map(({ label, value }) => (
                                  <option key={value} value={value}>
                                    {label}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </Col>

                          <Col md={4}>
                            <FormGroup>
                              <Label for="stressAddress">State *</Label>
                              <Input
                                type="select"
                                name="stateId"
                                id="stateId"
                             
                                value={values.stateId}
                                onChange={getProvinces}
                              >
                                {states.map(({ label, value }) => (
                                  <option key={value} value={value}>
                                    {label}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="lga">Province/District/LGA *</Label>
                              <Input
                                type="select"
                                name="provinceId"
                                id="provinceId"
                                
                                value={values.provinceId}
                                
                              >
                                {provinces.length > 0 ? (
                                  provinces.map(({ id, name }) => (
                                    <option key={name} value={id}>
                                      {name}
                                    </option>
                                  ))
                                ) : (
                                  <option key="" value="">
                                    {" "}
                                    No Record Found
                                  </option>
                                )}
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row form>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="city">Street Address</Label>
                              <Input
                                type="text"
                                name="city"
                                id="city"
                               
                                value={values.city}
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </Col>

                          <Col md={4}>
                            <FormGroup>
                              <Label for="landMark">Land Mark</Label>
                              <Input
                                type="text"
                                name="landmark"
                                id="landmark"
                              
                                value={values.landmark}
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardContent>
                    </Card>
                  </Col>
                </Row>
              </CardContent>
            </Card>
          </Col>
        </Row>

        {/* Third  row form entry  for Contact Address*/}

        {/* fourth  row form entry  for Relatives*/}
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card className={classes.cardBottom}>
              <CardContent>
                <Title>
                  Relatives
                  <MatButton
                    variant="contained"
                    color="primary"
                    className=" float-right mr-1"
                    startIcon={<FaPlusSquare />}
                    onClick={handleAddRelative}
                  >
                    Add Relative
                  </MatButton>
                </Title>
                <br />
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="occupation">Relationship Type</Label>
                      <Input
                        type="select"
                        name="relationshipTypeId"
                        id="relationshipTypeId"
                        value={relative.relationshipTypeId}
                        onChange={onRelativeChange}
                      >
                        <option value="">
                          Select Relative Relationship Type
                        </option>
                        {relationshipTypes.map(({ id, name }) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="firstName">First Name</Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={relative.firstName}
                       
                        onChange={onRelativeChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="middleName">Middle Name</Label>
                      <Input
                        type="text"
                        name="otherNames"
                        id="otherNames"
                        
                        value={relative.otherNames}
                        onChange={onRelativeChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="lastName">Last Name </Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                       
                        value={relative.lastName}
                        onChange={onRelativeChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="relativePhoneNumber">Phone No.</Label>
                      <Input
                        type="text"
                        name="relativePhoneNumber"
                        id="relativePhoneNumber"
                     
                        value={relative.mobilePhoneNumber}
                        onChange={e =>
                          setRelative({
                            ...relative,
                            mobilePhoneNumber: e.target.value
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="email">Email Address</Label>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                       
                        value={relative.email}
                        onChange={onRelativeChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="address">Address</Label>
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        
                        onChange={onRelativeChange}
                        value={relative.address}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className={classes.demo}>
                      <List>
                        {relatives.map((relative, index) => (
                          <RelativeList
                            key={index}
                            index={index}
                            relative={relative}
                            removeRelative={removeRelative}
                            relationshipTypeName={getRelationshipName(
                              relative.relationshipTypeId
                            )}
                          />
                        ))}
                      </List>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}></Col>
                </Row>
                <MatButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  disabled={saving}
                >
                  {!saving ?'Save' : 'Saving'}
                  
                </MatButton>

                <MatButton
                  variant="contained"
                  className={classes.button}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </MatButton>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Form>
    </Page>
  );
};

function RelativeList({
  relative,
  index,
  removeRelative,
  relationshipTypeName
}) {
  return (
    <ListItem>
      <ListItemText
        primary={
          <React.Fragment>
            {relationshipTypeName}, {relative.firstName} {relative.otherNames}{" "}
            {relative.lastName}
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              {relative.mobilePhoneNumber} {relative.email} <br></br>
            </Typography>
            {relative.address}
          </React.Fragment>
        }
      />

      <ListItemSecondaryAction onClick={() => removeRelative(index)}>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

const mapStateToProps = state => ({
  countries: state.patients.countries,
  status: state.patients.status,
 // errormsg:state.patients.errormsg
});


export default connect(mapStateToProps, { create, fetchCountries })(PatientRegistration);
