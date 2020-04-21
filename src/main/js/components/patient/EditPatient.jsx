import Page from 'components/Page';
import React, { useState, useEffect } from 'react';
import MatButton from '@material-ui/core/Button';
import './PatientRegistrationPage.css'
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Alert,
} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import {  Card,CardContent, }
from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { IoMdFingerPrint } from "react-icons/io";
import { FaFileImport } from "react-icons/fa";
import {FaPlusSquare} from 'react-icons/fa';
import Spinner from 'react-bootstrap/Spinner';
// import { withRouter } from 'react-router-dom';

import axios from 'axios';
import 'react-widgets/dist/css/react-widgets.css';
//Date Picker
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
// React Notification
import { toast } from "react-toastify";
import moment from 'moment';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from 'components/Title/CardTitle';
import {url} from 'axios/url';
import date22 from 'components/DateTime/BootstrapDate'
// import CountryStates from './CountryStates';
//Dtate Picker package
Moment.locale('en');
momentLocalizer();

  const useStyles = makeStyles(theme => ({
    card: {
      margin: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    }, 
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    cardBottom: {
      marginBottom: 20
    },
    Select: {
      height:45,
      width: 300,
    },
    button: {
      margin: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
        maxWidth: 752,
      },
      demo: {
        backgroundColor: theme.palette.background.default,
      },
      inline: {
        display: 'inline',
      },
    
  }));


