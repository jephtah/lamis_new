import React,  { useState }  from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input 
} from 'reactstrap';

import {
  TiArrowBackOutline,
} from 'react-icons/ti';
import "react-datepicker/dist/react-datepicker.css";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Page from 'components/Page';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {
    FaTh,
    FaPlusSquare,
    FaTimesCircle
} from 'react-icons/fa';
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('en');
momentLocalizer();




const useStyles = makeStyles(theme => ({
    table: {
      minWidth: 650,
    },
    button: {
      margin: theme.spacing(1),
      width:200,
    },
  }));
  const useStyles2 = makeStyles(theme => ({
    inforoot: {
      width: '100%',
      marging: theme.spacing(5),
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
  }));
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('1598', 159, 6.0, 24, 4.0),
    createData('1234', 237, 9.0, 37, 4.3),
    createData('5555', 262, 16.0, 24, 6.0),
  ];


export default function Appointment(props){
    const classes = useStyles();
    const classes2 = useStyles2();

  /* For modal popup */
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);
  const toggle3 = () => setModal3(!modal3);
  const textstyle = {
    fontSize: '14px',
    fontWeight: 'bolder'
  };  
  return (
    <Page title="Lab. Test Result">
       <Row >
          <Col>
          <div className={classes2.inforoot} >
            <ExpansionPanel defaultExpanded style={{ backgroundColor: '#F5F5F5'}}>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
                >
                <div className={classes2.column}>
                    <Typography className={classes.heading}>
                        Name: Mathew Adeoye
                        <br/>
                        Gender : Female
                    </Typography>
                </div>
                <div className={classes2.column}>
                    <Typography className={classes2.secondaryHeading}>
                        Birthday : June, 14 1990 (20 years)
                        <br/>
                        phone Number : +234567890
                    </Typography>
                </div>
                <div className={classes2.column}>
                    <Typography className={classes2.secondaryHeading}>
                        Email Address : Mathew Adegbite
                        
                    </Typography>
                </div>
                </ExpansionPanelSummary>
               
            </ExpansionPanel>
            </div>
            <br/>
            <Card className="mb-12">
              <CardHeader>Test Order -- 03846657558
              <Link to="/laboratory">
                <Button color="primary" className=" float-right mr-1" >
                        <TiArrowBackOutline/> { ' ' } Go Back
                </Button>
                </Link>
              </CardHeader>
              <CardBody>
                    
                      <br/>
                        <Row>
                          <Col>
                            
                              <TableContainer component={Paper}>                
                                    <Table className={classes.table} aria-label="caption table">
                                    <TableHead>
                                        <TableRow>
                                        <TableCell>S/N</TableCell>
                                        <TableCell align="center">Test</TableCell>
                                        <TableCell align="center">Sample Type</TableCell>
                                        <TableCell align="center">Result</TableCell>
                                        <TableCell align="center">Actions</TableCell>
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
                                            <TableCell align="center">
                                                <Tooltip title="View Collected Sample">
                                                
                                                    <IconButton aria-label="View Collected Sample" onClick={toggle}>
                                                    <FaTh size="15" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Enter Result">
                                                    <IconButton aria-label="Enter Result" onClick={toggle2}>
                                                    <FaPlusSquare size="15" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Rejected Result">
                                                    <IconButton aria-label="Rejected Result" onClick={toggle3}>
                                                    <FaTimesCircle size="15" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    </Table>
                                </TableContainer>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
       
           {/* The Modal popup for each action */}
            {/* Modal to view test detail */} 
              <Modal isOpen={modal} toggle={toggle} className={className} size='lg'>
                <ModalHeader toggle={toggle}>View Test Detail</ModalHeader>
                <ModalBody>
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="4">
                          Test 
                          <br/>
                          <p style={textstyle}>Haemoglobin </p>

                        
                        </Col>
                        <Col xs="4">
                          Sample Test
                          <br/>
                          <p style={textstyle}>Blood</p>
                          
                          </Col>
                        <Col xs="4">
                          Date Of Result
                          <br/>
                          <p style={textstyle}>2020/03/03<small className="text-muted">By Umar</small></p>
                          </Col>
                       
                    </Row >
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="4">
                          Result 
                          <br/>
                          <p style={textstyle}>3</p>

                        
                        </Col>
                        <Col xs="4">
                          Unit
                          <br/>
                          <p style={textstyle}>mm/hl</p>
                          
                          </Col>
                        <Col xs="4">
                          Sample collected
                          <br/>
                          <p style={textstyle}>020/03/03<small className="text-muted">By Evans</small></p>
                          </Col>
                       
                    </Row>
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="4">
                          File
                          <br/>
                         <p style={textstyle}>Click to view File</p> 

                        
                        </Col>
                        <Col xs="4">
                          Status
                          <br/>
                          <p style={textstyle}>Refeered - Out</p>
                          
                          </Col>
                        
                       
                    </Row>
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="12">
                          Note
                          <br/>
                          <p style={textstyle}>Nile</p>

                        
                        </Col>
                        
                    </Row>
                </ModalBody>
                <ModalFooter>
                
                <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
                </Modal>
            {/* Modal to enter new test result  */} 
                <Modal isOpen={modal2} toggle={toggle2} className={className} size='lg'>
                    <ModalHeader toggle={toggle2}>Enter Test Detail</ModalHeader>
                    <ModalBody>
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="4">
                          Test 
                          <br/>
                          <p style={textstyle}>Haemoglobin </p>

                        
                        </Col>
                        <Col xs="4">
                          Sample Test
                          <br/>
                          <p style={textstyle}>Blood</p>
                          
                          </Col>
                        <Col xs="4">
                          Date Of Result
                          <br/>
                          <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"  
                            defaultValue={new Date()} max={new Date()}
                            />            
                          </Col>
                       
                    </Row >
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="4">
                         
                          <FormGroup>
                                <Label for="exampleEmail">Result</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                            </FormGroup>
                        </Col>
                        <Col xs="4">
                          Unit
                          <br/>
                          <p style={textstyle}>mm/hl</p>
                          
                          </Col>
                        <Col xs="4">
                          Sample collected
                          <br/>
                          <p style={textstyle}>020/03/03<small className="text-muted">By Evans</small></p>
                          </Col>
                       
                    </Row>
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="4">
                         
                          <FormGroup>
                                <Label for="examplePassword">File</Label>
                                <Input type="file" name="file"  placeholder="file upload" />
                            </FormGroup>
                        
                        </Col>
                        <Col xs="4">
                          Date Asseyed
                          <br/>
                          <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"  
                            defaultValue={new Date()} max={new Date()}
                            /> 
                          
                          </Col>
                        
                       
                    </Row>
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="12">
                         
                          <FormGroup>
                                <Label for="examplePassword">Enter Note here</Label>
                                <Input type="text" name="password"  placeholder="Note" />
                            </FormGroup>

                        
                        </Col>
                        
                    </Row>
                       
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={toggle2}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle2}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            {/* Modal to cancel new test result  */} 
                <Modal isOpen={modal3} toggle={toggle3} className={className} size='lg'>
                    <ModalHeader toggle={toggle3}>Reject Sample </ModalHeader>
                    <ModalBody>
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="4">
                          Test 
                          <br/>
                          <p style={textstyle}>Haemoglobin </p>

                        
                        </Col>
                        <Col xs="4">
                          Sample Test
                          <br/>
                          <p style={textstyle}>Blood</p>
                          
                          </Col>
                        <Col xs="4">
                          Date Of Result
                          <br/>
                          <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"  
                            defaultValue={new Date()} max={new Date()}
                            />            
                          </Col>
                       
                    </Row >
                        <br/>
                        <Form>
                        <Row form>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="exampleEmail">Reason For Rejection</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Not well collected</option>
                                    <option>Mistake on the sample</option>
                                    <option>Not needed</option>
                                   
                                  </Input>
                            </FormGroup>
                            </Col>
                            <Col md={12}>
                            <FormGroup>
                                <Label for="examplePassword">Note</Label>
                                <Input type="text" name="result-received" id="result" placeholder="Result Recieved" />
                            </FormGroup>
                            </Col>
                            
                        </Row>       
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={toggle3}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle3}>Cancel</Button>
                    </ModalFooter>
                </Modal>

             
             {/* End of each Modal popup for each action */}   
    
    </Page>
  )
}

