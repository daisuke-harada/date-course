import { IndexLayout } from 'components/templates/layouts/IndexLyouts';
import { DateSpotNameSearchBar } from 'components/organisms/searchs/DateSpotNameSearchBar';
import { DateSpotSortSearchBar } from 'components/organisms/searchs/DateSpotSortSearchBar';
import { UserNameSearchBar } from 'components/organisms/searchs/UserNameSearchBar';
import { client } from 'lib/api/client';
import { memo, useEffect, useState, VFC } from 'react';
import { CourseResponseData } from 'types/courses/response';
import { Courses } from 'components/templates/courses/Courses';
import { CourseSortSearchBar } from 'components/organisms/searchs/CourseSortSearchBar';
import { CustomeSearchBar } from 'components/organisms/searchs/CustomeSearchBar';

export const Index: VFC = memo(() => {
  const [courses, setCourses] = useState<CourseResponseData[]>([]);
  useEffect(() => {
    client.get('courses').then((response) => {
      setCourses(response.data.courses);
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
          <CourseSortSearchBar defaultPrefectureValue='' />
          <DateSpotNameSearchBar />
          <UserNameSearchBar />
        </>
      }

      centerArea={
        <>
          <CustomeSearchBar
            defaultDateSpotCondition='bg-gray-300'
            defaultCourseCondition='bg-red-400'
            defaultUserCondition='bg-gray-300'
            defaultSearchSwitch='Course'
            defaultPrefectureValue=''
          />
          <Courses courses={courses} />
        </>
      }
    />
  );
});