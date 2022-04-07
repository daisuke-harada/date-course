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
    <>
      <h1 className='m-4'>デートスポットを探す</h1>
      <DateSpots addressAndDateSpots={addressAndDateSpots} />
    </>
  );
});