import { DateSpots } from "components/templates/dateSpots/DateSpots";
import { memo, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

export const Search: VFC = memo(() => {
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<Array<AddressAndDateSpotJoinData>>([]);

  const location = useLocation();
  const state = location.state as {
    addressAndDateSpots: Array<AddressAndDateSpotJoinData>
    prefectureId?: string,
    genreId?: string,
    comeTime?: string
  };

  useEffect(() => {
    setAddressAndDateSpots(state.addressAndDateSpots);
  }, [state.addressAndDateSpots]);

  return(
    <div className='w-full flex'>
      <div className='w-2/12 m-2 bg-black'>
      </div>
      <div className='w-9/12 m-2'>
        <DateSpots
          addressAndDateSpots={addressAndDateSpots}
          defaultPrefectureValue={state.prefectureId || ''}
          defaultGenreValue={state.genreId || ''}
          defaultBusinessTimeValue={state.comeTime || ''}
        />
      </div>
    </div>
  );
});