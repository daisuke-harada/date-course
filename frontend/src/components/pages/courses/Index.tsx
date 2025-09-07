import { FC, memo, useEffect, useState } from 'react';

import { CourseResponseData } from 'types/courses/response';
import { CourseSortSearchBar } from 'components/organisms/searchs/CourseSortSearchBar';
import { Courses } from 'components/templates/courses/Courses';
import { IndexLayout } from 'components/templates/layouts/IndexLayouts';
import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { client } from 'lib/api/client';
import { defaultAddressAndDateSpotJoinData } from 'datas/defaultAddressAndDateSpotJoinData';
import { defaultUserResponseData } from 'datas/defaultUserData';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchParams.get('prefecture_id')) params.prefecture_id = searchParams.get('prefecture_id')!;
    client.get('courses', { params }).then((response) => {
      setCourses(response.data);
    });
  }, [searchParams]);

  return(
    <IndexLayout
      sideArea={<CourseSortSearchBar />}

      topArea={
        <MultiBar
          defaultDateSpotCondition='bg-gray-300'
          defaultCourseCondition='bg-red-400'
          defaultUserCondition='bg-gray-300'
          defaultSearchSwitch='Course'
          defaultPrefectureId=''
        />
      }

      mainArea={<Courses courses={courses} />}
    />
  );
});