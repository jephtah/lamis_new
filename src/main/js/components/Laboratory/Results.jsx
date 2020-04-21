import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {
    FaEye, FaPrint
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
    width:200,
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


export default function Result() {
  const classes = useStyles();

  return ( 
      <TableContainer component={Paper}>                
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Lab Number</TableCell>
              <TableCell align="center">Patient ID</TableCell>
              <TableCell align="center">Phone Name</TableCell>
              <TableCell align="center">Date Collected</TableCell>
              <TableCell align="center">Sample </TableCell>
              <TableCell align="center">Result</TableCell>
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
                  <TableCell align="center">6</TableCell>
                  <TableCell align="center">12</TableCell>
                  <TableCell align="center">
                    <Link to="/view-result">
                        <Tooltip title="View Collected Sample">
                            <IconButton aria-label="View Collected Sample">
                            <FaEye size="15"/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Link to="/collect-sample">
                        <Tooltip title="Print Collected Sample">
                            <IconButton aria-label="Print Collected Sample">
                            <FaPrint size="15"/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     
  );
}