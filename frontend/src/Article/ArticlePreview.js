import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap';

function ArticlePreview(props) { 
    // bird acquired from props
    // pic, whatever else acquired from another api (????)
    // want to make link to send user to full article
    let bird = props.bird;

    return (
        <Row>
            <Col xs={6}>
                <p><h5>Scientific name:</h5> {bird.sciName}</p>
                <p><h5>Last seen in:</h5> {bird.locName}</p>
            </Col>
            <Col xs={6}>
                <img src=""></img>
            </Col>
            <Col xs={6} style={{'marginTop':'6px'}}>
                {bird.locationPrivate ? "This is a private location, but we'll show you some surrounding areas" : "This is a public location"}
            </Col>
            <Col xs={6} className="text-right d-flex justify-content-end align-items-end">
                <Button color="primary">Learn more</Button>
            </Col>
        </Row>
    ) 
}

export default ArticlePreview;