import { Container, Row, Col } from 'reactstrap';
import { Collapse, CardBody, Card, CardHeader } from 'reactstrap';
import {useSelector} from 'react-redux';
import React, { useState } from 'react';

function Results() {
    // to-do: find MATCHING location from given location..
    // to-do: store CURRENT location ..
    const cards = useSelector(state => state.locations ? state.locations[0].bird.items : []) || [];
    const [collapse, setCollapse] = useState(0);

    var toggle = function (e) {
        let event = e.target.dataset.event;
        setCollapse ( collapse === Number(event) ? 0 : Number(event) );
    };

    return (
      <Container fluid style= {{"padding":"0px","width": "100%","height": "800px", "backgroundColor": "rgba(0,255,0,0.5)"}}>
        {cards.map((bird, index) => {
          console.log(bird);
          return (
            <Card key={index}>
              <CardHeader onClick={toggle} data-event={index}>{bird.comName}</CardHeader>
              <Collapse isOpen={collapse === index}>
                <CardBody>Bird Article preview here,
                          which should be a new component that gets
                          passed in the bird to display any data, make more fetches, etc.. example:
                          <br/> Scientific name: {bird.sciName}
                          <br/> This little boy was last seen in: {bird.locName} 
                          <br/> {bird.locationPrivate ? "This is a private location, but here's some surrounding areas!" : "This is a public location!"}
                </CardBody>
              </Collapse>
            </Card>
          )
        })}  
      </Container> 
    );  
  }

export default Results;