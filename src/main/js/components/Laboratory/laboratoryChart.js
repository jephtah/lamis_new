import React from 'react';
import { Card, CardHeader,CardBody, CardDeck} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import {
    ViralLoad,Weight
  } from '../../demos/patientVIral';
export default function laboratoryCharts (props ) {
  return (

    
            <CardDeck>
                <Card >
                    
                    <CardHeader> Blood Pressure</CardHeader>
                        <CardBody>
                        
                        <Line data={Weight({ fill: false }, { fill: false })} height={100} />                      
                        </CardBody>                      
                        </Card>
                        <Card >
                        <CardHeader> Weight</CardHeader>
                            <CardBody>
                            <Line data={ViralLoad({ fill: false }, { fill: false })} height={100} />                      
                            </CardBody>                      
                    </Card>
                    <Card >
                        <CardHeader> Viral Load</CardHeader>
                            <CardBody>
                            <Line data={ViralLoad({ fill: false }, { fill: false })} height={100} />                      
                            </CardBody>                      
                    </Card>
                </CardDeck>
                
    );
}