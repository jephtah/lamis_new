
import React from 'react';  
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';  

import Paper from '@material-ui/core/Paper';  

import Table from '@material-ui/core/Table';  

import TableBody from '@material-ui/core/TableBody';  

import TableCell from '@material-ui/core/TableCell';  

import TableContainer from '@material-ui/core/TableContainer';  

import TableHead from '@material-ui/core/TableHead';  

import TablePagination from '@material-ui/core/TablePagination';  

import TableRow from '@material-ui/core/TableRow';    
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {
  FaPencilAlt
} from 'react-icons/fa';
import {
  MdDeleteForever
} from 'react-icons/md';

import axios from 'axios';
import {url} from 'axios/url';
  

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

  

export default function PatientList(props) {  
  const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [data, setData] = useState([]);   
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  
  const apistate = url+"patients";
      useEffect(() => {    
        const GetData = async () => {    
          const result = await axios(apistate);    
          setData(result.data);  
          console.log(result.data);   
        }  
        GetData();     

}, []);   

  const handleChangePage = (event, newPage) => {  

    setPage(newPage);  

  };  

  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value);  
    setPage(0);  
  };  

  
  
  return (  

    <Paper className={classes.root}>  

      <TableContainer className={classes.container}>  

        <Table stickyHeader aria-label="sticky table">  

        <TableHead>  

            <TableRow>  

              <StyledTableCell>Patient ID</StyledTableCell>  

              <StyledTableCell align="center">Patient Name</StyledTableCell>  

              <StyledTableCell align="center">Phone Number</StyledTableCell>  

              <StyledTableCell align="center">Age </StyledTableCell>  

              <StyledTableCell align="center">Action</StyledTableCell>  

 

            </TableRow>  

          </TableHead>  

          <TableBody>  

            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
              return (  

                <StyledTableRow >  

                      <TableCell component="th" scope="row" align="left">  

                        {row.id}  

                      </TableCell>  
                      <TableCell align="center">{row.firstName} {' '} {row.lastName}</TableCell>  

                      <TableCell align="center">{row.mobilePhoneNumber}</TableCell>  

                      <TableCell align="center">{row.dob}</TableCell>  

                      <TableCell align="center">
                       
                      <Link to={"/edit-patient/"+row.id}>
                          <Tooltip title="Edit Patient">
                            <IconButton aria-label="Collect Sample" >
                              <FaPencilAlt size={20}/>
                            </IconButton>
                           
                          </Tooltip>
                        </Link>  
                          <Tooltip title="Achieve Patient">
                            <IconButton aria-label="Collect Sample">
                              < MdDeleteForever
                              size={20} />
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

    </Paper>  

  );  

} 