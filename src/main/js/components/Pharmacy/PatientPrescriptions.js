import React, { useState, Fragment, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import "./patientPrescriptions.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  fetchPatientPrescriptions,
  updatePrescriptionStatus,
} from "../../actions/pharmacy";
import { connect } from "react-redux";
import { Divider } from "@material-ui/core";

import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: "5rem",
    width: "88%",
  },
});

const color = "#1D4380";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: color,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const textstyle = {
  fontSize: "14px",
  fontWeight: "bolder",
};

const PatientPrescriptions = (props) => {
  const forms = props.location.forms;
  const patientName = props.location.patientName;
  const classes = useStyles();

  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);

  const { className } = props;

  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedTime, setSelectedTime] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedText, setSelectedText] = useState(" ");
  const [quantityDispensed, setQuantityDispensed] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (text) => {
    setSelectedText(text);
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleQuantityChange = () => {
    setQuantityDispensed();
  };
  const handleTextChange = () => {
    setQuantityDispensed();
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDispense = (formData, formId) => {
    formData.prescription_status = 1;
    const updatedData = {
      data: { ...formData },
    };
    props.updatePrescriptionStatus(formId, updatedData);
    console.log(formId);
    setOpen(false);
  };

  useEffect(() => {});

  return (
    <div className="patpres">
      <h2>Pharmacy</h2>
      <Divider variant="middle" />
      <br />
      <br />
      {props.location.forms ? (
        <Fragment>
          <h5>View prescription - 012345678</h5>
          <div className="info_box">
            <p> {patientName} ( 012345678) | 23 years</p>
            <p> Female </p>
          </div>

          <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Dosage</StyledTableCell>
                  <StyledTableCell align="right">
                    Date Prescribed
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Date dispensed
                  </StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                  <StyledTableCell align="right">View Details</StyledTableCell>
                </TableRow>
              </TableHead>
              {forms.map((form) => (
                <TableBody>
                  <TableRow key={form.id}>
                    <TableCell>{form.data.generic_name}</TableCell>
                    <TableCell align="right">{form.data.dosage}</TableCell>
                    <TableCell align="right">
                      {form.data.date_prescribed}
                    </TableCell>
                    <TableCell align="right">
                      {form.data.date_dispensed}
                    </TableCell>
                    <TableCell align="right">
                      {form.data.prescription_status == 0 ? (
                        <button
                          style={{
                            marginTop: "5px",
                            borderRadius: "3px",
                            outline: "none",
                            backgroundColor: "#40b02c",
                            color: "#ffffff",
                          }}
                          onClick={handleClickOpen}
                        >
                          dispense
                        </button>
                      ) : (
                        <button
                          style={{
                            marginTop: "5px",
                            borderRadius: "3px",
                            outline: "none",
                          }}
                          disabled
                        >
                          dispense
                        </button>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <VisibilityIcon onClick={toggle2} />
                    </TableCell>
                  </TableRow>
                  <Modal
                    isOpen={modal2}
                    toggle={toggle2}
                    className={className}
                    size="lg"
                  >
                    <ModalHeader toggle={toggle2}>
                      Prescription Details
                    </ModalHeader>
                    <ModalBody>
                      <Row style={{ marginTop: "20px" }}>
                        <Col xs="12">
                          Drug Name
                          <br />
                          <p style={textstyle}>{form.data.generic_name} </p>
                        </Col>
                        <Col xs="4">
                          Dosage
                          <br />
                          <p style={textstyle}>{form.data.dosage}</p>
                        </Col>
                        <Col xs="4">
                          Unit
                          <br />
                          <p style={textstyle}>{form.data.duration_unit}</p>
                        </Col>
                        <Col xs="4">
                          Frequency
                          <br />
                          <p style={textstyle}>
                            {form.data.dosage_frequency} time(s) daily
                          </p>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "20px" }}>
                        <Col xs="4">
                          Start Date
                          <br />
                          <p style={textstyle}>{form.data.start_date}</p>
                        </Col>
                        <Col xs="12">Additional Information</Col>
                        <hr />
                        <Col xs="4">
                          Instruction
                          <br />
                          <p style={textstyle}>{form.data.comment}</p>
                        </Col>
                        <Col xs="4">
                          Additional Instruction
                          <br />
                          <p style={textstyle}>
                            {form.data.comment ? form.data.comment : "None"}
                          </p>
                        </Col>
                      </Row>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={toggle2}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Dispense Prescription
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Please fill in the details below to dispense{" "}
                        {form.data.generic_name} for {patientName} <br /> Qty
                        Prescribed: 10
                      </DialogContentText>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          margin="normal"
                          id="date-picker-dialog"
                          label="Enter date dispensed"
                          format="MM/dd/yyyy"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                        <br />
                        <br />
                        <KeyboardTimePicker
                          margin="normal"
                          id="time-picker"
                          label="Enter time dispensed"
                          value={selectedTime}
                          onChange={handleTimeChange}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                      <br />
                      <br />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Quantity Dispensed"
                        type="number"
                        value={quantityDispensed}
                        onChange={handleChange}
                      />
                      <br />
                      <br />
                      <TextField
                        margin="dense"
                        id="name"
                        label="Additional Comments"
                        type="text"
                        onChange={handleChange}
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="danger">
                        cancel
                      </Button>
                      <Button onClick={handleDispense} color="primary">
                        save
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        </Fragment>
      ) : (
        <h2 style={{ margin: "auto" }}>No Prescriptions</h2>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    prescriptions: state.pharmacy.patientPrescriptions,
  };
};

export default connect(mapStateToProps, {
  fetchPatientPrescriptions,
  updatePrescriptionStatus,
})(PatientPrescriptions);
