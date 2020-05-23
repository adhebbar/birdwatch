import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import Map from './Map/Map'
import Results from './Results/Results'

function App() {
    return (
      <div class="appContainer" >
        <Container fluid> 
        {/* // todo: a smart container that makes API calls and passes data to page props */}
          <Row>
            <Col xs="8" ><Map/> </Col>
            <Col xs="4" ><Results/></Col>
          </Row>
        </Container>
      </div>
    );  
}

export default App;
