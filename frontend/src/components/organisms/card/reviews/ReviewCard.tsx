import { StarRateText } from 'components/atoms/layouts/StarRateText';
import { UserImage } from 'components/atoms/layouts/users/UserImage';
import { memo, VFC } from 'react';
import { DateSpotReviewAndUserResponseData } from 'types/dateSpotReviews/response';

type Props = {
  dateSpotReview: DateSpotReviewAndUserResponseData
};

export const ReviewCard: VFC<Props> = memo((props) => {
  const { dateSpotReview } = props;

  return(
    <div className='my-5 p-2 flex border-b-2' key={dateSpotReview.id}>
      <UserImage image={dateSpotReview.userImage} userId={dateSpotReview.userId} gender={dateSpotReview.userGender} addClassName='h-32 w-32' />
      <div className='px-5'>
        <div>{dateSpotReview.userName}</div>
        <StarRateText rate={dateSpotReview.rate} size={20} />
        <div className='p-1 max-h-20 overflow-y-scroll w-full h-full whitespace-pre-line'>{dateSpotReview.content}</div>
      </div>
    </div>

  );
});