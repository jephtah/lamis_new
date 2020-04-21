import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Col,
  FormGroup,
  Row,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import Chip from '@material-ui/core/Chip';
import CreatableSelect from 'react-select/creatable';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  chiproot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
},
chip: {
    margin: theme.spacing(0.5),
},
}));

export const allergies = [
  { value: 'penicilin', label: 'Penicilin' },
  { value: 'egg', label: 'Egg' },
  { value: 'milk', label: 'Milk' },
  { value: 'peanut', label: 'Peanut'},
];

export default function PatientAlert(props ) {
  const classes = useStyles(props);
  const handleChange = (newValue: any, actionMeta: any) => {
    props.setNewAllergy(newValue ? newValue.map(it => it.value) : []);    
  };
  return (

            <Card >
              <CardHeader>Allergies</CardHeader>
                    <CardBody>
                        
                                    
                                      {props.patientAllergies ? props.patientAllergies.map((allergy, index) => (
                                    <Chip
                                          label={allergy}
                                          color="secondary"
                                          variant="outlined"
                                      />
                                      )) : <Chip
                                      label="No Allergy"
                                      color="secondary"
                                      variant="outlined"
                                  />}
                                      
                            <br></br>
                            {props.addstatus && 
                      <Row form>
                         <Col md={12}>
                                            <FormGroup>
                                            <CreatableSelect
        isMulti
        onChange={handleChange}
        options={allergies}
        placeholder="Add New Allergy"
      />
                                        
                                            </FormGroup>
                                            </Col>
                                           
                                        </Row>

                            
                            }                            
                    </CardBody>                      
            </Card>
  );
}