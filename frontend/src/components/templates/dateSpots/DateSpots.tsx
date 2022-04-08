import { DateSpotCard } from "components/organisms/dateSpots/DateSpotCard";
import { DateSpotRanking } from "components/organisms/rankings/DateSpotRanking";
import { DateSpotSortSearchBar } from "components/organisms/searchs/DateSpotSortSearchBar";
import { memo, VFC } from "react";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

type Props = {
  addressAndDateSpots: Array<AddressAndDateSpotJoinData>
};

export const DateSpots: VFC<Props> = memo((props) => {
  const { addressAndDateSpots } = props;
  return(
    <>
      <DateSpotRanking />
      <DateSpotSortSearchBar />
      <div className='flex flex-wrap justify-center'>
        {addressAndDateSpots.map((addressAndDateSpot: AddressAndDateSpotJoinData) => (<DateSpotCard key={addressAndDateSpot.dateSpot.id} addressAndDateSpot={addressAndDateSpot} />))}
      </div>
    </>
  );
});