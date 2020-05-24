import { Container, Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import { GoogleMap, LoadScript,useGoogleMap,Marker ,Circle} from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { setCenter , setZoom, fetchBirds} from '../redux/actions'

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
  const dispatch = useDispatch() 
  const zoom = useSelector(state => state.zoom)
  const center = useSelector(state => state.center)

  React.useEffect(() => {
    if (map) {
      map.addListener('center_changed', function() {
        console.log(map.getCenter()) 
        console.log(map.getCenter().lat())
        console.log(map.getCenter().lng());
        let newLng = map.getCenter().lng();
        let newLat = map.getCenter().lat();
        if (Math.abs(center.lat - newLat) > 1.0 || Math.abs(center.lng - newLng) > 1.0) {
          dispatch(setCenter({lat: map.getCenter().lat(), lng: map.getCenter().lng()}));
          dispatch(fetchBirds({lat: newLat, lng: newLng, zoom:zoom}));
        }
      });
      // map.addListener('zoom_changed', function() {
      //   // zoom in kilometers
      //   var kms = 100*(map.getBounds().getNorthEast().lat() - map.getBounds().getSouthWest().lat())
      //   // console.log(kms)
      //   let newLng = map.getCenter().lng();
      //   let newLat = map.getCenter().lat();
      //   dispatch(setZoom(kms))
      //   dispatch(fetchBirds({lat: newLat, lng: newLng(), zoom:kms}))
      // });
    }
  },[map])

  return null
}

function MyComponents(props){
  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  const center = useSelector(state => state.center)

  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
  }

  const onLoadc = circle => {
    console.log('Circle onLoad circle: ', circle)
  }
  
  const onUnmount = circle => {
    console.log('Circle onUnmount circle: ', circle)
  }
  
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyDwRk43Y4b1iJkQ1x-TIRCozqnMUyydC9Q"
      >
        
        <GoogleMap

          mapContainerStyle={containerStyle}
          center={{lat:0,lng:0}}
          zoom={3}
        >
          <RecenterComponent/>
          <Marker
            onLoad={onLoad}
            position={{lat:center.lat,lng:center.lng}}
          /> 

          <Circle 
              // optional
              onLoad={onLoadc}
              // optional
              onUnmount={onUnmount}
              // required
              center={{lat:parseFloat(center.lat), lng:parseFloat(center.lng)}}
              // required
              options={options}
            />
        </GoogleMap>
      </LoadScript>
    )
  }


function Map() {
  return (
    <Container fluid
              style={{"padding":"0px","width": "100%","height": "800px", 
                              "backgroundColor": "rgba(255,0,0,0.1)",
                              height: '800px'}}>
      <MyComponents/>
    </Container> 
  );  
}
  
export default Map;