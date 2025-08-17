import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import './MapPage.css';

// 한양대 에리카 캠퍼스 좌표
const HANYANG_ERICA = { lat: 37.29644017218779, lng: 126.83516599926162 };

const MapPage: React.FC = () => {
  return (
    <div className="page">
      <div className="page-content">
        <Map
          center={HANYANG_ERICA}
          style={{ width: "100%", height: "100%" }}
        >
          <MapMarker position={HANYANG_ERICA}>
            <div style={{color:"#000"}}>한양대 에리카캠퍼스</div>
          </MapMarker>
        </Map>
      </div>
    </div>
  );
};

export default MapPage;
