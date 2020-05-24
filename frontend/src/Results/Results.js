import { Container, Row, Col } from 'reactstrap';
import { Collapse, CardBody, Card, CardHeader } from 'reactstrap';
import {useSelector} from 'react-redux';
import React, { useState } from 'react';
import ArticlePreview from '../Article/ArticlePreview'

function Results() {
    // to-do: find MATCHING location from given location..
    // to-do: store CURRENT location ..
    const cards = useSelector(state => state[0].birds.items) || [];
    const [collapse, setCollapse] = useState(0);

    var toggle = function (e) {
        let event = e.target.dataset.event;
        setCollapse ( collapse === Number(event) ? 0 : Number(event) );
    };

    return (
      <Container fluid style= {{"padding":"0px","borderRadius": "10px", "overflow-y": "auto", "width": "100%","height": "800px", "backgroundColor": "rgba(0,255,0,0.5)"}}>
        {cards.map((bird, index) => {
          // console.log(bird);
          return (
            <Card key={index}>
              <CardHeader onClick={toggle} data-event={index}>{bird.comName}</CardHeader>
              <Collapse isOpen={collapse === index}>
                <CardBody>
                  <ArticlePreview bird={bird}/>
                </CardBody>
              </Collapse>
            </Card>
          )
        })}  
      </Container> 
    );  
  }

export default Results;