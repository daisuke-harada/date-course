import { memo, VFC } from 'react';
import ReactStars from 'react-stars'

type Props = {
  rate: number,
  size: number,
};

export const StarRateText: VFC<Props> = memo((props) => {
  const { rate, size } = props;
  return(
    // colorr1は選択されていない時の星の色。color2は選択されている時の星の色
    <div className='my-2'>
      <ReactStars
        count={5}
        value={rate}
        size={size}
        half={true}
        edit={false}
        color1={'#e5e7eb'}
        color2={'#F472B6'}
      />
    </div>
  );
});