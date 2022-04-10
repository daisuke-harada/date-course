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
    <div className='w-full flex'>
      <div className='w-2/12 m-2 bg-black'>
      </div>
      <div className='w-9/12 m-2'>
        <DateSpots addressAndDateSpots={addressAndDateSpots} defaultPrefectureValue='' defaultGenreValue='' defaultBusinessTimeValue='' />
      </div>
    </div>
  );
});