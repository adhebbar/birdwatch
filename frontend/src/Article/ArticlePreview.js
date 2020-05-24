import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import { fetchBirdDetailsIfNeeded } from '../redux/actions';

function ArticlePreview(props) { 
    let bird = props.bird;
    let dispatch = useDispatch();
    dispatch(fetchBirdDetailsIfNeeded(bird.sciName));
    const birdDetails = useSelector(state => (state.birdDetailsByScientificName[bird.sciName] || {}).details) || {};
    return (
        <Row>
            <Col xs={5}>
                <p><h5>Scientific name:</h5> {bird.sciName}</p>
                <p><h5>Last seen in:</h5> {bird.locName}</p>
                <p><h5>Recent observations:</h5> {bird.howMany}</p>
            </Col>
            <Col xs={7} className="pl-0">
                <img src={birdDetails.thumbnail ? birdDetails.thumbnail.source : ''} className="object-fit"></img>
            </Col>
            <Col xs={12} style={{'marginTop':'6px'}}>
                {birdDetails.extract}
            </Col>
            <Col xs={12} className="mt-3 text-right d-flex justify-content-end align-items-end">
                <a href={birdDetails.content_urls ? birdDetails.content_urls.desktop.page : "#"}>Learn more</a>
            </Col>
        </Row>
    ) 
}

export default ArticlePreview;