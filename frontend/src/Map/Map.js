import { Container, Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: "10px"
};

var center = {
  lat: -3.745,
  lng: -38.523
};

class MyComponents extends Component {
  render() {
    console.log(center);
    return (
      <LoadScript
          googleMapsApiKey="AIzaSyDwRk43Y4b1iJkQ1x-TIRCozqnMUyydC9Q">
          <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={3}
          >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
          </GoogleMap>
      </LoadScript>
    )
  }
}


function Map() {
    return (
      <Container fluid style= {{"padding":"0px","width": "100%","height": "800px", 
                                "backgroundColor": "rgba(255,0,0,0.1)",
                                height: '800px'}}>
        <MyComponents/>
      </Container> 
    );  
  }
  
export default Map;