import { CourseSortSearchBar } from 'components/organisms/searchs/CourseSortSearchBar';
import { DateSpotNameSearchBar } from 'components/organisms/searchs/DateSpotNameSearchBar';
import { DateSpotSortSearchBar } from 'components/organisms/searchs/DateSpotSortSearchBar';
import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { UserNameSearchBar } from 'components/organisms/searchs/UserNameSearchBar';
import { DateSpots } from 'components/templates/dateSpots/DateSpots';
import { IndexLayout } from 'components/templates/layouts/IndexLyouts';
import { defaultAddfressAndDateSpotJoinData } from 'datas/defaultAddressAndDateSpotJoinData';
import { client } from 'lib/api/client';
import { memo, useEffect, useState, VFC } from 'react';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';

export const Index: VFC = memo(() => {
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<Array<AddressAndDateSpotJoinData>>([defaultAddfressAndDateSpotJoinData]);

  useEffect(() => {
    client.get('date_spots').then(response => {
      setAddressAndDateSpots(response.data.addressAndDateSpots);
    })
  }, []);

  console.log(addressAndDateSpots);

  return(
    <IndexLayout
      sideArea={
        <>
          <DateSpotSortSearchBar
            defaultPrefectureValue=''
            defaultGenreValue=''
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
          dateSpotSearchName={''}
          defaultPrefectureValue={''}
          defaultGenreValue={''}
          defaultBusinessTimeValue={''}
        />
      }
      mainArea={<DateSpots addressAndDateSpots={addressAndDateSpots} />}
    />
  );
});