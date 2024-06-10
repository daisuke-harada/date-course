import { memo, useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import tw from 'tailwind-styled-components';

import { CourseResponseData } from 'types/courses/response';
import { MyPageCourseCard } from 'components/organisms/card/courses/MyPageCourseCard';
import { BaseButton } from 'components/atoms/button/BaseButton';
import { SecondaryButton } from 'components/atoms/button/SecondaryButton';
import { RootState } from 'reducers';
import { User } from 'types/users/session';

type Props = {
  courses: CourseResponseData[],
  userId: number
};

const CourseNotExistDiv = tw.div`text-center sm:text-2xl m-auto my-5 text-blue-600 mobile(L):text-lg text-sm`;
const CourseParentButtonDiv = tw.div`xl:w-1/4 lg:text-xl md:w-1/3 md:text-base mobile(L):w-1/2 mobile(L):text-sm w-3/4 text-xs m-auto mb-5`;

export const MyPageCourses: FC<Props> = memo((props) => {
  const { courses, userId } = props;
  const [filterCourses, setFilterCourses] = useState<CourseResponseData[]>([]);
  const getCurrentUser = useSelector<RootState, User>(state => state.session.currentUser)
  const getLoginStatus = useSelector<RootState,boolean>(state => state.session.loginStatus)

  // 非公開ステータスのデートコースを他のユーザーに見れなくする
  useEffect(() => {
    userId !== getCurrentUser.id?
    setFilterCourses(courses.filter((course) =>(course.authority === '公開')))
    :
    !getLoginStatus?
    setFilterCourses(courses.filter((course) =>(course.authority === '公開')))
    :
    setFilterCourses(courses);
  },[courses, getCurrentUser.id, getLoginStatus, userId]);

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
          <div className='flex flex-col mb-16 text-center'>
            <CourseNotExistDiv>
                現在登録されていません。<br/>
                デートコースを作成してみましょう。
            </CourseNotExistDiv>
            <CourseParentButtonDiv>
              <Link to='/dateSpots/index'>
                <BaseButton>
                  デートスポットを探す
                </BaseButton>
              </Link>
            </CourseParentButtonDiv>
            <CourseParentButtonDiv>
              <Link to='/courses/index'>
                <SecondaryButton>
                  デートコースを探す
                </SecondaryButton>
              </Link>
            </CourseParentButtonDiv>
          </div>
        )
      }
    </>
  );
});