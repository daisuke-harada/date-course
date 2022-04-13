import { memo, useCallback, useEffect, useState, VFC } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { ManagementCourseData } from 'types/managementCourses/management';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';

type Props = {
  managementCourses: ManagementCourseData,
  setLegs: React.Dispatch<React.SetStateAction<{
      duration: string;
      distance: string;
  }[]>>,
  travelMode: string;
};

export const Directions: VFC<Props> = memo((props) => {
  const { managementCourses, setLegs, travelMode } = props;

  // directionsCallbackをデートスポットの情報を入れ替えた際にも変更できるように使用する
  const [copyDuringSpots, setCopyDuringSpots] = useState<AddressAndDateSpotJoinData[]>([]);
  const [copyTravelMode, setCopyTravelMode] = useState<string>('');
  const origin = { lat: managementCourses.courseDuringSpots[0].latitude, lng: managementCourses.courseDuringSpots[0].longitude};
  const destination = { lat: managementCourses.courseDuringSpots[managementCourses.courseDuringSpots.length -1].latitude, lng: managementCourses.courseDuringSpots[managementCourses.courseDuringSpots.length -1].longitude};
  const [transitPoints, setTransitPoints] = useState<google.maps.DirectionsWaypoint[] | undefined>(undefined);
  const [currentDirection, setCurrentDirection] = useState<google.maps.DirectionsResult | null>(null);

  const googleMapsTravelMode = (travelMode: string) => {
    if(travelMode === 'DRIVING'){
      return google.maps.TravelMode.DRIVING;
    }else if(travelMode === 'BICYCLING'){
      return google.maps.TravelMode.BICYCLING
    }else if(travelMode === 'WALKING'){
      return google.maps.TravelMode.WALKING;
    }else{
      return google.maps.TravelMode.DRIVING;
    };
  };

  const directionsCallback = useCallback((googleResponse) => {
    if (googleResponse) {
      if (currentDirection) {
        if (
          googleResponse === 'OK' &&
          currentDirection.geocoded_waypoints && googleResponse.geocoded_waypoints.length !== currentDirection.geocoded_waypoints.length
        ) {
          // ルートが変更されたのでstateを更新する
          setCurrentDirection(googleResponse);
        } else if(copyDuringSpots !== managementCourses.courseDuringSpots || copyTravelMode !== travelMode){
          // デートスポットの順番が入れ替えられたためstateを更新する
          setCurrentDirection(googleResponse);
          setCopyTravelMode(travelMode);
          setCopyDuringSpots(managementCourses.courseDuringSpots);
        }
      } else {
        if (googleResponse.status === 'OK') {
          // 現在設定されているデートスポットのコピーを作成する。そうすることでデートスポットの順番が入れ替わった際にもステートを更新できるようにする。
          setCopyDuringSpots(managementCourses.courseDuringSpots);
          setCopyTravelMode(travelMode);
          // 初めてルートが設定されたのでステートを更新する。
          setCurrentDirection(googleResponse);
        }
      }
    }
    const legTexts = googleResponse.routes[0].legs.map((leg: google.maps.DirectionsLeg) => ({distance: leg.distance?.text, duration: leg.duration?.text}));
    setLegs(legTexts);
  }, [currentDirection, managementCourses.courseDuringSpots, copyDuringSpots, setLegs, copyTravelMode, travelMode]);


  useEffect(() => {
    if(managementCourses.courseDuringSpots.length > 2){
      const copyCourses = managementCourses.courseDuringSpots.slice();
      copyCourses.splice( 0, 1);
      copyCourses.splice(copyCourses.length - 1, 1);
      // stopoverをtrueにすることで寄り道して行くことになる
      setTransitPoints(copyCourses.map((course)=>({location: new google.maps.LatLng(course.latitude, course.longitude), stopover: true})));
    }
  }, [managementCourses.courseDuringSpots]);

  return(
    <GoogleMap mapContainerClassName='w-full md:h-full h-96 rounded-2xl' zoom={17} >
      <DirectionsService
        options={{
          origin: origin,
          destination: destination,
          travelMode: googleMapsTravelMode(travelMode),
          waypoints: transitPoints,
        }}
        callback={directionsCallback}
      />
      {currentDirection !== null && (
        <DirectionsRenderer
          options={{
            directions: currentDirection,
            polylineOptions: {
              strokeColor: '#F87171',
              strokeOpacity: 1,
              strokeWeight: 6
            }
          }}
        />
      )}
    </GoogleMap>
  );
});
