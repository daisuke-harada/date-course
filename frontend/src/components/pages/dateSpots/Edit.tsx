import { DateSpotForm } from 'components/templates/dateSpots/DateSpotForm';
import { memo, VFC } from 'react';
import { useLocation } from 'react-router-dom';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';

export const Edit: VFC = memo(() => {
  const location = useLocation();
  const state = location.state as {addressAndDateSpot: AddressAndDateSpotJoinData};
  const addressAndDateSpot = state.addressAndDateSpot;

  return(
    <DateSpotForm
      dateSpotFormTitle='デートスポット情報の編集'
      formButtonName='更新'
      baseBtnDataE2e='dateSpot-update-button'
      nameDefaultValue={addressAndDateSpot.dateSpot.name}
      prefectureDefaultValue={addressAndDateSpot.prefectureId.toString()}
      cityNameDefaultValue={addressAndDateSpot.cityName}
      genreDefaultValue={addressAndDateSpot.dateSpot.genreId.toString()}
      openingTimeDefaultValue={addressAndDateSpot.dateSpot.openingTime.toString()}
      closingTimeDefaultValue={addressAndDateSpot.dateSpot.closingTime.toString()}
      dateSpotId={addressAndDateSpot.dateSpot.id}
   />
  );
});