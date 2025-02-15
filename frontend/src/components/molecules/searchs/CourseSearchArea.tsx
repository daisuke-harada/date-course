import { memo, useCallback, useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { client } from 'lib/api/client';
import { PrefectureSelect } from '../select/dateSpots/PrefectureSelect';

type Props = {
  defaultPrefectureId?: string
}


export const CourseSearchArea: FC<Props> = memo((props) => {
  const { defaultPrefectureId } = props;
  const [prefectureId, setPrefectureId] = useState<string >(defaultPrefectureId || '');
  const navigate = useNavigate();
  const onChangePrefectureId: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setPrefectureId(e.target.value), []);

  const onClickSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    client.post('courses/sort', {prefectureId}).then(response => {
      navigate('/courses/search',
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
      <div className='pt-5 px-2 mx-auto text-center flex flex-col'>
        <div className='mb-2'>条件検索</div>
        <PrefectureSelect addClassName='border-red-100' dataE2e='dateSpot-prefecture-select' defaultValue={prefectureId} onChangeValue={onChangePrefectureId} />
      </div>
      <div className='m-auto mb-5 mt-1 w-1/4'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </>
  );
});