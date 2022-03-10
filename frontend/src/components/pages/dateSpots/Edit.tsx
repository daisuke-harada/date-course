import { DateSpotForm } from "components/templates/dateSpots/DateSpotForm";
import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AddressResponseData, DateSpotResponseData } from "types/dateSpots/response";

export const Edit: VFC = memo(() => {
  const location = useLocation();
  const state = location.state as {address: AddressResponseData, dateSpot: DateSpotResponseData};
  const address = state.address;
  const dateSpot = state.dateSpot
  return(
    <DateSpotForm
      dateSpotFormTitle="デートスポット情報の編集"
      formButtonName="更新"
      nameDefaultValue={dateSpot.name}
      prefectureDefaultValue={address.prefectureId.toString()}
      cityNameDefaultValue={address.cityName}
      genreDefaultValue={dateSpot.genreId.toString()}
      openingTimeDefaultValue=""
      closingTimeDefaultValue=""
   />
  );
});