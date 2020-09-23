import React from 'react';

import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'

const MyGoogleMap = () => {
  return <GoogleMap defaultZoom={10} defaultCenter={{ lat: 23.684994, lng: 90.356331 }} />
}

const WrappedMyGoogleMap = withScriptjs(withGoogleMap(MyGoogleMap))

const MyMap = (props) => {
  return (
    <div style={{ height: "100vh",width:"100%" }}>
      <WrappedMyGoogleMap
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDNBt0TO9d6LWa_f_s_K84YDSEU6LRF-b8"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />

    </div>
  );
};

export default MyMap;
