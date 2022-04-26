import { memo, useEffect, useState, VFC } from 'react';
import { useLocation } from 'react-router-dom';

import { UserNameSearchBar } from 'components/organisms/searchs/UserNameSearchBar';
import { IndexLayout } from 'components/templates/layouts/IndexLyouts';
import { CourseResponseData } from 'types/courses/response';
import { Courses } from 'components/templates/courses/Courses';
import { CourseSortSearchBar } from 'components/organisms/searchs/CourseSortSearchBar';
import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { defaultUserResponseData } from 'datas/defaultUserData';
import { defaultAddfressAndDateSpotJoinData } from 'datas/defaultAddressAndDateSpotJoinData';
import { DateSpotSortSearchBar } from 'components/organisms/searchs/DateSpotSortSearchBar';
import { DateSpotNameSearchBar } from 'components/organisms/searchs/DateSpotNameSearchBar';

export const Search: VFC = memo(() => {
  const [courses, setCourses] = useState<CourseResponseData[]>([
    {
      id: 0,
      user: defaultUserResponseData,
      travelMode: '',
      authority: '',
      courseDuringSpots: [defaultAddfressAndDateSpotJoinData],
      noDuplicatePrefectureNames: ['']
    }
  ]);


  const location = useLocation();
  const state = location.state as {
    courses: CourseResponseData[]
    prefectureId?: string,
  };

  useEffect(() => {
    setCourses(state.courses);
  }, [state.courses]);

  return(
    <IndexLayout
      sideArea={
        <>
          <DateSpotSortSearchBar
            defaultPrefectureValue=''
            defaultGenreValue=''
            defaultBusinessTimeValue=''
          />
          <CourseSortSearchBar defaultPrefectureValue={state.prefectureId || ''} />
          <DateSpotNameSearchBar />
          <UserNameSearchBar />
        </>
      }
      topArea ={
        <MultiBar
          defaultDateSpotCondition='bg-gray-300'
          defaultCourseCondition='bg-red-400'
          defaultUserCondition='bg-gray-300'
          defaultSearchSwitch='Course'
          defaultPrefectureValue={state.prefectureId}
        />
      }
      mainArea={<Courses courses={courses} searchPrefectureId={Number(state.prefectureId)} />}
    />
  );
});