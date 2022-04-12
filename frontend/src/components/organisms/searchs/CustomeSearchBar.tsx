import { BaseButton } from 'components/atoms/button/BaseButton';
import { memo, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';

const DateSpotChoiceDiv = tw.div`w-1/3 font-bold text-xs text-white border-r rounded-tl-3xl text-center border-gray-400 cursor-pointer`;
const CourseChoiceDiv = tw.div`w-1/3 font-bold text-xs text-white text-center border-gray-400 cursor-pointer`;
const UserChoiceDiv = tw.div`w-1/3 font-bold text-xs text-white border-l rounded-tr-3xl text-center border-gray-400 cursor-pointer`;

export const CustomeSearchBar: VFC = memo(() => {
  const [ name, setName ] = useState('');
  const onChangeSearchName: React.ChangeEventHandler<HTMLInputElement> = (e) => setName(e.target.value);
  const [ dateSpotCondition, setDateSpotCondition ] = useState('bg-gray-300');
  const [ courseCondition, setCourseCondition ] = useState('bg-gray-300');
  const [ userCondition, setUserCondition ] = useState('bg-gray-300');
  const [ searchSwitch, setSearchSwitch] = useState('DateSpot');

  const onClickDateSpotCondition = () => {
    setSearchSwitch('DateSpot');
    setDateSpotCondition('bg-red-400');
    setCourseCondition('bg-gray-300');
    setUserCondition('bg-gray-300');
  };

  const onClickCourseCondition = () => {
    setSearchSwitch('Course');
    setDateSpotCondition('bg-gray-300');
    setCourseCondition('bg-red-400');
    setUserCondition('bg-gray-300');
  };

  const onClickUserCondition = () => {
    setSearchSwitch('User');
    setDateSpotCondition('bg-gray-300');
    setCourseCondition('bg-gray-300');
    setUserCondition('bg-red-400');
  };




  return(
    <div className='m-auto mt-2 mb-6 bg-white border-2 shadow-xl rounded-3xl border-gray-200 flex flex-col' >
      <div className='w-full flex rounded-t-3xl border-gray-400 border-b'>
        <DateSpotChoiceDiv className={dateSpotCondition} onClick={onClickDateSpotCondition}>デートスポット</DateSpotChoiceDiv>
        <CourseChoiceDiv className={courseCondition} onClick={onClickCourseCondition}>デートコース</CourseChoiceDiv>
        <UserChoiceDiv className={userCondition} onClick={onClickUserCondition}>ユーザー</UserChoiceDiv>
      </div>
      {
        searchSwitch === 'DateSpot'?
        <div>DateSpot</div>
        :
        searchSwitch === 'Course'?
        <div>Course</div>
        :
        <div>User</div>
      }
      <div className='m-auto my-5 w-1/4'>
        <BaseButton>検索</BaseButton>
      </div>
    </div>
  );
});