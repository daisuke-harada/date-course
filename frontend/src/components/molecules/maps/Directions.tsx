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
  // 指定された出発地、目的地、およびオプションの経由地に基づいてルートを計算します。
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  // ルート案内の結果を地図上に描画する役割
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  // ルート案内の結果を保持
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

  useEffect(() => {
    console.log(`${managementCourse.dateSpots} 経由地作成`)
    if (managementCourse.dateSpots.length > 2) {
      const copyCourses = managementCourse.dateSpots.slice();
      copyCourses.splice(0, 1);
      copyCourses.splice(copyCourses.length - 1, 1);
      setTransitPoints(copyCourses.map((course) => ({
        location: { lat: course.latitude, lng: course.longitude },
        stopover: true
      })));
    }
  }, [managementCourse.dateSpots]);

  // DirectionsServiceとDirectionsRendererを初期化する。
  useEffect(() => {
    console.log(`${managementCourse.dateSpots} 初期化`)
    if (!routesLibrary || !map) return;
    // routeLibraryからDirectionsServiceを作成
    const service = new routesLibrary.DirectionsService();
    // routeLibraryからDirectionsRendererを作成
    const renderer = new routesLibrary.DirectionsRenderer({ map });
    setDirectionsService(service);
    setDirectionsRenderer(renderer);
    renderer.setMap(map);  // レンダラーがマップに設定されていることを確認する。
  }, [routesLibrary, map, travelMode, managementCourse.dateSpots]);

  // ルートを計算し、結果をレンダリングしてルート情報をstateに保存します。
  useEffect(() => {
    console.log(`${managementCourse.dateSpots} ルート描画`)
    if (!directionsService || !directionsRenderer) return;
    // ルート情報を計算した、結果を受け取りdirectionsRenderer.setDirectionsで設定している。
    directionsService
      .route({
        origin,
        destination,
        waypoints: transitPoints,
        travelMode: googleMapsTravelMode(travelMode),
        provideRouteAlternatives: false
      })
      .then(response => {
        // 計算結果を設定。
        directionsRenderer.setDirections(response);
        // ルートの線の色を変更する。
        directionsRenderer.setOptions({
          polylineOptions: {
            strokeColor: '#F87171',
            strokeOpacity: 1,
            strokeWeight: 6,
          }
          });
        // ルート情報を取得
        setCurrentDirection(response);

        // 各ルートの距離と時間を抽出し、stateに保存。
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
    // 描画は終わっているので、不要なリソースを消費し続けることを防ぎます。
    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, setLegs, travelMode]);

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