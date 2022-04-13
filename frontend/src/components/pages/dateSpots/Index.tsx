import { DateSpotNameSearchBar } from 'components/organisms/searchs/DateSpotNameSearchBar';
import { DateSpotSortSearchBar } from 'components/organisms/searchs/DateSpotSortSearchBar';
import { UserNameSearchBar } from 'components/organisms/searchs/UserNameSearchBar';
import { DateSpots } from 'components/templates/dateSpots/DateSpots';
import { IndexLayout } from 'components/templates/layouts/IndexLyouts';
import { client } from 'lib/api/client';
import { memo, useEffect, useState, VFC } from 'react';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';

export const Index: VFC = memo(() => {
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<Array<AddressAndDateSpotJoinData>>([]);

  useEffect(() => {
    client.get('date_spots').then(response => {
      setAddressAndDateSpots(response.data.addressAndDateSpots);
    })
  }, []);

  return(
    <IndexLayout
      sideArea={
        <>
          <DateSpotSortSearchBar
            defaultPrefectureValue=''
            defaultGenreValue=''
            defaultBusinessTimeValue=''
          />
          <DateSpotNameSearchBar />
          <UserNameSearchBar />
        </>
      }
      centerArea={<DateSpots addressAndDateSpots={addressAndDateSpots} />}
    />
  );
});