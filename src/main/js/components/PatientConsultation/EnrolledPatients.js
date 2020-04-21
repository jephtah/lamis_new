import Page from 'components/Page';
import React from 'react';
import {
  Card,
  Col,
  Form,
  Row,
  Alert,
  Button,
} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { TiWarningOutline } from "react-icons/ti";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    FaUserPlus,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import SearchTestOrder from 'components/Hiv/SearchForm/SearchEnrolledPatients';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
    width:200,
  },
  body1: {
    fontWeight: 500,
  },

}));

function createData(name, calories, fat, carbs, protein, gender) {
  return { name, calories, fat, carbs, protein, gender };
}

const rows = [
  createData('1598', 'Alex Williams', 234567677, 3, 'Male'),
  createData('1234', 'Ahmed Musa', +23456666443, 9, 'Male'),
  createData('5555', 'Isaac Johnson',+2345567765, 6 , 'Female'),
];

const PendingPrescription = (props) => {
 
    const classes = useStyles();
  return (
    <Page title="ART Clinic" >     
        <Row>        
        <Col xl={12} lg={12} md={12}>
          <Alert color="primary">
                <TiWarningOutline 
                    size="30"
                    className=" text-dark"/>  { '  '} 
                    Note : Only  Patients can be search here
            </Alert>
          </Col>
        </Row>

              <Row>          
                <Col sm="12">
                
                  <Card body>
                    <Link to="/enroll-patient">
                        <Button color="primary" className=" float-right mr-1" >
                                <FaUserPlus/> Enroll Patients
                        </Button>
                    </Link>
                    <Form>
                      <SearchTestOrder />
                    </Form>          
                      <br/>
                      <TableContainer component={Paper}>                
                        <Table className={classes.table} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                            <TableCell>Patient ID</TableCell>
                            <TableCell align="center">Patient Name</TableCell>
                            <TableCell align="center">Phone Number</TableCell>
                            <TableCell align="center">Age</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.calories}</TableCell>
                                <TableCell align="center">{row.fat}</TableCell>
                                <TableCell align="center">{row.carbs}</TableCell>
                                <TableCell align="center">{row.gender}</TableCell>
                                <TableCell align="center">
                                        
                                        <Typography variant="caption" className="text-primary"   display="block"  gutterBottom>
                                            <MdDashboard size="20"/>
                                            <Link to="/enroll-patient-dashboard"> View Dashboard</Link>
                                        </Typography>                                    
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>       
                  </Card>
                </Col>
                
              </Row>
       
</Page>

  
  );
};

export default PendingPrescription;
