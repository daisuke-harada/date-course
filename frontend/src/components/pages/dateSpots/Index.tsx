import { DateSpotSortSearchBar } from "components/organisms/searchs/DateSpotSortSearchBar";
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
      <div className='w-3/12 p-5'>
        <DateSpotSortSearchBar
          defaultPrefectureValue=''
          defaultGenreValue=''
          defaultBusinessTimeValue=''
        />
      </div>
      <div className='w-9/12 p-5'>
        <DateSpots addressAndDateSpots={addressAndDateSpots} />
      </div>
    </div>
  );
});