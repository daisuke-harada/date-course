import { DateSpotSortSearchBar } from 'components/organisms/searchs/DateSpotSortSearchBar';
import { DateSpotNameSearchBar } from 'components/organisms/searchs/DateSpotNameSearchBar';
import { memo, useEffect, useState, VFC } from 'react';
import { useLocation } from 'react-router-dom';
import { UserNameSearchBar } from 'components/organisms/searchs/UserNameSearchBar';
import { IndexLayout } from 'components/templates/layouts/IndexLyouts';
import { CourseResponseData } from 'types/courses/response';
import { Courses } from 'components/templates/courses/Courses';
import { CourseSortSearchBar } from 'components/organisms/searchs/CourseSortSearchBar';

export const Search: VFC = memo(() => {
  const [courses, setCourses] = useState<Array<CourseResponseData>>([]);

  const location = useLocation();
  const state = location.state as {
    courses: Array<CourseResponseData>
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
      centerArea={
        <Courses
          courses={courses}
        />
      }
    />
  );
});