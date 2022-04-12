import { DateSpotCard } from "components/organisms/card/dateSpots/DateSpotCard";
import { DateSpotRanking } from "components/organisms/rankings/DateSpotRanking";
import { CustomeSearchBar } from "components/organisms/searchs/CustomeSearchBar";
import { memo, VFC } from "react";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

type Props = {
  addressAndDateSpots: Array<AddressAndDateSpotJoinData>,
  prefectureId?: string,
  genreId?: string,
  comeTime?: string,
  dateSpotSearchName?: string
};

export const DateSpots: VFC<Props> = memo((props) => {
  const { addressAndDateSpots, prefectureId, genreId, comeTime, dateSpotSearchName } = props;

  return(
    <>
      {
        addressAndDateSpots.length !== 0?
        (
          <>
            <DateSpotRanking
              addressAndDateSpots={addressAndDateSpots}
              prefectureId={prefectureId}
              genreId={genreId}
              comeTime={comeTime}
              dateSpotSearchName={dateSpotSearchName}
            />
            <CustomeSearchBar
              defaultDateSpotCondition='bg-red-400'
              defaultCourseCondition='bg-gray-300'
              defaultUserCondition='bg-gray-300'
              defaultSearchSwitch='DateSpot'
            />
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