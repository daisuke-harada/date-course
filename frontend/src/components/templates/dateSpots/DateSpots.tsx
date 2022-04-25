import { DateSpotCard } from 'components/organisms/card/dateSpots/DateSpotCard';
import { DateSpotRanking } from 'components/organisms/rankings/DateSpotRanking';
import { Loading } from 'components/pages/Loading';
import { memo, VFC } from 'react';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';

type Props = {
  addressAndDateSpots: AddressAndDateSpotJoinData[],
  prefectureId?: string,
  genreId?: string,
  comeTime?: string,
  dateSpotSearchName?: string,
};

export const DateSpots: VFC<Props> = memo((props) => {
  const { addressAndDateSpots, prefectureId, genreId, comeTime, dateSpotSearchName } = props;

  return(
    <Loading loadingSwitch={addressAndDateSpots.length !== 0 && addressAndDateSpots[0].id === 0 && true} >
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
            <div className='sm:justify-start justify-center flex flex-wrap'>
              {addressAndDateSpots.map((addressAndDateSpot: AddressAndDateSpotJoinData) => (<DateSpotCard key={addressAndDateSpot.dateSpot.id} addressAndDateSpot={addressAndDateSpot} />))}
            </div>
          </>
        )
        :
        (
          <div className='mt-2 text-center text-red-400 text-4xl'>
            デートスポットは存在しません
          </div>
        )
      }
    </Loading>
  );
});