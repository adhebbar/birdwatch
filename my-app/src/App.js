import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'reactstrap';

function Map() {
  return (
    <Container fluid style= {{"padding":"0px","width": "100%","height": "800px", "background-color": "rgba(255,0,0,0.1)"}}>
    </Container> 
  );  
}


function Results() {
  return (
    <Container fluid style= {{"padding":"0px","width": "100%","height": "800px", "background-color": "rgba(0,255,0,0.1)"}}>
    </Container> 
  );  
}


function App() {
    return (
      <Container fluid>
        <Row>
          <Col xs="9" ><Map/> </Col>
          <Col xs="3" ><Results/></Col>
        </Row>
      </Container>
    );  
}

export default App;
