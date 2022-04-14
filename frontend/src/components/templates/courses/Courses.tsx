import { memo, VFC } from 'react';

import { CourseResponseData } from 'types/courses/response';
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
          <div className='sm:justify-start justify-center flex flex-wrap px-2'>
            {courses.map((course, index) => (<CourseCard key={index} course={course} />))}
          </div>
        )
        :
        (
          <div className='mt-2 text-center text-red-400 text-4xl'>
            デートコースは存在しません
          </div>
        )
      }
    </>
  );
});