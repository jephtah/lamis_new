import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
  Form
} from 'reactstrap'
import { useState , useEffect} from 'react'
import { TiArrowBack } from 'react-icons/ti'
import 'react-datepicker/dist/react-datepicker.css'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'

import {GoChecklist} from 'react-icons/go';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import 'react-widgets/dist/css/react-widgets.css'
//Date Picker
import { DateTimePicker } from 'react-widgets'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import moment from 'moment'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Page from 'components/Page'
import {  fetchById } from '../../actions/patients'
import {  fetchAllLabTestOrderOfPatient } from '../../actions/laboratory'
import ModalSampleVerify from './VerifySample';
import ModalSampleResult from './EnterResult';
import ModalSampleReject from './SampleRejection';
import { useSelector, useDispatch } from 'react-redux';
import PatientDetailCard from 'components/Functions/PatientDetailCard';


Moment.locale('en')
momentLocalizer()

const useStyles2 = makeStyles(theme => ({
  inforoot: {
    width: '100%',
    marging: theme.spacing(5)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    fontWeight: 500
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    alignItems: 'center'
  },
  column: {
    flexBasis: '33.33%'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))
const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
})
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#1D4380',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 11
  }
}))(TableCell)
const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow)

 function CollectSample (props) {
  const classes = useStyles()
  const classes2 = useStyles2()
  const testorder = useSelector(state => state.laboratory.testorder);
  const PatientDetail = useSelector(state => state.patients.patient);
  const dispatch = useDispatch();
  useEffect(() => {
    const personId = props.location.state.getpatientlists.row.hospitalNumber;
    const ecounterId = props.location.state.getpatientlists.row.encounterId;
    dispatch(fetchAllLabTestOrderOfPatient(ecounterId));
    dispatch(fetchById(personId));
  }, [fetchAllLabTestOrderOfPatient,fetchById]); //componentDidMount  
  const data = [testorder]
  const [useData, setUsedata] = useState(data)
  //Get list of test type


  const userInfo = props.location.state.getpatientlists.row

  const { className } = props
  const [checked, setChecked] = useState({id:'', statuscheck:false })
  const [modal, setModal] = useState(false)
  const togglemodal = () => setModal(!modal)
  const [modal2, setModal2] = useState(false)
  const togglemodal2 = () => setModal2(!modal2)
  const [modal3, setModal3] = useState(false);
  const togglemodal3 = () => setModal3(!modal3)
  const [collectmodal, setcollectmodal] = useState([])
  // const [encounterid, setencounterid] = useState('');

  //const [patientrow, setpatientValue] = useState({date_sample_collected:new Date(), sample_collected:''});
  const TodayDate = moment(new Date()).format('DD-MM-YYYY')
  const [patientrow, setpatientValue] = useState({
        date_sample_collected: TodayDate,
        lab_number: '',
  })
  const [collectsample, setCollectsample] = useState({
        dateEncounter: "",
        formData: {},
        formName: "LAB_ORDER_FORM",
        patientId: 0,
        serviceName: "GENERAL_SERVICE",
        visitId: 0
  })
  //const newDate = moment(patientrow.date_sample_collected).format('DD-MM-YYYY');


  const saveColllectSample = e => {
    console.log(patientrow)
    const newDatenow = moment(TodayDate).format('DD-MM-YYYY')

    useData['formData'] = useData
    setUsedata({...useData, formData:{"labtest":useData }})
    console.log(useData)
    toast.warn("Processing Sample ");
    e.preventDefault()
   props.createCollectedSample(collectsample)
 
  }
  const handlelabNumber = e => {
    //  e.preventDefault();
    
    setpatientValue({ ...patientrow, [e.target.name]: e.target.value })
  }
  const handlecollect = e => {
    setChecked({...checked, [e.target.value]: e.target.value})
    
  }
  const handlesample = (sampleval) => {
    setcollectmodal(sampleval);
    setModal(!modal)
   
  }
  const handleresult = (sampleval) => {
    setcollectmodal(sampleval);
    setModal2(!modal2)
   
  }
  const handlereject = (sampleval) => {
    setcollectmodal(sampleval);
    setModal3(!modal3)
   
  }
  

  return (
    <Page title='Sample Verification'>
      <ToastContainer autoClose={2000} />
      <Row>
        <Col>
          <div className={classes2.inforoot}>
          <PatientDetailCard getpatientdetails={ props.location.state }/>  
            </div>
            <br/>
            <Card className="mb-12">
              <CardHeader>Test Order Details {console.log( data[0] )}
              <Link to="/laboratory">
                <Button color="primary" className=" float-right mr-1" >
                        <TiArrowBack/>Go Back
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <br />
              <Row>
                <Col>
                  <Card body>
                     
                    <Form onSubmit={saveColllectSample}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label='caption table'
                      >
                        <TableHead style={{ fontWeight: 'bolder' }}>
                          <TableRow>
                            <StyledTableCell align='center'>
                              Test
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              Sample Type
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              Date Requested
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              Action
                            </StyledTableCell>
                            
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          
                            {data[0].map(row => (
                            
                            <StyledTableRow key={row.id}>
                              <TableCell component='th' scope='row'>
                                {row.data.description ===""?"Null ":row.data.description}
                              </TableCell>
                              <TableCell align='center'>{row.data.sample_type===""?"Null ":row.data.sample_type}</TableCell>
                              <TableCell align='center'>
                              {userInfo.dateEncounter} 
                                {/* date_sample_collected */}
                              </TableCell>
                              
                              <TableCell align="center">
                                        <Tooltip title="Verify Collected Sample">
                                                
                                                <IconButton aria-label="Verify Sample" onClick={() =>
                                                  handlesample(row)}
                                                  >
                                                <GoChecklist size="15" />
                                                </IconButton>
                                            </Tooltip>
                                            {/* <Tooltip title="Enter Result">
                                                <IconButton aria-label="Enter Result" onClick={() =>
                                                  handleresult(row)}>
                                                <FaPlusSquare size="15" />
                                                </IconButton>
                                            </Tooltip> */}
                                            {/* <Tooltip title="Rejected Result">
                                                <IconButton aria-label="Rejected Result" onClick={() =>
                                                  handlereject(row)}>
                                                <FaTimesCircle size="15" />
                                                </IconButton>
                                            </Tooltip> */}
                                    </TableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                   
                    </Form>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ModalSampleVerify modalstatus={modal} togglestatus={togglemodal} datasample={collectmodal} />
      <ModalSampleResult modalstatus={modal2} togglestatus={togglemodal2} datasample={collectmodal} />
      <ModalSampleReject modalstatus={modal3} togglestatus={togglemodal3} datasample={collectmodal} />
      
    </Page>
  )
}


export default CollectSample