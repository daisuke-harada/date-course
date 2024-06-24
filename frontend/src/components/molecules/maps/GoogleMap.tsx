import { memo, useState, FC } from 'react';
import { Marker, AdvancedMarker, Pin, Map, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
// import { InfoWindow } from '@react-google-maps/api';

type Props = {
  addressAndDateSpot: AddressAndDateSpotJoinData
};

type Center = {
  lat: number,
  lng: number,
}

export const GoogleMap: FC<Props> = memo((props) => {
  const { addressAndDateSpot } = props;
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();


  const center: Center = {
    lat: addressAndDateSpot.latitude,
    lng: addressAndDateSpot.longitude,
  };

  return (
    <Map
      mapId={String(addressAndDateSpot.id)}
      defaultZoom={20}
      defaultCenter={center}
      gestureHandling={'greedy'}
      disableDefaultUI
    >
      <AdvancedMarker
        ref={markerRef}
        position={center}
        title={'AdvancedMarker with customized pin.'}
        clickable={true}
        onClick={() => setInfowindowOpen(!infowindowOpen)}
      >
        <Pin
          background={'rgb(252 165 165)'}
          borderColor={'rgb(248 113 113)'}
          glyphColor={'rgb(239 68 68)'}>
        </Pin>
      </AdvancedMarker>
      {  infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={300}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          {addressAndDateSpot.cityName}
        </InfoWindow>
      )}
    </Map>
  );
});
