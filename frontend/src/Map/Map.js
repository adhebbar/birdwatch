import { Container, Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import { GoogleMap, LoadScript,useGoogleMap,Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

// function PanningComponent() {
//   const map = useGoogleMap()
//   console.log()
//   return null
// }

// function NewMap(){

//   let mapRef = React.createRef()

//   boundsCallBack = () => {
//       console.log("foo")
//       // console.log(mapRef.current.getInstance())

//   }

//   return (
//       <LoadScript googleMapsApiKey={"AIzaSyDwRk43Y4b1iJkQ1x-TIRCozqnMUyydC9Q"}>
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={3}
//             ref={mapRef}
//             onCenterChanged={(foo) => boundsCallBack}
//           >
            
//           </GoogleMap>
//       </LoadScript>
//   )
// }

function RecenterComponent(){
  const map = useGoogleMap()
  console.log("yes")
  React.useEffect(() => {
    if (map) {
      map.addListener('center_changed', function() {
        console.log(map.getCenter()) // zoom_changed
        console.log(map.getCenter().lat())
        console.log(map.getCenter().lng())
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
      <Container fluid style= {{"padding":"0px","width": "100%","height": "800px", "background-color": "rgba(255,0,0,0.1)"}}>
        <MyComponents/>
      </Container> 
    );  
  }
  
export default Map;