const PatientRegistration = (props) => {
    const classes = useStyles();
    const apiUrl = url+"patients";
    const apicountries = url+"countries";
    const apistate = url+"state/country/";
    //Getting List of Countries and State
    const [countries, setCountries] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [provinces, setProvinces] = React.useState([]);
    const [relatives, setRelatives] = useState([]);
    const [relative, setRelative] = useState([{}]);
    const relationshipTypes = [{id:"1", name:"Father"},{id:"2", name:"Mother"},
    {id:"3", name:"Sister"},{id:"4", name:"Brother"}];

    const [patient, setPatient] = useState({ 
            hospitalNumber:'',
            firstName: '',
            lastName: '', 
            email:'',
            facilityId: '1',
            dobEstimated:'',
            educationId:'',
            genderId:'',
            maritalStatusId:'',
            occupationId:'',
            alternatePhoneNumber:'',
            address1:'',
            city:'',
            countryId:'',
            landmark:'',
            provinceId:'',
            zipCode:'',
            stateId:'',
            street:'',
            dob:'',
            dateRegistration: new Date()
    });  
    //console.log(patient);
    const Urlcall = url+"patients/" + props.match.params.id;  
    console.log(Urlcall);
        useEffect(() => {  
          const GetData = async () => {  
            const result = await axios(Urlcall);  
            setPatient(result.data);  
            console.log(patient);
          };  
        
          GetData();  
        }, []);  
    const newDatenow = moment(patient.dateRegistration).format('DD-MM-YYYY');
    const newDob = moment(patient.dob).format('DD-MM-YYYY');
    //console.log(date2);
    const [showLoading, setShowLoading] = useState(false);
    //Saving of Patient Registration 
    const savePatient = (e) => {
      //toast.warn("Processing Registration");
      setShowLoading(true);
      e.preventDefault();
      const data = { 
                    hospitalNumber: patient.hospitalNumber,           
                    dateRegistration: newDatenow,
                    facilityId: '1',
                    firstName: patient.firstName,
                    lastName:  patient.lastName, 
                    email:patient.email,
                    dob:newDob,
                    maritalStatusId:patient.maritalStatusId,
                    occupationId:patient.occupationId,
                    genderId:patient.genderId,
                    educationId:patient.educationId,           
                    address1:patient.address1,
                    city:'1',
                    countryId:'1',
                    zipCode:patient.zipCode,
                    stateId:'1',
                    street:patient.street,
                    provinceId: 1,
                    personRelatives: relatives,
                    titleId:1
                };
      console.log(data);       
      axios.post(apiUrl, data)
        .then((result) => {          
          setShowLoading(false);
          props.history.push('/patients')
          toast.success("Patient Registration Successful!");
        }).catch((error) => {
            console.log(error);
            setShowLoading(false)
        }
        );
    };
  //End of the Saving the Patient Registration
    const onChange = (e) => {
      e.persist();     
      setPatient({...patient, [e.target.name]: e.target.value});
    } 
    //Get countries
    useEffect(() => {
        async function getCharacters() {
            try{
          const response = await fetch(apicountries);
          const body = await response.json();          
          setCountries(body.map(({ name, id }) => ({ label: name, value: id })));
          const defaultCountryId = body.find(x => x.name === 'Nigeria').id;
          setPatient({...patient, countryId: defaultCountryId});
          setStateByCountryId(defaultCountryId);
          }catch(error){
              console.log(error);
          }
        }
        getCharacters();
      }, []);


    //Get States from selected country 
    const getStates = (e) => {
        setPatient({...patient, [e.target.name]: e.target.value});
        const getCountryId = e.target.value;
        setStateByCountryId(getCountryId);
    }

    function setStateByCountryId (getCountryId) {
        async function getCharacters() {
            const response = await fetch(apistate+getCountryId);            
            const stateList = await response.json();
            setStates(stateList.map(({ name, id }) => ({ label: name, value: id })));
          }
          getCharacters();
    }

    //fetch province
    const getProvinces = (e) => {
        setPatient({...patient, [e.target.name]: e.target.value});
        const stateId = e.target.value;
        async function getCharacters() {
            const response = await fetch("/api/province/state/"+stateId);
            const provinceList = await response.json();
            setProvinces(provinceList.map(({ name, id }) => ({ label: name, value: id })));
          }
          getCharacters();
    }

    function getRelationshipName(id) {
        return relationshipTypes.find(x => x.id === id).name;
    }
    

      const addRelative = value => {
        const allRelatives = [...relatives,  value ];
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
        setRelative({email:"", firstName:"", lastName:"",
            otherNames:"", relationshipTypeId:"", mobilePhoneNumber:"", address:""});
      };

      const onRelativeChange = e => {
        //  e.preventDefault();
        setRelative({...relative, [e.target.name]: e.target.value});
        }
    
  return (
    <Page title="Patient Regsitration" >
        <ToastContainer autoClose={2000} />
        <Alert color="primary">
        All Information with Asterisks(*) are compulsory 
      </Alert>
    <Form onSubmit={savePatient}>
         {/* First  row form entry  for Demographics*/}
        <Row>
        <Col xl={12} lg={12} md={12}>
        <Card className={classes.cardBottom}>  
            <CardContent>
                <Title >Basic Information <br/>
                    
                        <MatButton
                            variant="contained"
                            color="primary" className=" float-right mr-1"
                            startIcon={<FaFileImport />}>
                            Import image
                        </MatButton>
                        <MatButton
                            variant="contained"
                            color="primary" className=" float-right mr-1"  startIcon={<IoMdFingerPrint />}>
                            Finger print
                        </MatButton> 
                        <br/> 
                </Title>
                        <Row form>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="hospitalNumber">Patient Id</Label>
                                <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Patient ID " value={patient.hospitalNumber} onChange={onChange}/>
                            </FormGroup>
                            </Col>
                            
                            <Col md={4}>
                            <FormGroup>
                                <Label for="middleName">Date Of Registration</Label>
                                
                                <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"   value={patient.dateRegistration}   onChange={value1 => setPatient({...patient, dateRegistration: value1})}
                                defaultValue={new Date()} max={new Date()}
                                
                                />
                                <date22 onchange={onChange} value={patient.dateRegistration} />
                            </FormGroup>
                            </Col>
                            
                        </Row>
                        <Row form>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input type="text" name="firstName" id="firstName" placeholder="First Name" value={patient.firstName} onChange={onChange} />
                            </FormGroup>
                            </Col>
                            
                            <Col md={4}>
                            <FormGroup>
                                <Label for="middleName">Other Name(s)</Label>
                                <Input type="text" name="otherNames" id="otherNames" placeholder="Middle Name" value={patient.otherNames} onChange={onChange}/>
                            </FormGroup>
                            </Col>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="lastName">Last Name </Label>
                                <Input type="text" name="lastName" id="lastName" placeholder="Last Name" value={patient.lastName} onChange={onChange} />
                            </FormGroup>
                            </Col>
                        </Row>
                        
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="maritalStatus">Gender</Label>
                                    <Input type="select" name="genderId" id="genderId" value={patient.genderId} onChange={onChange} >
                                        <option value="1">Female</option>
                                        <option value="2">Male</option>
                                        
                                    </Input>
                                </FormGroup>  
                            </Col>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="occupation">Occupation</Label>
                                <Input type="select" name="occupationId" id="occupationId" value={patient.occupationId} onChange={onChange}>
                                    <option value="1">Students</option>
                                    <option value="2">Business</option>
                                    <option value="3">Government</option>
                                </Input>
                            </FormGroup>
                            </Col>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="qualification">Hightest Qualification</Label>
                                <Input type="select" name="educationId" onChange={onChange}>
                                    <option value="1">PHD</option>
                                    <option value="2">MSC</option>
                                    <option value="3">BSC</option>
                                    <option value="4">HND</option>
                                    <option value="5">NCE</option>
                                </Input>
                            </FormGroup>
                            </Col>
                            
                        </Row>
                        
                        <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="maritalStatus">Marital Status</Label>
                                <Input type="select" name="maritalStatusId" id="maritalStatusId" value={patient.maritalStatusId} onChange={onChange}>
                                    <option value="1">Single</option>
                                    <option value="2">Married</option>
                                    <option value="3">Divorce</option>
                                </Input>
                            </FormGroup>  
                            </Col>
                            <Col md={4}>
                            <FormGroup >
                                <Label>Date OF Birth</Label>
                                <DateTimePicker time={false} name="dob"  dropUp onChange={value1 => setPatient({...patient, dob: value1})} max={new Date()} />

                            </FormGroup>
                            </Col>
                            <Col md={4} >
                                {/* Estimate Date of birth in a row  */}
                                <Row form>
                                        <Col md={4}>
                                        <FormGroup>
                                            <Label for="year">Year</Label>
                                            <Input type="text" name="year" id="year" placeholder="Year" value={patient.Estimate} onChange={onChange} />
                                        </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                        <FormGroup>
                                            <Label for="year">Months</Label>
                                            <Input type="text" name="months" id="months" placeholder="Months" value={patient.EstimateMonths} onChange={onChange} />
                                        </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                        <FormGroup>
                                            <Label for="year">Days</Label>
                                            <Input type="text" name="days" id="days" placeholder="Days" value={patient.EstimateDays} onChange={onChange} />
                                        </FormGroup>
                                        </Col>
                                </Row>
                            </Col>           
                            <Col md={4}>
                            <FormGroup check>
                                <Label></Label>
                                <Input type="checkbox" />Estimates Date of  Birth
                               
                            </FormGroup>
                            </Col>
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
                <Title >Contact Details <br/></Title>
                        <Row form>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="phoneNumber">Phone Number</Label>
                                <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" value={patient.mobilePhoneNumber} 
                                onChange={onChange} />
                            </FormGroup>
                            </Col>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="altPhoneNumber">Alt. Phone Number</Label>
                                <Input type="text" name="alternatePhoneNumber" id="alternatePhoneNumber" placeholder="Alternative Number" value={patient.alternatePhoneNumber}  onChange={onChange}/>
                            </FormGroup>
                            </Col>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="emailAddress">Email Address</Label>
                                <Input type="email" name="email" id="email" placeholder="Email Address" value={patient.email} onChange={onChange}  />
                            </FormGroup>
                            </Col>
                        </Row>


                </CardContent>
            </Card>
            </Col>
        </Row>

    {/* Third  row form entry  for Contact Address*/}
    <Row>
        <Col xl={12} lg={12} md={12}>
        <Card className={classes.cardBottom}>  
                                         
            <CardContent>
            <Title > Address <br/></Title>
                
                        <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="country">Country</Label>
                                            <Input type="select" name="countryId" id="countryId" value={patient.countryId}  onChange={getStates}>
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
                                    <Label for="stressAddress">State</Label>
                                    <Input type="select" name="stateId" id="stateId" placeholder="Select State" value={patient.stateId} onChange={getProvinces}>
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
                                <Label for="lga">Province/District/LGA </Label>
                                <Input type="select" name="provinceId" id="provinceId" placeholder="Select Province" value={patient.provinceId} onChange={onChange}>
                                        {provinces.map(({ label, value }) => (
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
                                <Label for="city">Street Address</Label>
                                <Input type="text" name="city" id="city" placeholder="City" value={patient.city}  onChange={onChange}/>
                            </FormGroup>
                            </Col>
                            
                            <Col md={4}>
                            <FormGroup>
                                <Label for="landMark">Land Mark</Label>
                                <Input type="text" name="landmark" id="landmark" placeholder="Land Mark" value={patient.landmark}  onChange={onChange}/>
                            </FormGroup>
                            </Col>
                            
                        </Row>
                </CardContent>
            </Card>
            </Col>
        </Row>
         {/* fourth  row form entry  for Relatives*/}
         <Row>
            <Col xl={12} lg={12} md={12}>
            <Card className={classes.cardBottom}>                                          
                <CardContent>
                    <Title > 
                        Relatives 
                        <MatButton
                            variant="contained"
                            color="primary" className=" float-right mr-1"  startIcon={<FaPlusSquare />}  onClick={handleAddRelative}>
                            Add Relative 
                        </MatButton> 
                   
                    </Title>
                    <br/>
                            <Row form>
                            <Col md={3}>
                            <FormGroup>
                                <Label for="occupation">Relationship Type</Label>
                                <Input type="select" name="relationshipTypeId" id="relationshipTypeId" value={relative.relationshipTypeId} onChange={onRelativeChange}  >
                                <option value="">Select Relative Relationship Type</option>
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
                                    <Input type="text" name="firstName" id="firstName" value={relative.firstName}  placeholder="First Name" onChange={onRelativeChange}/>
                                </FormGroup>
                                </Col>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="middleName">Middle Name</Label>
                                    <Input type="text" name="otherNames" id="otherNames" placeholder="Middle Name"  value={relative.otherNames} onChange={onRelativeChange}/>
                                </FormGroup>
                                </Col>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="lastName">Last Name </Label>
                                    <Input type="text" name="lastName" id="lastName" placeholder="Last Name" value={relative.lastName} onChange={onRelativeChange}/>
                                </FormGroup>
                                </Col>
                            </Row>
                            
                            <Row form>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="relativePhoneNumber">Phone No.</Label>
                                    <Input type="text" name="relativePhoneNumber" id="relativePhoneNumber" placeholder="Relative Phone No." value={relative.mobilePhoneNumber} onChange={e => setRelative({...relative, mobilePhoneNumber: e.target.value})}/>
                                </FormGroup>
                                </Col>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="email">Email Address</Label>
                                    <Input type="text" name="email" id="email" placeholder="Relative Email Address" value={relative.email} onChange={onRelativeChange}/>
                                </FormGroup>
                                </Col>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="address">Address</Label>
                                    <Input type="text" name="address" id="address" placeholder="Relative Address" onChange={onRelativeChange} value={relative.address}/>
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
                                    relationshipTypeName={getRelationshipName(relative.relationshipTypeId)}
                                    />
                                ))}
                                            </List>
                                </div>
                                </Col>
                            </Row>
                            <Row>
                            <Col md={12}>
                            {showLoading && 
                                
                                <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                                </Spinner> 
                            } 
                            </Col> 
                            </Row>
                             <MatButton  
                                type="submit" 
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                             >
                                Save
                            </MatButton>
                            <Link to="/patients">
                                <MatButton
                                        
                                        className={classes.button}
                                        startIcon={<CancelIcon />}
                                    >
                                    Cancel
                                </MatButton>  
                            </Link>
                                
                    </CardContent>
                </Card>
                </Col>
            </Row>
    </Form>
</Page>
  );
};


function RelativeList ({ relative, index, removeRelative, relationshipTypeName }) {

    return (
        <ListItem>
                  <ListItemText
                    primary={ <React.Fragment>
                        {relationshipTypeName}, {relative.firstName} {relative.otherNames} {relative.lastName}</React.Fragment> }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                         
                          color="textPrimary"
                        >
                        {relative.mobilePhoneNumber} {relative.email} <br></br>
                        </Typography>
                        {relative.address}
                      </React.Fragment>
                    }
                  />
                  
                  <ListItemSecondaryAction  onClick={() => removeRelative(index)}>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                
                
    );
  } 
export default PatientRegistration;