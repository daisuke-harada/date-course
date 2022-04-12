import { DateSpotNameSearchBar } from "components/organisms/searchs/DateSpotNameSearchBar";
import { DateSpotSortSearchBar } from "components/organisms/searchs/DateSpotSortSearchBar";
import { UserNameSearchBar } from "components/organisms/searchs/UserNameSearchBar";
import { DateSpots } from "components/templates/dateSpots/DateSpots";
import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { useParams } from "react-router-dom";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

export const Show: VFC = memo(() => {
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<Array<AddressAndDateSpotJoinData>>([]);
  const { id } = useParams();

  useEffect(() => {
    client.get(`prefectures/${id}`).then(response => {
      setAddressAndDateSpots(response.data.addressAndDateSpots);
    })
  }, [id]);

  return(
    <div className='w-full flex'>
      <div className='md:block hidden w-3/12 p-5'>
        <DateSpotSortSearchBar
          defaultPrefectureValue={`${id}`}
          defaultGenreValue=''
          defaultBusinessTimeValue=''
        />
        <DateSpotNameSearchBar />
        <UserNameSearchBar />
      </div>
      <div className='md:w-9/12 w-full p-5'>
        <DateSpots addressAndDateSpots={addressAndDateSpots} prefectureId={`${id}`} />
      </div>
    </div>
  );
});