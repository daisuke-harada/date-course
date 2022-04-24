import { StarRateText } from 'components/atoms/text/StarRateText';
import { memo, ReactNode, VFC } from 'react';

type Props = {
  ImageDiv: ReactNode,
  name: ReactNode,
  rate: number,
  content: string
};

export const ReviewCard: VFC<Props> = memo((props) => {
  const {ImageDiv, name, rate, content } = props;

  return(
    <div className='my-2 p-2 flex border-b-2'>
      {ImageDiv}
      <div className='px-2'>
        <div className='text-xs font-bold'>{name}</div>
        <StarRateText rate={rate} size={20} />
        <div className='sm:w-96 w-40 p-1 max-h-20  h-full overflow-y-scroll whitespace-pre-line break-words'>
          {content}
        </div>
      </div>
    </div>

  );
});