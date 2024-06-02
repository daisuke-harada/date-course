import { memo, useState, FC } from 'react';
import tw from 'tailwind-styled-components';

import { CourseResponseData } from 'types/courses/response';
import { DateSpotReviewAndDateSpotResponseData } from 'types/dateSpotReviews/response';
import { MyPageCourses } from 'components/templates/courses/MyPageCourses';
import { MyPageReviews } from 'components/templates/reviews/MyPageReviews';

type Props = {
  courses: CourseResponseData[],
  dateSpotReviews: DateSpotReviewAndDateSpotResponseData[],
  userId: number
}

const MenuDiv = tw.div`justify-center flex flex-col w-full`;
const ParentMenuDiv = tw.div`sm:mt-4 mt-2 w-full flex`;
const ChildrenMenuDiv = tw.div`p-1`;
const MenuBarDiv = tw.div`sm:text-xl lg:text-2xl text-xs w-1/2 h-full font-bold text-center py-2 text-white hover:bg-red-400`;
const MenuTitleDiv = tw.div`sm:text-2xl lg:text-4xl text-center font-bold my-5`;

export const UserShowPageMenu: FC<Props> = memo((props) => {
  const { courses, userId, dateSpotReviews } = props
  const [switchTarget, setSwitchTarget] = useState('Course');
  const [courseColor, setCourseColor] = useState('bg-red-400');
  const [reviewColor, setReviewColor] = useState('bg-gray-300');

  const onClickCourseMenu = () => {
    setSwitchTarget('Course');
    setCourseColor('bg-red-400');
    setReviewColor('bg-gray-300');
  };

  const onClickReviewMenu = () => {
    setSwitchTarget('Review');
    setCourseColor('bg-gray-300');
    setReviewColor('bg-red-400');
  };

  return(
    <MenuDiv>
      <ParentMenuDiv>
        <MenuBarDiv
          className={`${courseColor}`}
          onClick={onClickCourseMenu}
        >
          デートコース
        </MenuBarDiv>
        <MenuBarDiv
          className={`${reviewColor}`}
          onClick={onClickReviewMenu}
        >
          レビュー
        </MenuBarDiv>
      </ParentMenuDiv>
      <ChildrenMenuDiv>
        {
          switchTarget === 'Course'?
          <>
            <MenuTitleDiv>デートコース</MenuTitleDiv>
            <MyPageCourses courses={courses} userId={userId} />
          </>
          :
          <>
            <MenuTitleDiv>レビュー</MenuTitleDiv>
            <MyPageReviews reviews={dateSpotReviews} />
          </>
        }
      </ChildrenMenuDiv>
    </MenuDiv>
  );
});