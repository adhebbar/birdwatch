import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'reactstrap';

import Article from './Article/Article'
import Map from './Map/Map'
import Results from './Results/Results'
import {BrowserRouter as Router, Route} from 'react-router-dom';

import { Provider, useSelector, useDispatch } from "react-redux";
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { fetchBirds, fetchBirdDetails } from './redux/actions'
import rootReducer from './redux/reducers'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

// do any init dispatching here
// maybe get current location thru fetch, then dispatch fetchBirds 
store.dispatch(fetchBirds({lat: 37.751, lng: -97.822, radius: 1})).then(
  () => console.log(store.getState())
)

store.dispatch(fetchBirdDetails('Sturnella magna')).then(
  () => console.log(store.getState())
);

function Home() {
  return (<Row>
            <Col xs="12" md="8"><Map /> </Col>
            <Col xs="12" md="4"><Results/></Col>
          </Row>
  );
}

function App() {
    return (
      <Provider store={store}>
        <div className="appContainer" >
          <div className="ml-5 mb-2" style={{"color":"#FFFFFF"}}><h3><i>Birds are very important!</i></h3></div>
          <Container fluid> 
            <Router>
              <Route exact path="/" component={Home} />
              <Route path="/article" component={Article} />
            </Router>
          </Container>
        </div>
      </Provider>
    );  
}

export default App;
