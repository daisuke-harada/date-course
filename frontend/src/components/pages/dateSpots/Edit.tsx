import { memo, VFC } from 'react';
import { useLocation } from 'react-router-dom';

import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { DateSpotForm } from 'components/templates/dateSpots/DateSpotForm';

export const Edit: VFC = memo(() => {
  const location = useLocation();
  const state = location.state as {addressAndDateSpot: AddressAndDateSpotJoinData};
  const addressAndDateSpot = state.addressAndDateSpot;

  return(
    <DateSpotForm
      dateSpotFormTitle='デートスポット情報の編集'
      formButtonName='更新'
      nameDefaultValue={addressAndDateSpot.dateSpot.name}
      prefectureDefaultValue={addressAndDateSpot.prefectureName}
      cityNameDefaultValue={addressAndDateSpot.cityName}
      genreDefaultValue={addressAndDateSpot.dateSpot.genreId.toString()}
      openingTimeDefaultValue={
        (addressAndDateSpot.dateSpot.openingTime
        && addressAndDateSpot.dateSpot.openingTime.toString())
        || ''
      }
      closingTimeDefaultValue={
        (addressAndDateSpot.dateSpot.closingTime
        && addressAndDateSpot.dateSpot.closingTime.toString())
        || ''
      }
      dateSpotId={addressAndDateSpot.dateSpot.id}
   />
  );
});