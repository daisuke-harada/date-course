import { memo, useEffect, useState, FC } from 'react';
import { Map, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

import { ManagementCourseData } from 'types/managementCourses/management';

type Props = {
  managementCourse: ManagementCourseData,
  setLegs: React.Dispatch<React.SetStateAction<{
      duration: string;
      distance: string;
  }[]>>,
  travelMode: string;
};

export const Directions: FC<Props> = memo((props) => {
  const { managementCourse, setLegs, travelMode } = props;

  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [currentDirection, setCurrentDirection] = useState<google.maps.DirectionsResult | null>(null);

  const origin = { lat: managementCourse.dateSpots[0].latitude, lng: managementCourse.dateSpots[0].longitude };
  const destination = { lat: managementCourse.dateSpots[managementCourse.dateSpots.length - 1].latitude, lng: managementCourse.dateSpots[managementCourse.dateSpots.length - 1].longitude };
  const [transitPoints, setTransitPoints] = useState<google.maps.DirectionsWaypoint[] | undefined>(undefined);

  const googleMapsTravelMode = (travelMode: string) => {
    switch (travelMode) {
      case 'DRIVING':
        return google.maps.TravelMode.DRIVING;
      case 'BICYCLING':
        return google.maps.TravelMode.BICYCLING;
      case 'WALKING':
        return google.maps.TravelMode.WALKING;
      default:
        return google.maps.TravelMode.DRIVING;
    }
  };

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    const service = new routesLibrary.DirectionsService();
    const renderer = new routesLibrary.DirectionsRenderer({ map });
    setDirectionsService(service);
    setDirectionsRenderer(renderer);
    renderer.setMap(map);  // Ensure the renderer is set to the map
  }, [routesLibrary, map, travelMode, managementCourse.dateSpots]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin,
        destination,
        travelMode: googleMapsTravelMode(travelMode),
        waypoints: transitPoints,
        provideRouteAlternatives: false
      })
      .then(response => {
        directionsRenderer.setDirections(response);

        // ルートの線の色を変更する。
        directionsRenderer.setOptions({
          polylineOptions: {
            strokeColor: '#F87171',
            strokeOpacity: 1,
            strokeWeight: 6,
          }
        });

        setCurrentDirection(response);
        const legTexts = response.routes[0].legs.map(
          (leg: google.maps.DirectionsLeg) => (
            {
              distance: leg.distance?.text || '',  // 距離
              duration: leg.duration?.text || ''   // 時間
            }
          )
        );
        setLegs(legTexts);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, setLegs, travelMode]);

  useEffect(() => {
    if (managementCourse.dateSpots.length > 2) {
      const copyCourses = managementCourse.dateSpots.slice();
      copyCourses.splice(0, 1);
      copyCourses.splice(copyCourses.length - 1, 1);
      setTransitPoints(copyCourses.map((course) => ({ location: new google.maps.LatLng(course.latitude, course.longitude), stopover: true })));
    }
  }, [managementCourse.dateSpots]);

  return (
    <Map
      gestureHandling={'greedy'}
      fullscreenControl={false}
    >
      {currentDirection && (
        <>
          <p>合計距離: {(currentDirection.routes[0].legs.reduce((total, leg) => total + (leg.distance?.value || 0), 0) / 1000).toFixed(1)} km</p>
          <p>合計時間: {(currentDirection.routes[0].legs.reduce((total, leg) => total + (leg.duration?.value || 0), 0) / 60).toFixed(1)} 分</p>
        </>
      )}
    </Map>
  );
});