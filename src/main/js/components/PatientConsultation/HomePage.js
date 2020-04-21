import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { ToastContainer } from 'react-toastify'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// {/* Auto textfield complete */}
import {
    MdDashboard,
    MdContacts
  } from 'react-icons/md';
import {GiFiles,GiTestTubes } from 'react-icons/gi';  
import { FaBriefcaseMedical} from "react-icons/fa"; 
//{/*  Check box list */}

import PatientChart from 'components/PatientConsultation/PatientChart';
import PatientAllergies from 'components/PatientDashboard/PatientAllergies';
import PatientVitals from 'components/PatientDashboard/PatientVitals';
import ClinicalHistory from 'components/PatientDashboard/ClinicalHistory';
import Consultation from './consulatation/consultation';
import PatientDetailCard from 'components/Functions/PatientDetailCard';
import TestOrder from './TestOrder/TestOrder';
import Medication from './Medication/Medication';
import ServiceForm from './ServiceForm/serviceForm';
import { Nav, NavItem, NavLink, Badge, Card, CardBody, CardDeck } from 'reactstrap';
import CheckInModal from 'components/CheckIn/CheckInModal';
import ViewVitalsSearch from 'components/Vitals/ViewVitalsSearch'
import * as actions from "actions/patients";
import {connect} from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import Popover from '@material-ui/core/Popover';
import MatButton from '@material-ui/core/Button';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={5}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root2: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin:theme.spacing(7),
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 12,
          
      },
      pos: {
        fontSize: 11,
      },
    cardContent:{
        padding: 2,
    },
    cardroot:{
        margin:theme.spacing(1),
        height: 250 + 'px !important' ,
    }
    
    },
    alertmsge:{
        marginTop: theme.spacing(2),
    },
    rootaccordia: {
        width: '100%',
    },
    accordiaheading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    allergiesroot: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
        margin: theme.spacing(0.5),
        },
    },
    
    checkboxroot: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        },
        
    },

    formroot: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        },
    },

    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
        textDecoration: 'underline',
        },
    },
    inforoot: {
        width: '95%',
        margin: 20,
        backgroundColor: '#eee',
    },
    navItemText: {
      padding: theme.spacing(2),
    },
    }));

    const cardHeight = {
        height: 200, 
        position: 'relative',
        overflow: 'auto',
    };

