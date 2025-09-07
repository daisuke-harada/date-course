import { FC, memo, useCallback, useState } from 'react';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { PrefectureSelect } from '../select/dateSpots/PrefectureSelect';
import { useNavigate } from 'react-router-dom';

type Props = {
  defaultPrefectureId?: string
}


export const CourseSearchArea: FC<Props> = memo((props) => {
  const { defaultPrefectureId } = props;
  const [prefectureId, setPrefectureId] = useState<string >(defaultPrefectureId || '');
  const onChangePrefectureId: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setPrefectureId(e.target.value), []);
  const navigate = useNavigate();

  const onClickSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    const params = new URLSearchParams();
    if(prefectureId) params.append('prefecture_id', prefectureId);
    // coursesのindexページに検索パラメータ付きで遷移
    navigate(`/courses/index?${params.toString()}`);
  };

  return(
    <>
      <div className='pt-5 px-2 mx-auto text-center flex flex-col'>
        <div className='mb-2'>条件検索</div>
        <PrefectureSelect addClassName='border-red-100' dataE2e='dateSpot-prefecture-select' value={prefectureId} onChangeValue={onChangePrefectureId} />
      </div>
      <div className='m-auto mb-5 mt-1 w-1/4'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </>
  );
});