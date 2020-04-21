import React, { useEffect, useState } from "react";

import {useForm } from "react-hook-form";
import {
    FormGroup,
    Label,
    Col,
    Row,
  } from 'reactstrap';
import data2 from "demos/countrystate.json";

function CountryState() {
const { register, watch, setValue } = useForm();
const watchOption1 = watch("option1");

const [dropDownData, setDropDownData] = useState(null);
const [option2Data, setOption2Data] = useState(null);


  useEffect(() => {
      setDropDownData(data2);
  }, []);

  return (
        <div>
        {dropDownData && (
        
           <Row form>
            <Col md={6}>
            <FormGroup>
                <Label for="country">Country</Label>
              <select
                onChange={e => {
                  if (e.target.value) {
                    setOption2Data(
                      dropDownData.countries.find(i => i.country === watchOption1)
                        .states
                    );
                      
                    setValue("option2", "");
                    
                  }
                  setValue("option2", "");
                 
                }}
                id="option1"
                name="option1"
                ref={register}
              >
                <option value="" selected="selected">
                  Select
                </option>
                {dropDownData.countries.map(i => (
                  <option key={i.country} value={i.country}>
                    {i.country}
                  </option>
                ))}
              </select>
              </FormGroup>
              </Col>
          
            <Col md={6}>
            <FormGroup>
                <Label for="state">State</Label>
              <select
                
                id="option2"
                name="option2"
                ref={register}
              >
                <option value="" selected="selected">
                  Select
                </option>
                {option2Data &&
                  option2Data.map(i => (
                    <option key={i} value={i}>
                      {i}
                     
                    </option>
                  )  )
                  
                  }
                  
              </select>
              </FormGroup>
              </Col>
              </Row>
          
        )}
     </div>
  );
}

export default CountryState ;