function HomePage(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [checkIn, setCheckIn] = useState(false);
  const [fetchingPatient, setFetchingPatient] = useState(false);
  const hospitalNumber = props.location.state.hospitalNumber || props.patient.hospitalNumber || '';
  const [rPopoverOpen, setRelationshipPopoverOpen] = useState(false);

  // const toggleRelationshipPopOver = () => setRelationshipPopoverOpen(!rPopoverOpen);
  // const modifiers = {
  //   preventOverflow: {
  //     enabled: false,
  //   },
  //   flip: {
  //     enabled: false,
  //   },
  // };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const isEmpty = (value) => {
    if(JSON.stringify(value) === "{}"){
      return true;
    }
    return false;
  }

  React.useEffect(() => {
    setFetchingPatient(true);
    const onSuccess = () => {
      setFetchingPatient(false);
    }
    const onError = () => {
      setFetchingPatient(false);
    }
    props.fetchPatientByHospitalNumber(hospitalNumber, onSuccess, onError)
  }, [hospitalNumber]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 const checkInPatient = () => {
   setCheckIn(true);
 }

 switch (isEmpty(props.patient)) {

 }
  return (
  
  <div>
    
    {/* Show couldnt load patient info if api call to fetch patient is unsuccessful, else show patient dashboard */}
    { (!fetchingPatient && isEmpty(props.patient)) ? 
    <div className={classes.inforoot}>
        Couldn't load patient information.
      </div> :

      <div className={classes.root}> 

        <div className={classes.inforoot} >
            <PatientDetailCard />   
        </div> 
       
      <AppBar position="static" >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="white"
          aria-label="scrollable force tabs example"
        >
          <Tab className={classes.title} label="Dashboard" icon={<MdDashboard />} {...a11yProps(0)} />  
          <Tab className={classes.title} label="Vital Signs" icon={<MdContacts />} {...a11yProps(5)} />       
          <Tab className={classes.title} label="Consultation" icon={<MdContacts />} {...a11yProps(1)} />
          <Tab className={classes.title} label="Service Form" icon={<GiFiles />} {...a11yProps(2)} />
          <Tab className={classes.title} label="Test Order" icon={<GiTestTubes />} {...a11yProps(3)} />
          <Tab className={classes.title} label="Medication" icon={<FaBriefcaseMedical />} {...a11yProps(4)} />
          {/* <Tab className={classes.title} label="Others" icon={<FaChartLine />} {...a11yProps(5)}  onClick={handleClick}/> */}
          
          
        </Tabs>
        <div>
     
    </div>
      </AppBar>
      <ToastContainer />
      { fetchingPatient ? 

<LinearProgress color="primary" thickness={5}/>
: <div>


      <Nav pills style={{backgroundColor:'silver'}} light >
        <NavItem>
          <NavLink  title="Alerts"><i className="fa fa-bell"></i>&nbsp;  <Badge href="#" color="dark">0</Badge> </NavLink>
        </NavItem>
        <NavItem>
        <MatButton aria-describedby={id} onClick={handleClick}>
      &nbsp; Relationships &nbsp; <Badge color="dark">{props.patient.personRelativeDTOs ? props.patient.personRelativeDTOs.length : 0}</Badge>
      </MatButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
       <List>
         {(props.patient.personRelativeDTOs && props.patient.personRelativeDTOs.length > 0 ) ? props.patient.personRelativeDTOs.map((relative, index) => (
                          <RelativeList
                            key={index}
                            index={index}
                            relative={relative}
                            relationshipTypeName={"Father"}
                          />
                        )) : 
                        <Typography className={classes.navItemText}>No Relationship </Typography>}
                      </List>
      </Popover>
        </NavItem>
        { (props.patient && props.patient.dateVisitStart ) ? 
        <NavItem className="ml-auto">
          <NavLink>  <span>Current Visit: <b>{props.patient.dateVisitStart} {props.patient.timeVisitStart}</b></span> &nbsp;  </NavLink>
        </NavItem>
: 
<NavItem className="ml-auto" >
<div>  
  <span style={{color:'red'}}><b>Patient not checked in</b></span> &nbsp; 
| &nbsp;<MatButton type="button" outline color="default" onClick={checkInPatient}> Check In &nbsp; <i class="fa fa-sign-in"></i> </MatButton></div>
</NavItem>
}

        </Nav>
      {/* The DashBoad Tab  */}
      <TabPanel value={value} index={0}>
      <CardDeck>
         <PatientVitals patientId={props.patient.patientId}  /> 
        {/* <PatientAllergies height={cardHeight} addstatus={false} />  */}
        <PatientAllergies height={cardHeight} addstatus={false} /> 
      </CardDeck>
      <br></br>
    <PatientChart getpatientdetails={props.location.state} />
    <br></br>
    <Card>
                        <CardBody>
                            <ClinicalHistory />                     
                        </CardBody>                      
                    </Card>
</TabPanel>
    {/* End of dashboard */}
{/* Begining of vital signs  */}
<TabPanel value={value} index={1}>
<ViewVitalsSearch  patientId={props.patient.patientId}   />  
    
</TabPanel>
{/* End of vital signs */} 
{/* Begining of Service Form */}
<TabPanel value={value} index={2}>
 
            <Consultation patientId={props.patient.patientId } visitId={props.patient.visitId} />

</TabPanel>    
 
 {/* Begining of consultation  */}
 <TabPanel value={value} index={3}>    
    <ServiceForm patientId={props.patient.patientId } visitId={props.patient.visitId}/>            
</TabPanel>

      <TabPanel value={value} index={4}>
        <TestOrder patientId={props.patient.patientId } visitId={props.patient.visitId}/>
      </TabPanel>
    {/* End of consultation */}
    <TabPanel value={value} index={5}>
        {/* Card stats */}
        <Medication patientId={props.patient.patientId } visitId={props.patient.visitId}  />

      </TabPanel>
      <TabPanel value={value} index={6}>
      <Grid container spacing={7} > 
                <Grid item xs='7'>                    
                    <Card >
                        <CardBody>
                            <Typography className={classes.title} color="primary" gutterBottom>
                            
                            </Typography>
                                <Grid >
                                    <Grid item xs='6'>
                                        <Typography className={classes.pos} color="textSecondary" >
                                                Pulse : <span style={{fontSize: 'bold'}}>56pm</span>
                                               
                                        </Typography>
                                    </Grid>
                                    
                                </Grid>                               
                        </CardBody>                      
                        </Card>                     
                </Grid>
                
                <Grid item xs='5'>                    
                    <Card >
                        <CardBody>
                            <Typography className={classes.title} color="primary" gutterBottom>
                            Drug Order 
                            </Typography>
                                <Grid container >
                                    <Grid item >
                                        <Typography className={classes.pos} color="textSecondary" >
                                                Pulse : <span style={{fontSize: 'bold'}}>56pm</span>
                                               
                                        </Typography>
                                    </Grid>
                                    
                                </Grid>                               
                        </CardBody>                      
                        </Card>                     
                </Grid>
                <br/>
                <Grid item xs='7'>                    
                    <Card >
                        <CardBody>
                            <Typography className={classes.title} color="primary" gutterBottom>
                            Drug Order 
                            </Typography>
                                <Grid container >
                                    <Grid item >
                                        <Typography className={classes.pos} color="textSecondary" >
                                                Pulse : <span style={{fontSize: 'bold'}}>56pm</span>
                                               
                                        </Typography>
                                    </Grid>
                                    
                                </Grid>                               
                        </CardBody>                      
                        </Card>                     
                </Grid>
             
            
            </Grid>
      </TabPanel>
      </div>
    }
      <CheckInModal patientId={props.patient.patientId} showModal={checkIn} setShowModal={setCheckIn}/>
  
      </div>
}
   </div>  
  );
}

function RelativeList({
  relative,
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
    </ListItem>
  );
}
const mapStateToProps = state => {
  return {
  patient: state.patients.patient
  }
}

const mapActionToProps = {
  fetchPatientByHospitalNumber: actions.fetchByHospitalNumber,
}

export default connect(mapStateToProps, mapActionToProps)(HomePage)