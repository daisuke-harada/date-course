import { CourseCard } from 'components/organisms/card/courses/CourseCard';
import { client } from 'lib/api/client';
import { memo, useEffect, useState, VFC } from 'react';
import { CourseResponseData } from 'types/courses/response';

export const Index: VFC = memo(() => {
  const [courses, setCourses] = useState<CourseResponseData[]>([]);
  useEffect(() => {
    client.get('courses').then((response) => {
      setCourses(response.data.courses);
    })
  }, []);

  return(
    <div className='flex flex-wrap justify-center'>
      {courses.map((course, index) => (<CourseCard key={index} course={course} />))}
    </div>
  );
});