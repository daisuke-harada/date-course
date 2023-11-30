import { memo, useEffect, useState, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';

import { DateSpotNameSearchBar } from 'components/organisms/searchs/DateSpotNameSearchBar';
import { DateSpotSortSearchBar } from 'components/organisms/searchs/DateSpotSortSearchBar';
import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { DateSpots } from 'components/templates/dateSpots/DateSpots';
import { IndexLayout } from 'components/templates/layouts/IndexLayouts';
import { defaultAddressAndDateSpotJoinData } from 'datas/defaultAddressAndDateSpotJoinData';
import { client } from 'lib/api/client';

export const Show: VFC = memo(() => {
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<AddressAndDateSpotJoinData[]>([defaultAddressAndDateSpotJoinData]);
  const { id } = useParams();

  useEffect(() => {
    client.get(`prefectures/${id}`).then(response => {
      setAddressAndDateSpots(response.data.addressAndDateSpots);
    })
  }, [id]);

  return(
    <IndexLayout
      sideArea={
        <>
          <DateSpotSortSearchBar
            defaultPrefectureId={`${id}`}
            defaultGenreId=''
            defaultBusinessTimeValue=''
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
          defaultPrefectureValue={`${id}`}
        />
      }

      mainArea={<DateSpots addressAndDateSpots={addressAndDateSpots} prefectureId={`${id}`} />}
    />
  );
});