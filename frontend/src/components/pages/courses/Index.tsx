import { CourseCard } from "components/organisms/courses/CourseCard";
import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { CourseResponseData } from "types/courses/response";

export const Index: VFC = memo(() => {
  const [courses, setCourses] = useState<CourseResponseData[]>([]);
  useEffect(() => {
    client.get('courses').then((response) => {
      console.log(response.data.courses);
      setCourses(response.data.courses);
    })
  }, []);

  return(
    <>
      <h1 className='m-4'>デートコースを探すページです</h1>
      <div className='flex flex-col'>
        {courses.map((course, index) => (
          <div key={index}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
   </>
  );
});