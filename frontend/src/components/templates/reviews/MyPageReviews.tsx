import { memo, VFC } from 'react';

import { ReviewCard } from 'components/organisms/card/reviews/ReviewCard';
import { DateSpotReviewAndUserResponseData } from 'types/dateSpotReviews/response';

type Props = {
  reviews: Array<DateSpotReviewAndUserResponseData>
};

export const Reviews: VFC<Props> = memo((props) => {
  const { reviews } = props;
  return(
    <>
      <>
      {
        reviews.length !== 0?
        (
          <div className='sm:justify-start justify-center flex flex-wrap px-2'>
            {reviews.map((review, index) => (<ReviewCard key={index} dateSpotReview={review} />))}
          </div>
        )
        :
        (
          <div className='my-5 text-center text-red-400 text-xl'>
            レビューは存在しません
          </div>
        )
      }
    </>
    </>
  );
});