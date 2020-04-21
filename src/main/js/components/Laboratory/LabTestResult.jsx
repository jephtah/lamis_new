import Page from 'components/Page';
import React from 'react';
import {
    Card,
    Alert,
    Col,
    Row,
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input 
  } from 'reactstrap';
import { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles'; 
import { TiWarningOutline } from "react-icons/ti";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {FaPlusSquare, FaTimesCircle} from 'react-icons/fa';
import {GoChecklist} from 'react-icons/go';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TablePagination from '@material-ui/core/TablePagination';  
 
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';
import { fetchAllLabTestOrder } from "actions/laboratory";
import { connect } from "react-redux";
import ModalSampleVerify from './VerifySample';
import ModalSampleResult from './EnterResult';
import ModalSampleReject from './SampleRejection';

Moment.locale('en');
momentLocalizer();



const useStyles = makeStyles({  
  root: {  
    width: '100%',  
  },  
  container: {  
    maxHeight: 440,  
  }, 
});  
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 11,
  },
}))(TableCell);
const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const LabTestResult = (props) => {
  const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [data, setData] = useState([]);   
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  
    
useEffect(() => {
  props.fetchAllLabTestOrderToday();
}, []); //componentDidMount
const [collectmodal, setcollectmodal] = useState([])
const [modal, setModal] = useState(false);
const togglemodal = () => setModal(!modal)
const [modal2, setModal2] = useState(false);
const togglemodal2 = () => setModal(!modal2)
const [modal3, setModal3] = useState(false);
const togglemodal3 = () => setModal(!modal3)

const toggle = () => setModal(!modal);
const toggle2 = () => setModal2(!modal2);
const toggle3 = () => setModal3(!modal3);
const textstyle = {
    fontSize: '14px',
    fontWeight: 'bolder'
  };
const className =""
const handleChangePage = (event, newPage) => {  

setPage(newPage);  

};  

const handleChangeRowsPerPage = event => {  
setRowsPerPage(+event.target.value);  
setPage(0);  
};  
const handlesample = (sampleval) => {
  setcollectmodal(sampleval);
  setModal(!modal)
 
}
const handleresult = (sampleval) => {
  setcollectmodal(sampleval);
  setModal(!modal2)
 
}
const handlereject = (sampleval) => {
  setcollectmodal(sampleval);
  setModal(!modal3)
 
}


  return (
    <div>     
        
              <Row>          
                <Col sm="12">
                  <Card body>
                      {/* <Form>
                        <ResultSearch />
                      </Form>          
                         */}
                      <br/>
                        <TableContainer component={Paper}>                
                            <Table className={classes.table} aria-label="caption table">
                            <TableHead>
                              
                                <TableRow>
                                <StyledTableCell>Lab Number</StyledTableCell>
                                <StyledTableCell align="center">Patient ID</StyledTableCell>
                                <StyledTableCell align="center">Patient Name</StyledTableCell>
                                <StyledTableCell align="center">Date Collected</StyledTableCell>
                                {/* <StyledTableCell align="center">Sample </StyledTableCell> */}
                                <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {props.patientsTestOrderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
                                return ( 
                                    <StyledTableRow key={row.encounterId}>
                                    <TableCell component="th" scope="row">
                                        {row.hospitalNumber}
                                    </TableCell>
                                    <TableCell align="center">{row.hospitalNumber}</TableCell>
                                    <TableCell align="center">{row.firstName} {' '} {row.lastName}</TableCell>
                                    <TableCell align="center">{row.dateEncounter}</TableCell>
                                    {/* <TableCell align="center">{}</TableCell> */}
                                    
                                    <TableCell align="center">
                                        <Tooltip title="Verify Collected Sample">
                                                
                                                <IconButton aria-label="Verify Sample" onClick={() =>
                                                  handlesample(row.encounterId)}
                                                  >
                                                <GoChecklist size="15" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Enter Result">
                                                <IconButton aria-label="Enter Result" onClick={() =>
                                                  handleresult(row.encounterId)}>
                                                <FaPlusSquare size="15" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Rejected Result">
                                                <IconButton aria-label="Rejected Result" onClick={() =>
                                                  handlereject(row.encounterId)}>
                                                <FaTimesCircle size="15" />
                                                </IconButton>
                                            </Tooltip>
                                    </TableCell>
                                    </StyledTableRow>
                                 );  

                                })}  
                    
                            </TableBody>
                            </Table>
                        </TableContainer> 
                        <TablePagination  

                              rowsPerPageOptions={[5, 10, 15]}  

                              component="div"  

                              count={data.length}  

                              rowsPerPage={rowsPerPage}  

                              page={page}  

                              onChangePage={handleChangePage}  

                              onChangeRowsPerPage={handleChangeRowsPerPage}  

                            />   
                  </Card>
                </Col>
                
              </Row>


              {/* The Modal popup for each action */}
            {/* Modal to view test detail */} 
            <ModalSampleVerify modalstatus={modal} togglestatus={togglemodal} datasample={collectmodal} />
            <ModalSampleResult modalstatus={modal2} togglestatus={togglemodal2} datasample={collectmodal} />
            <ModalSampleReject modalstatus={modal3} togglestatus={togglemodal3} datasample={collectmodal} />

            
            
             {/* End of each Modal popup for each action */} 
       
</div>

  
  );
};

const mapStateToProps = state => {
  //console.log('logging state');
  //console.log(state.laboratory.list);
  return {
    patientsTestOrderList: state.laboratory.list
  };
};

const mapActionToProps = {
  fetchAllLabTestOrderToday: fetchAllLabTestOrder
};

export default connect(mapStateToProps, mapActionToProps)(LabTestResult);

