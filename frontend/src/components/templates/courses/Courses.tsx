import { memo, VFC } from 'react';

import { CourseResponseData } from 'types/courses/response';
import { CustomeSearchBar } from 'components/organisms/searchs/CustomeSearchBar';
import { CourseCard } from 'components/organisms/card/courses/CourseCard';

type Props = {
  courses: Array<CourseResponseData>,
  prefectureId?: string,
};

export const Courses: VFC<Props> = memo((props) => {
  const { courses, prefectureId } = props;
  return(
    <>
      {
        courses.length !== 0?
        (
          <>
            <CustomeSearchBar
              defaultDateSpotCondition='bg-gray-300'
              defaultCourseCondition='bg-red-400'
              defaultUserCondition='bg-gray-300'
              defaultSearchSwitch='Course'
              defaultPrefectureValue={prefectureId}
            />
            <div className='sm:justify-start justify-center flex flex-wrap'>
              {courses.map((course, index) => (<CourseCard key={index} course={course} />))}
            </div>
          </>
        )
        :
        (
          <>
            <CustomeSearchBar
              defaultDateSpotCondition='bg-gray-300'
              defaultCourseCondition='bg-red-400'
              defaultUserCondition='bg-gray-300'
              defaultSearchSwitch='Course'
              defaultPrefectureValue={prefectureId}
            />
            <div className='mt-2 text-center text-red-400 text-4xl'>
              デートコースは存在しません
            </div>
          </>
        )
      }
    </>
  );
});