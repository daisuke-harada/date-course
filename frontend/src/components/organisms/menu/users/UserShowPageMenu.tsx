import { MyPageCourses } from 'components/templates/courses/MyPageCourses';
import { memo, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';
import { CourseResponseData } from 'types/courses/response';

const MenuDiv = tw.div`rounded-xl mx-auto justify-center p-1 flex flex-col w-full`;
const ChildrenMenuDiv = tw.div`sm:my-4 my-2 w-full`;
const MenuBarDiv = tw.div`sm:text-xl lg:text-2xl text-xs w-1/2 h-full font-bold text-center py-2 text-white hover:bg-red-400`;
const MenuTitleDiv = tw.div`text-center text-2xl font-bold mb-5`;

type Props = {
  courses: CourseResponseData[],
  userId: number
}

export const UserShowPageMenu: VFC<Props> = memo((props) => {
  const { courses, userId } = props
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
      <ChildrenMenuDiv className='flex justify-center'>
        <MenuBarDiv
          className={`${courseColor} rounded-l-2xl`}
          onClick={onClickCourseMenu}
        >
          デートコース
        </MenuBarDiv>
        <MenuBarDiv
          className={`${reviewColor} rounded-r-2xl`}
          onClick={onClickReviewMenu}
        >
          レビュー
        </MenuBarDiv>
      </ChildrenMenuDiv>
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
          </>
        }
      </ChildrenMenuDiv>
    </MenuDiv>
  );
});