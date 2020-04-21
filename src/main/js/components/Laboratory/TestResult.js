import React from 'react';
import {
    Card,
    Col,
    Row,
    CardBody,
} from 'reactstrap';
import TestResultList from 'components/Laboratory/TestResultList';


export default function TestOrderMain (props) {
 
    return (

            <Row>
              
              <Col xl={12} lg={12} md={12}>
                <Card>
                    <CardBody>
                      
                      <br/>  
                        <TestResultList />
                    </CardBody>
                </Card>
            </Col>
            </Row>

    );
}