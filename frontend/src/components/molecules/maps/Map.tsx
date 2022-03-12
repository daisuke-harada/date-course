import { memo, VFC } from "react";
import GoogleMapReact from "google-map-react";

type Props = {
  latitude: number,
  longitude: number,
};

type MapProps = {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

export const Map: VFC<Props> = memo((props) => {
  const {latitude, longitude} = props;
  const API_KEY: string  = process.env.REACT_APP_GOOGLE_MAP_API_KEY || '';

  const mapProps: MapProps = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 18,
  };

  return(
    <div className="h-full w-full px-5 m-auto" id="map" >
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        center={mapProps.center}
        zoom={mapProps.zoom}
      >
      </GoogleMapReact>
    </div>
  );
});