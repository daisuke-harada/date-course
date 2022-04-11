import { DateSpotCard } from "components/organisms/card/dateSpots/DateSpotCard";
import { DateSpotRanking } from "components/organisms/rankings/DateSpotRanking";
import { memo, VFC } from "react";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

type Props = {
  addressAndDateSpots: Array<AddressAndDateSpotJoinData>,
};

export const DateSpots: VFC<Props> = memo((props) => {
  const { addressAndDateSpots } = props;
  console.log(addressAndDateSpots);

  return(
    <>
      {
        addressAndDateSpots.length !== 0?
        (
          <>
            <DateSpotRanking addressAndDateSpots={addressAndDateSpots} />
            <div className='sm:justify-start justify-center flex flex-wrap'>
              {addressAndDateSpots.map((addressAndDateSpot: AddressAndDateSpotJoinData) => (<DateSpotCard key={addressAndDateSpot.dateSpot.id} addressAndDateSpot={addressAndDateSpot} />))}
            </div>
          </>
        )
        :
        <div className='mt-2 text-center text-red-400 text-4xl'>
          デートスポットは存在しません
        </div>
      }
    </>
  );
});