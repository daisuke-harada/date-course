import { StarRateText } from 'components/atoms/layouts/StarRateText';
import { memo, ReactNode, VFC } from 'react';

type Props = {
  ImageDiv: ReactNode,
  name: string,
  rate: number,
  content: string
};

export const ReviewCard: VFC<Props> = memo((props) => {
  const {ImageDiv, name, rate, content } = props;

  return(
    <div className='my-2 p-2 flex border-b-2'>
      {ImageDiv}
      <div className='px-5'>
        <div className='text-xs font-bold'>{name}</div>
        <StarRateText rate={rate} size={15} />
        <div className='p-1 max-h-20 overflow-y-scroll w-full h-full whitespace-pre-line'>
          {content}
        </div>
      </div>
    </div>

  );
});