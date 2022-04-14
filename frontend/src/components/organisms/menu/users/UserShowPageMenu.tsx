import { memo, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';

const MenuDiv = tw.div`rounded-xl mx-auto p-1 flex flex-col w-full`;
const ChildrenMenuDiv = tw.div`sm:my-4 my-2 w-full h-10 sm:h-20 rounded-2xl shadow-xl`
const MenuBarDiv = tw.div`sm:text-xl lg:text-2xl text-xs sm:pt-6 w-1/2 h-full font-bold text-center pt-3 text-white hover:bg-red-400`

export const UserShowPageMenu: VFC = memo(() => {
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
          <div className='text-center font-bold'>デートコース</div>
          :
          <div className='text-center font-bold'>レビュー</div>
        }
      </ChildrenMenuDiv>
    </MenuDiv>
  );
});