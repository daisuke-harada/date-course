import { CourseSearchArea } from 'components/molecules/searchs/CourseSearchArea';
import { DateSpotSearchArea } from 'components/molecules/searchs/DateSpotSearchArea';
import { UserSearchArea } from 'components/molecules/searchs/UserSearchArea';
import { memo, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';

const DateSpotChoiceDiv = tw.div`w-1/3 font-bold text-xs text-white border-r rounded-tl-3xl text-center border-gray-400 cursor-pointer`;
const CourseChoiceDiv = tw.div`w-1/3 font-bold text-xs text-white text-center border-gray-400 cursor-pointer`;
const UserChoiceDiv = tw.div`w-1/3 font-bold text-xs text-white border-l rounded-tr-3xl text-center border-gray-400 cursor-pointer`;

type Props = {
  defaultDateSpotCondition: string,
  defaultCourseCondition: string,
  defaultUserCondition: string,
  defaultSearchSwitch: string,
  dateSpotSearchName?: string,
  userSearchName?: string,
  defaultPrefectureValue?: string,
  defaultGenreValue?: string,
  defaultBusinessTimeValue?: string

}

export const CustomeSearchBar: VFC<Props> = memo((props) => {
  const {
    defaultDateSpotCondition,
    defaultCourseCondition,
    defaultUserCondition,
    defaultSearchSwitch,
    dateSpotSearchName,
    userSearchName,
    defaultPrefectureValue,
    defaultGenreValue,
    defaultBusinessTimeValue
  } = props;

  const [ dateSpotCondition, setDateSpotCondition ] = useState(defaultDateSpotCondition);
  const [ courseCondition, setCourseCondition ] = useState(defaultCourseCondition);
  const [ userCondition, setUserCondition ] = useState(defaultUserCondition);
  const [ searchSwitch, setSearchSwitch] = useState(defaultSearchSwitch);

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
    <div className='md:hidden m-auto mt-2 mb-6 bg-white border-2 shadow-xl rounded-3xl border-gray-200 flex flex-col' >
      <div className='w-full flex rounded-t-3xl border-gray-400 border-b'>
        <DateSpotChoiceDiv className={`${dateSpotCondition} hover:bg-red-400`} onClick={onClickDateSpotCondition}>デートスポット</DateSpotChoiceDiv>
        <CourseChoiceDiv className={`${courseCondition} hover:bg-red-400`} onClick={onClickCourseCondition}>デートコース</CourseChoiceDiv>
        <UserChoiceDiv className={`${userCondition} hover:bg-red-400`} onClick={onClickUserCondition}>ユーザー</UserChoiceDiv>
      </div>
      {
        searchSwitch === 'DateSpot'?
          <DateSpotSearchArea
            dateSpotSearchName={dateSpotSearchName}
            defaultPrefectureValue={defaultPrefectureValue}
            defaultGenreValue={defaultGenreValue}
            defaultBusinessTimeValue={defaultBusinessTimeValue}
          />
        :
        searchSwitch === 'Course'?
          <CourseSearchArea
            defaultPrefectureValue={defaultPrefectureValue}
          />
        :
        <UserSearchArea userSearchName={userSearchName} />
      }
    </div>
  );
});