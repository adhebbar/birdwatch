import { Container, Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import { GoogleMap, LoadScript,useGoogleMap,Marker } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { setCenter } from '../redux/actions'

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: "10px"
};

var center = {
  lat: -3.745,
  lng: -38.523
};


function RecenterComponent(){
  const map = useGoogleMap()
  console.log("yes")
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (map) {
      map.addListener('center_changed', function() {
        console.log(map.getCenter()) // zoom_changed
        console.log(map.getCenter().lat())
        console.log(map.getCenter().lng())
        dispatch(setCenter({lat: map.getCenter().lat(), lng: map.getCenter().lng()}))
      });
    }
  },[map])

  return null
}

function MyComponents(){
  
  function boundsCallBack()  {
    }

    return (
      <LoadScript
        googleMapsApiKey="AIzaSyDwRk43Y4b1iJkQ1x-TIRCozqnMUyydC9Q"
      >
        
        <GoogleMap

          mapContainerStyle={containerStyle}
          center={center}
          zoom={3}
          onBoundsChanged = {() => console.log("bounds changed")}
          onCenterChanged = {() => RecenterComponent}
        >
          <RecenterComponent/>
          { /* Child components, such as markers, info windows, etc. */ }
          <></> */}
        </GoogleMap>
      </LoadScript>
    )
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