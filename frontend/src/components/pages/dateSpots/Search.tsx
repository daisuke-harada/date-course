import { DateSpotSortSearchBar } from "components/organisms/searchs/DateSpotSortSearchBar";
import { DateSpotNameSearchBar } from "components/organisms/searchs/DateSpotNameSearchBar";
import { DateSpots } from "components/templates/dateSpots/DateSpots";
import { memo, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";
import { UserNameSearchBar } from "components/organisms/searchs/UserNameSearchBar";
import { IndexLayout } from "components/templates/IndexLyouts";

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
    <IndexLayout
      sideArea={
        <>
          <DateSpotSortSearchBar
            defaultPrefectureValue={state.prefectureId || ''}
            defaultGenreValue={state.genreId || ''}
            defaultBusinessTimeValue={state.comeTime || ''}
          />
          <DateSpotNameSearchBar />
          <UserNameSearchBar />
        </>
      }
      centerArea={
        <DateSpots
          addressAndDateSpots={addressAndDateSpots}
          prefectureId={state.prefectureId}
          genreId={state.genreId}
          comeTime={state.comeTime}
          dateSpotSearchName={state.dateSpotSearchName}
        />
      }
    />
  );
});