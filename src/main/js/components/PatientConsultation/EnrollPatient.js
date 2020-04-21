
import Page from 'components/Page';
import React, { useState } from 'react';
import axios from 'axios';
import 'react-widgets/dist/css/react-widgets.css';
//Date Picker
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
// React Notification
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from 'components/Title/CardTitle';
import {url} from 'axios/url';
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
import {  Card,CardContent, }
    from '@material-ui/core';
import Spinner from 'react-bootstrap/Spinner';
import MatButton from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';



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

}));


const PatientRegistration = (props) => {
    const classes = useStyles();
    const apiUrl = url+"patients";
    const apicountries = url+"countries";
    const apistate = url+"state/country/";
    //Getting List of Countries and State
    const [countries, setCountries] = React.useState([]);
    const [states, setStates] = React.useState([]);

    React.useEffect(() => {
        async function getCharacters() {
            const response = await fetch(apicountries);

            const body = await response.json();
            setCountries(body.map(({ name, id }) => ({ label: name, value: id })));
        }
        getCharacters();
    }, []);
    const [patient, setPatient] = useState({
        hospitalNumber:'',
        firstName: '',
        lastName: '',
        email:'',
        dateRegistration: '',
        facilityId: '1',
        dob:'',
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
    });

    const [showLoading, setShowLoading] = useState(false);
    //Saving of Patient Registration
    const savePatient = (e) => {
        //toast.warn("Processing Registration");
        setShowLoading(true);
        e.preventDefault();
        const data = {
            hospitalNumber: patient.hospitalNumber,
            dateRegistration: "01:11:2020",
            facilityId: '1',

            "person": {
                firstName: patient.firstName,
                lastName:  patient.lastName,
                email:patient.email,
                dob:patient.dob,
                maritalStatusId:patient.maritalStatusId,
                occupationId:patient.occupationId,
                genderId:patient.genderId,
                educationId:patient.educationId,
                "personContact": {
                    address1:patient.address1,
                    city:'1',
                    countryId:'1',
                    zipCode:patient.zipCode,
                    stateId:'1',
                    street:patient.street,
                    provinceId: 1
                },
                "personRelatives": [
                    {
                        dobEstimated:patient.dobEstimated,
                        alternatePhoneNumber:patient.alternatePhoneNumber,
                        landmark:patient.landmark,
                        provinceId:patient.provinceId,

                    }
                ],
                "titleId":1
            }
        };

        axios.post(apiUrl, data)
            .then((result) => {
                setShowLoading(false);
                props.history.push('/patient')
                // toast.success("Patient Registration Successful!");
            }).catch((error) => {
                setShowLoading(false)
                // console.log("Error in CreateBook!");
                //toast.error("Something went wrong!");
            }
        );
    };
    //End of the Saving the Patient Registration
    const onChange = (e) => {
        e.persist();
        setPatient({...patient, [e.target.name]: e.target.value});
    }
    //Get States from selected country
    const getStates = (event) => {
        const getCountryId = event.target.value;

        React.useEffect(() => {
            async function getCharacters() {
                const response = await fetch(apistate+getCountryId);

                const stateList = await response.json();
                setStates(stateList.map(({ name, id }) => ({ label: name, value: id })));
            }
            getCharacters();
        }, []);
        //setStates({})
        //console.log(stateList);
    }

    return (
        <Page title="Enroll Patient" >
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
                                <Title >Enrollment Details <br/>
                                </Title>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="hospitalNumber">Patient Id</Label>
                                            <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Patient ID " value={patient.hospitalNumber} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="middleName">Date Of Reg/TransferIn</Label>
                                            <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"   />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="middleName">Date Of Confirmed HIV Test</Label>
                                            <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"   />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="careentrypoint">Care Entry Point</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                <option value="1">Facility </option>
                                                <option value="2">Community</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="careentrypoint">Source of Referal</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                <option value="1">ANC</option>
                                                <option value="2">DOTS</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="careentrypoint">Enrollment Setting</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                <option value="1"></option>
                                                <option value="2"></option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="maritalStatus">HIV Status at Registration</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="occupation">TB Satus</Label>
                                            <Input type="select" name="occupationId" id="occupationId" value={patient.occupationId} >
                                               
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="qualification">Pregnancy Satus</Label>
                                            <Input type="select" name="educationId" onChange={onChange}>
                                               
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="maritalStatus">Gender</Label>
                                            <Input type="select" name="maritalStatusId" id="maritalStatusId" value={patient.maritalStatusId} >
                                                
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="maritalStatus">KP Target Group</Label>
                                            <Input type="select" name="maritalStatusId" id="maritalStatusId" value={patient.maritalStatusId} >
                                                
                                            </Input>
                                        </FormGroup>
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
                                    startIcon={<SaveIcon />}>Save
                                </MatButton>
                                <MatButton
                                    className={classes.button}
                                    startIcon={<CancelIcon />}>
                                    Cancel
                                </MatButton>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
                {/* Second row form entry  for contact details*/}
            </Form>
        </Page>
    );
};

export default PatientRegistration;
