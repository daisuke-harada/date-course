import { memo, useCallback, useState, VFC } from 'react';
import { useNavigate } from 'react-router-dom';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { client } from 'lib/api/client';
import { PrefectureSelect } from '../select/dateSpots/PrefectureSelect';

type Props = {
  defaultPrefectureValue?: string
}


export const CourseSearchArea: VFC<Props> = memo((props) => {
  const { defaultPrefectureValue } = props;
  const [prefectureValue, setPrefectureValue] = useState<string >(defaultPrefectureValue || '');
  const navigate = useNavigate();
  const onChangePrefectureValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setPrefectureValue(e.target.value), []);

  const search = {
    prefectureId: prefectureValue
  };

  const onClickSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    client.post('courses/sort', search).then(response => {
      response.data.status === 'success' && navigate('/courses/search',
        {
          state: {
            courses: response.data.courses,
            prefectureId: response.data.prefectureId,
          }
        }
      )
    })
  };

  return(
    <>
      <div className='pt-5 mt-5 mb-2 px-2 mx-auto text-center flex flex-col'>
        <div className='mb-2'>条件検索</div>
        <PrefectureSelect addClassName='border-red-100' dataE2e='dateSpot-prefecture-select' defaultValue={prefectureValue} onChangeValue={onChangePrefectureValue} />
      </div>
      <div className='m-auto my-5 w-1/3'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </>
  );
});