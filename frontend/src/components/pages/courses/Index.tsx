import { client } from 'lib/api/client';
import { memo, useEffect, useState, FC } from 'react';

import { CourseResponseData } from 'types/courses/response';
import { Courses } from 'components/templates/courses/Courses';
import { CourseSortSearchBar } from 'components/organisms/searchs/CourseSortSearchBar';
import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { defaultUserResponseData } from 'datas/defaultUserData';
import { defaultAddressAndDateSpotJoinData } from 'datas/defaultAddressAndDateSpotJoinData';
import { IndexLayout } from 'components/templates/layouts/IndexLayouts';

export const Index: FC = memo(() => {
  const [courses, setCourses] = useState<CourseResponseData[]>([
    {
      id: 0,
      user: defaultUserResponseData,
      travelMode: '',
      authority: '',
      dateSpots: [defaultAddressAndDateSpotJoinData],
      noDuplicatePrefectureNames: ['']
    }
  ]);

  useEffect(() => {
    client.get('courses').then((response) => {
      setCourses(response.data);
    })
  }, []);

  return(
    <IndexLayout
      sideArea={<CourseSortSearchBar defaultPrefectureId='' />}

      topArea={
        <MultiBar
          defaultDateSpotCondition='bg-gray-300'
          defaultCourseCondition='bg-red-400'
          defaultUserCondition='bg-gray-300'
          defaultSearchSwitch='Course'
          defaultPrefectureValue=''
        />
      }

      mainArea={<Courses courses={courses} />}
    />
  );
});