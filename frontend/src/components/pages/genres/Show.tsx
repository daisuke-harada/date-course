import { memo, useEffect, useState, VFC } from 'react';
import { useParams } from 'react-router-dom';

import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { CourseSortSearchBar } from 'components/organisms/searchs/CourseSortSearchBar';
import { DateSpotNameSearchBar } from 'components/organisms/searchs/DateSpotNameSearchBar';
import { DateSpotSortSearchBar } from 'components/organisms/searchs/DateSpotSortSearchBar';
import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { UserNameSearchBar } from 'components/organisms/searchs/UserNameSearchBar';
import { DateSpots } from 'components/templates/dateSpots/DateSpots';
import { IndexLayout } from 'components/templates/layouts/IndexLyouts';
import { defaultAddfressAndDateSpotJoinData } from 'datas/defaultAddressAndDateSpotJoinData';
import { client } from 'lib/api/client';

export const Show: VFC = memo(() => {
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<AddressAndDateSpotJoinData[]>([defaultAddfressAndDateSpotJoinData]);
  const { id } = useParams();

  useEffect(() => {
    client.get(`genres/${id}`).then(response => {
      setAddressAndDateSpots(response.data.addressAndDateSpots);
    })
  }, [id]);

  return(
    <IndexLayout
      sideArea={
        <>
          <DateSpotSortSearchBar
            defaultPrefectureValue=''
            defaultGenreValue={`${id}`}
            defaultBusinessTimeValue=''
          />
          <CourseSortSearchBar defaultPrefectureValue='' />
          <DateSpotNameSearchBar />
          <UserNameSearchBar />
        </>
      }

      topArea={
        <MultiBar
          defaultDateSpotCondition='bg-red-400'
          defaultCourseCondition='bg-gray-300'
          defaultUserCondition='bg-gray-300'
          defaultSearchSwitch='DateSpot'
          defaultGenreValue={`${id}`}
        />
      }

      mainArea={
        <DateSpots
          addressAndDateSpots={addressAndDateSpots}
          genreId={`${id}`}
        />
      }
    />
  );
});