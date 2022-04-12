import { DateSpotNameSearchBar } from "components/organisms/searchs/DateSpotNameSearchBar";
import { DateSpotSortSearchBar } from "components/organisms/searchs/DateSpotSortSearchBar";
import { UserNameSearchBar } from "components/organisms/searchs/UserNameSearchBar";
import { DateSpots } from "components/templates/dateSpots/DateSpots";
import { IndexLayout } from "components/templates/IndexLyouts";
import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { useParams } from "react-router-dom";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

export const Show: VFC = memo(() => {
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<Array<AddressAndDateSpotJoinData>>([]);
  const { id } = useParams();

  useEffect(() => {
    client.get(`genres/${id}`).then(response => {
      setAddressAndDateSpots(response.data.addressAndDateSpots);
    })
  }, [id]);

  return(
    <IndexLayout
      sideArea={
        <>
          <DateSpotSortSearchBar
            defaultPrefectureValue=''
            defaultGenreValue={`${id}`}
            defaultBusinessTimeValue=''
          />
          <DateSpotNameSearchBar />
          <UserNameSearchBar />
        </>
      }
      centerArea={<DateSpots addressAndDateSpots={addressAndDateSpots} genreId={`${id}`} />}
    />
  );
});