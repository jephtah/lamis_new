import React from 'react';
import {
    Card,
    Col,
    Row,
    CardBody,
} from 'reactstrap';
import TestOrderList from './PatientSearch';



export default function TestOrderMain (props) {
  
    return (

            <Row>
            <Col xl={12} lg={12} md={12}>
                
                <Card>
                    <CardBody>
                    <TestOrderList />
                    </CardBody>
                </Card>
            </Col>
            </Row>

    );
}