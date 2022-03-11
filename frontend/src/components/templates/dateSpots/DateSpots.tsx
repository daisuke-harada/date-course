import { DateSpotCard } from "components/organisms/dateSpots/DateSpotCard";
import { memo, VFC } from "react";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

type Props = {
  addressAndDateSpots: Array<AddressAndDateSpotJoinData>
};

export const DateSpots: VFC<Props> = memo((props) => {
  const { addressAndDateSpots } = props;
  return(
    <div className='flex flex-wrap justify-center'>
      {addressAndDateSpots.map((dateSpot: AddressAndDateSpotJoinData) => (<DateSpotCard key={dateSpot.id} addressAndDateSpot={dateSpot} />))}
    </div>
  );
});