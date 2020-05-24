import { Container, Row, Col } from 'reactstrap';
import { Collapse, CardBody, Card, CardHeader } from 'reactstrap';
import {useSelector} from 'react-redux';
import React, { useState } from 'react';
import ArticlePreview from '../Article/ArticlePreview'

function Results() {
    // to-do: find MATCHING location from given location..
    // to-do: store CURRENT location ..
    const cards = useSelector(state => state.locations ? state.locations[0].birds.items : []) || [];
    const isFetching = useSelector(state => 
      (state.locations ? state.locations[0].birds.isFetching : false)
    );
    const [collapse, setCollapse] = useState(0);

    var toggle = function (e) {
        let event = e.target.dataset.event;
        setCollapse ( collapse === Number(event) ? 0 : Number(event) );
    };

    return (
      <Container fluid style= {{"padding":"0px","borderRadius": "3px","overflow-y": "auto", "width": "100%","height": "800px", "backgroundColor": "rgba(255,255,255)"}}>
        <div className={"text-center " + (isFetching || !cards.length ? "pt-3" : "")}>
          {isFetching ? 'Loading...' : ''}
          {!cards.length && !isFetching ? 'No birds found for this area!' : ''}
        </div>
        {cards.map((bird, index) => {
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