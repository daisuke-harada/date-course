import { memo, useEffect, useState, VFC } from 'react';

import { CourseResponseData } from 'types/courses/response';
import { MyPageCourseCard } from 'components/organisms/card/courses/MyPageCourseCard';
import { useRecoilValue } from 'recoil';
import { currentUserState, loginStatusState } from 'store/session';

type Props = {
  courses: Array<CourseResponseData>,
  userId: number
};

export const MyPageCourses: VFC<Props> = memo((props) => {
  const { courses, userId } = props;
  const [filterCourses, setFilterCourses] = useState<Array<CourseResponseData>>([]);
  const getCurrentUser = useRecoilValue(currentUserState);
  const getLoginStatus = useRecoilValue(loginStatusState);

  // 非公開ステータスのデートコースを他のユーザーに見れなくする
  useEffect(() => {
    userId !== getCurrentUser.user.id?
    setFilterCourses(courses.filter((course) =>(course.authority === '公開')))
    :
    getLoginStatus.status === false?
    setFilterCourses(courses.filter((course) =>(course.authority === '公開')))
    :
    setFilterCourses(courses);
  },[courses, getCurrentUser.user.id, getLoginStatus.status, userId]);

  return(
    <>
      {
        filterCourses.length !== 0?
        (
          <div className='sm:justify-start justify-center flex flex-wrap px-2'>
            {filterCourses.map((course, index) => (<MyPageCourseCard key={index} course={course} />))}
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