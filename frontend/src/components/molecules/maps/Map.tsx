import { memo, useState, VFC } from "react";
import { GoogleMap, LoadScript, InfoWindow, Marker} from "@react-google-maps/api";
import { AddressResponseData } from "types/dateSpots/response";

type Props = {
  address: AddressResponseData
  dateSpotName: string,
};

type Center = {
  lat: number,
  lng: number,
}

export const Map: VFC<Props> = memo((props) => {
  const {address, dateSpotName} = props;
  const [size, setSize] = useState<undefined | google.maps.Size>(undefined);

  const center: Center = {
    lat: address.latitude,
    lng: address.longitude,
  };

  const InfoWindowOptions = {
    pixelOffset: size,
  };

  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };

  return(
    <div className="h-full w-full px-5 m-auto" >
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''} onLoad={() => createOffsetSize()} >
        <GoogleMap mapContainerClassName='w-full md:h-full h-96 rounded-2xl' center={center} zoom={17}>
          <Marker position={center} />
          <InfoWindow position={center} options={InfoWindowOptions}>
            <div className='bg-white text-size'>
              <h1>{dateSpotName}</h1>
              <p>{address.cityName}</p>
              <a href={`https://maps.google.co.jp/maps?q=${address.cityName}&iwloc=J`} target="_blank" rel="noopener noreferrer">Googleマップで見る</a>
            </div>
          </InfoWindow>
        </GoogleMap>
      </LoadScript>
    </div>
  );
});