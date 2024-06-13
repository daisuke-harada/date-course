import { memo, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { setCourseInfo } from 'reducers/currentDateCourseSlice';
import tw from 'tailwind-styled-components';
import { CourseInfoData } from 'types/managementCourses/management';

type Props = {
  noDuplicatePrefectureNames: string[]
};

const Label = tw.label`font-bold m-2`;
const Input = tw.input`mt-4 mx-2`;
const MainDiv= tw.div`m-5 font-bold flex`;

export const CourseInfoSelect: FC<Props> = memo((props) => {
  const { noDuplicatePrefectureNames } = props;
  const dispatch = useDispatch();
  const courseInfo = useSelector<RootState, CourseInfoData>(state => state.currentDateCourse.courseInfo);
  const onChangeTravelMode: React.ChangeEventHandler<HTMLSelectElement> = (e) => dispatch(setCourseInfo({travelMode: e.target.value, authority: courseInfo.authority}));
  const onChangeRadioButton: React.ChangeEventHandler<HTMLInputElement> = (e) => dispatch(setCourseInfo({travelMode: courseInfo.travelMode, authority: e.target.value}));

  // travelModeのBICYCLING(交通手段が自転車)は同じ県内のルートでしか使用できない。そのため、複数の県内を跨ぐルートの場合は強制的に交通手段がDRIVINGに変更されるようにする。
  useEffect(() =>{
    courseInfo.travelMode === 'BICYCLING'
    && noDuplicatePrefectureNames.length > 1
    && setCourseInfo({travelMode: 'DRIVING', authority: courseInfo.authority})
  }, [courseInfo, noDuplicatePrefectureNames, setCourseInfo]);

  return(
    <>
    <MainDiv>
      <div className='sm:flex-row md:w-auto md:text-xl m-2 flex flex-col text-xs overflow-x-hidden'>
        交通手段を選択
        <span className='text-xs text-red-400 md:pt-2'>(県内のみ自転車選択可)</span>
      </div>
      <select data-e2e='travelMode-select' className='mx-2 border-2 border-gray-400 rounded-md' value={courseInfo.travelMode} onChange={onChangeTravelMode}>
        <option value='DRIVING'>車</option>
        <option value='WALKING'>歩く</option>
        {
          // 自転車は同じ県内でのルートでしか選択できないため
          noDuplicatePrefectureNames.length === 1
          &&
          <option value='BICYCLING'>自転車</option>
        }
      </select>
    </MainDiv>
    <MainDiv>
      <Label>公開</Label>
      <Input data-e2e='course-open-radio' type='radio' value='公開' onChange={onChangeRadioButton} checked={courseInfo.authority === '公開'} />
      <Label>非公開</Label>
      <Input data-e2e='course-not-open-radio' type='radio' value='非公開' onChange={onChangeRadioButton} checked={courseInfo.authority === '非公開'} />
    </MainDiv>
    </>
  );
});