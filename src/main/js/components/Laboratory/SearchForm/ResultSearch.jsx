import React from 'react';
import { Form, Input } from 'reactstrap';
import {
    Col,
    Row,
    FormGroup,

  } from 'reactstrap';
import {
MdSearch
} from 'react-icons/md';
import 'react-widgets/dist/css/react-widgets.css';
//Date Picker
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

import MatButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

Moment.locale('en');
momentLocalizer();

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const SearchInput = () => {
    const classes = useStyles();
  return (
        <Form>
        <Row form >

                                <Col md={2} style={{ marginTop: '20px'}}>
                                    <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"  
                                    defaultValue={new Date()} max={new Date()}
                                    />                             
                                </Col>
                                
                                <Col md={2} style={{ marginTop: '20px'}}>
                                    <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"  
                                    defaultValue={new Date()} max={new Date()}
                                    />                             
                                </Col>
                                <Col md={6} style={{ marginTop: '20px'}}>
                                        <Input
                                            type="search"
                                            placeholder="Lab. Number, Patient ID, Hosiptal Number"
                                            className="cr-search-form__input "
                                            name="lab_number"
                                            id="lab_number"
                                           
                                        />                                
                                </Col>
                               
                                <Col md={2} style={{ marginTop: '20px'}}>
                                <FormGroup>
                                    
                                    <MatButton  
                                        type="submit" 
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        startIcon={<MdSearch />}
                                    >
                                        Search
                                    </MatButton>
                                </FormGroup>

                                </Col>
                            </Row>
        </Form>

  );
};

export default SearchInput;
