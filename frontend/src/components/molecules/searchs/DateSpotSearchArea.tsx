import { memo, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { client } from 'lib/api/client';

const Input = tw.input`py-1 px-3 w-full border-2 border-red-100 rounded-xl`;

type Props = {
  dateSpotSearchName?: string
}

export const DateSpotSearchArea: VFC<Props> = memo((props) => {
  const { dateSpotSearchName } = props;

  const [ dateSpotName, setDateSpotName ] = useState(dateSpotSearchName || '');
  const navigate = useNavigate();
  const onChangeSearchName: React.ChangeEventHandler<HTMLInputElement> = (e) => setDateSpotName(e.target.value);

  const search = {
    dateSpotName: dateSpotName,
  }

  const onClickSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    client.post('date_spot_name_search', search).then(response => {
      navigate('/dateSpots/search', {state: {addressAndDateSpots: response.data.addressAndDateSpots, dateSpotSearchName: dateSpotName}})
    });
  };

  return(
    <>
      <div className='p-3'>
        <Input onChange={onChangeSearchName} type='text' value={dateSpotName} />
      </div>
      <div className='m-auto my-5 w-1/3'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </>
  );
});