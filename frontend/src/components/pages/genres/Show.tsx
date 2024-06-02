import { memo, useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';

import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { DateSpotNameSearchBar } from 'components/organisms/searchs/DateSpotNameSearchBar';
import { DateSpotSortSearchBar } from 'components/organisms/searchs/DateSpotSortSearchBar';
import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { DateSpots } from 'components/templates/dateSpots/DateSpots';
import { IndexLayout } from 'components/templates/layouts/IndexLayouts';
import { defaultAddressAndDateSpotJoinData } from 'datas/defaultAddressAndDateSpotJoinData';
import { client } from 'lib/api/client';

export const Show: FC = memo(() => {
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<AddressAndDateSpotJoinData[]>([defaultAddressAndDateSpotJoinData]);
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
            defaultPrefectureId=''
            defaultGenreId={`${id}`}
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