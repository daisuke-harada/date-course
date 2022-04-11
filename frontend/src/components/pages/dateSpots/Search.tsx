import { DateSpotSortSearchBar } from "components/organisms/searchs/DateSpotSortSearchBar";
import { DateSpotNameSearchBar } from "components/organisms/searchs/DateSpotNameSearchBar";
import { DateSpots } from "components/templates/dateSpots/DateSpots";
import { memo, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";
import { UserNameSearchBar } from "components/organisms/searchs/UserNameSearchBar";

export const Search: VFC = memo(() => {
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<Array<AddressAndDateSpotJoinData>>([]);

  const location = useLocation();
  const state = location.state as {
    addressAndDateSpots: Array<AddressAndDateSpotJoinData>
    prefectureId?: string,
    genreId?: string,
    comeTime?: string,
    dateSpotSearchName?: string
  };

  useEffect(() => {
    setAddressAndDateSpots(state.addressAndDateSpots);
  }, [state.addressAndDateSpots]);

  return(
    <div className='w-full flex'>
      <div className='w-3/12 p-5'>
        <DateSpotSortSearchBar
          defaultPrefectureValue={state.prefectureId || ''}
          defaultGenreValue={state.genreId || ''}
          defaultBusinessTimeValue={state.comeTime || ''}
        />
        <DateSpotNameSearchBar
          defaultDateSpotName={state.dateSpotSearchName || ''}
        />
        <UserNameSearchBar
          defaultUserName=""
        />
      </div>
      <div className='w-9/12 p-5'>
        <DateSpots
          addressAndDateSpots={addressAndDateSpots}
        />
      </div>
    </div>
  );
});