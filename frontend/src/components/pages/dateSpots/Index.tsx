import { DateSpots } from "components/templates/dateSpots/DateSpots";
import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

export const Index: VFC = memo(() => {
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<Array<AddressAndDateSpotJoinData>>([]);

  useEffect(() => {
    client.get('date_spots').then(response => {
      setAddressAndDateSpots(response.data.addressAndDateSpots);
    })
  }, []);

  return(
    <DateSpots addressAndDateSpots={addressAndDateSpots} defaultPrefectureValue='' defaultGenreValue='' defaultBusinessTimeValue='' />
  );
});