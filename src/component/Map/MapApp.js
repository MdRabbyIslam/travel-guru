import React from 'react';
import { withScriptjs } from "react-google-maps";
import MyMap from './MyMap';

const MapApp = () => {
    const MapLoader = withScriptjs(MyMap);

    return (
        <div>
            <MapLoader
                googleMapURL="https://maps.googleapis.com/maps/api/js?key="
                loadingElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
};

export default MapApp;