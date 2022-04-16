import { memo, VFC } from 'react';
import ReactStars from 'react-stars'

type Props = {
  rate: number,
  size: number,
  onChangeRate?: (new_rating: number) => void,
  edit?: boolean,
};

export const StarRateForm: VFC<Props> = memo((props) => {
  const { rate, onChangeRate, edit, size } = props;
  return(
    <div className='my-2'>
      <ReactStars
        count={5}
        value={rate}
        size={size}
        half={true}
        edit={edit}
        onChange={onChangeRate}
        color1={'#e5e7eb'}
        color2={'#F472B6'}
      />
    </div>
  );
});