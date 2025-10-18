import { FC, memo, useEffect, useState } from 'react';

import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { DateSpotNameSearchBar } from 'components/organisms/searchs/DateSpotNameSearchBar';
import { DateSpotSortSearchBar } from 'components/organisms/searchs/DateSpotSortSearchBar';
import { DateSpots } from 'components/templates/dateSpots/DateSpots';
import { IndexLayout } from 'components/templates/layouts/IndexLayouts';
import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { client } from 'lib/api/client';
import { defaultAddressAndDateSpotJoinData } from 'datas/defaultAddressAndDateSpotJoinData';
import { useSearchParams } from 'react-router-dom';

export const Index: FC = memo(() => {
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<AddressAndDateSpotJoinData[]>([defaultAddressAndDateSpotJoinData]);
  const [searchParams] = useSearchParams();

  const prefectureId = searchParams.get('prefecture_id') || '';
  const genreId = searchParams.get('genre_id') || '';
  const comeTime = searchParams.get('come_time') || '';
  const dateSpotSearchName = searchParams.get('date_spot_name') || '';

  useEffect(() => {
    const params: Record<string, string> = {};
    if (prefectureId) params.prefecture_id = prefectureId;
    if (genreId) params.genre_id = genreId;
    if (comeTime) params.come_time = comeTime;
    if (dateSpotSearchName) params.date_spot_name = dateSpotSearchName;

    client.get('date_spots', { params }).then(response => {
      setAddressAndDateSpots(response.data);
    });
  }, [prefectureId, genreId, comeTime, dateSpotSearchName]);

  return(
    <IndexLayout
      sideArea={
        <>
          <DateSpotSortSearchBar
            defaultPrefectureId={prefectureId || ''}
            defaultGenreId={genreId || ''}
            defaultComeTime={comeTime || ''}
          />
          <DateSpotNameSearchBar />
        </>
      }
      topArea={
        <MultiBar
          defaultDateSpotCondition='bg-red-400'
          defaultCourseCondition='bg-gray-300'
          defaultUserCondition='bg-gray-300'
          defaultSearchSwitch='DateSpot'
          dateSpotSearchName={dateSpotSearchName}
          defaultPrefectureId={prefectureId}
          defaultGenreId={genreId}
          defaultComeTime={comeTime}
        />
      }
      mainArea={<DateSpots addressAndDateSpots={addressAndDateSpots} prefectureId={prefectureId} genreId={genreId} comeTime={comeTime} dateSpotSearchName={dateSpotSearchName} />}
    />
  );
});