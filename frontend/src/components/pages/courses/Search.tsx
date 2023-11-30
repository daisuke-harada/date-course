import { memo, useEffect, useState, VFC } from 'react';
import { useLocation } from 'react-router-dom';

import { IndexLayout } from 'components/templates/layouts/IndexLyouts';
import { CourseResponseData } from 'types/courses/response';
import { Courses } from 'components/templates/courses/Courses';
import { CourseSortSearchBar } from 'components/organisms/searchs/CourseSortSearchBar';
import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { defaultUserResponseData } from 'datas/defaultUserData';
import { defaultAddressAndDateSpotJoinData } from 'datas/defaultAddressAndDateSpotJoinData';

export const Search: VFC = memo(() => {
  const [courses, setCourses] = useState<CourseResponseData[]>([
    {
      id: 0,
      user: defaultUserResponseData,
      travelMode: '',
      authority: '',
      courseDuringSpots: [defaultAddressAndDateSpotJoinData],
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
      sideArea={<CourseSortSearchBar defaultPrefectureId={state.prefectureId || ''} />}
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