import { Container, Row, Col } from 'reactstrap';
import React, { Component, useState } from 'react';
import { GoogleMap, Circle, LoadScript,useGoogleMap,Marker } from '@react-google-maps/api';
import { useDispatch, useSelector} from 'react-redux';
import { setCenter, fetchBirds } from '../redux/actions'

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: "10px"
};

var center = {
  lat: -3.745,
  lng: -38.523
};

<<<<<<< HEAD

function RecenterComponent(){
  const map = useGoogleMap()
=======
function RecenterComponent(props){
  const map = useGoogleMap()
  const center = useSelector(state => state.center);
  console.log("yes")
  const dispatch = useDispatch()
>>>>>>> nobugs

  React.useEffect(() => {
    if (map) {
      map.addListener('center_changed', function() {
        console.log(map.getCenter()) // zoom_changed
        console.log(map.getCenter().lat())
        console.log(map.getCenter().lng())
        dispatch(setCenter({lat: map.getCenter().lat(), lng: map.getCenter().lng()}))
        dispatch(fetchBirds({lat: map.getCenter().lat(), lng: map.getCenter().lng()}))
        if (Math.abs(center.lat - map.getCenter().lat()) > 1.0 || Math.abs(center.lng - map.getCenter().lng()) > 1.0) {
          props.setLocalCenter({lat: map.getCenter().lat(), lng: map.getCenter().lng()});
        }
      });
    }
  },[map])

  return null
}

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

function MyComponents(){
  const [localCenter, setLocalCenter] = useState({lat:0, lng:0});
  function boundsCallBack()  {
    }

    return (
      <LoadScript googleMapsApiKey="AIzaSyDwRk43Y4b1iJkQ1x-TIRCozqnMUyydC9Q">
        
        <GoogleMap

          mapContainerStyle={containerStyle}
          center={center}
          zoom={3}
          onBoundsChanged = {() => console.log("bounds changed")}
          onCenterChanged = {() => console.log('OK')}
        >
          <RecenterComponent setLocalCenter={setLocalCenter} />
          { /* Child components, such as markers, info windows, etc. */ }
          <></> */}
          <Marker
            position={{lat:localCenter.lat,lng:localCenter.lng}}
          />
          <Circle 
              // required
              center={{lat:parseFloat(localCenter.lat), lng:parseFloat(localCenter.lng)}}
              // required
              options={options}
            />
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