import { memo, useEffect, useState, FC } from 'react';
import { useLocation } from 'react-router-dom';

import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { IndexLayout } from 'components/templates/layouts/IndexLayouts';
import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { defaultAddressAndDateSpotJoinData } from 'datas/defaultAddressAndDateSpotJoinData';
import { DateSpotSortSearchBar } from 'components/organisms/searchs/DateSpotSortSearchBar';
import { DateSpotNameSearchBar } from 'components/organisms/searchs/DateSpotNameSearchBar';
import { DateSpots } from 'components/templates/dateSpots/DateSpots';


export const Search: FC = memo(() => {
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<AddressAndDateSpotJoinData[]>([defaultAddressAndDateSpotJoinData]);

  const location = useLocation();
  const state = location.state as {
    addressAndDateSpots: AddressAndDateSpotJoinData[]
    prefectureId?: string,
    genreId?: string,
    comeTime?: string,
    dateSpotSearchName?: string
  };

  useEffect(() => {
    setAddressAndDateSpots(state.addressAndDateSpots);
  }, [state.addressAndDateSpots]);

  return(
    <IndexLayout
      sideArea={
        <>
          <DateSpotSortSearchBar
            defaultPrefectureId={state.prefectureId || ''}
            defaultGenreId={state.genreId || ''}
            defaultBusinessTimeValue={state.comeTime || ''}
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
          defaultPrefectureValue={state.prefectureId}
          defaultGenreValue={state.genreId}
          defaultBusinessTimeValue={state.comeTime}
          dateSpotSearchName={state.dateSpotSearchName}
        />

      }
      mainArea={
        <DateSpots
          addressAndDateSpots={addressAndDateSpots}
          prefectureId={state.prefectureId}
          genreId={state.genreId}
          comeTime={state.comeTime}
          dateSpotSearchName={state.dateSpotSearchName}
        />
      }
    />
  );
});