import { memo, VFC } from 'react';

import { CourseResponseData } from 'types/courses/response';
import { CustomeSearchBar } from 'components/organisms/searchs/CustomeSearchBar';
import { CourseCard } from 'components/organisms/card/courses/CourseCard';

type Props = {
  courses: Array<CourseResponseData>,
};

export const Courses: VFC<Props> = memo((props) => {
  const { courses } = props;
  return(
    <>
      {
        courses.length !== 0?
        (
          <>
            {/* <CustomeSearchBar
              defaultDateSpotCondition='bg-gray-300'
              defaultCourseCondition='bg-gray-300'
              defaultUserCondition='bg-red-400'
              defaultSearchSwitch='User'
              userSearchName={userSearchName}
            /> */}
            <div className='sm:justify-start justify-center flex flex-wrap'>
              {courses.map((course, index) => (<CourseCard key={index} course={course} />))}
            </div>
          </>
        )
        :
        (
          <>
            {/* <CustomeSearchBar
              defaultDateSpotCondition='bg-gray-300'
              defaultCourseCondition='bg-gray-300'
              defaultUserCondition='bg-red-400'
              defaultSearchSwitch='User'
              userSearchName={userSearchName}
            /> */}
            <div className='mt-2 text-center text-red-400 text-4xl'>
              デートコースは存在しません
            </div>
          </>
        )
      }
    </>
  );
});