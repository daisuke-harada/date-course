import { DateSpotCard } from "components/organisms/card/dateSpots/DateSpotCard";
import { DateSpotRanking } from "components/organisms/rankings/DateSpotRanking";
import { memo, VFC } from "react";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

type Props = {
  addressAndDateSpots: Array<AddressAndDateSpotJoinData>,
};

export const DateSpots: VFC<Props> = memo((props) => {
  const { addressAndDateSpots } = props;

  return(
    <>
      <DateSpotRanking />
      <div className='flex flex-wrap'>
        {addressAndDateSpots.map((addressAndDateSpot: AddressAndDateSpotJoinData) => (<DateSpotCard key={addressAndDateSpot.dateSpot.id} addressAndDateSpot={addressAndDateSpot} />))}
      </div>
    </>
  );
});