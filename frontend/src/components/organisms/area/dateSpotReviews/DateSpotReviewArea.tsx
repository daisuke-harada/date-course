import { memo, FC } from 'react';
import { useSelector } from 'react-redux';

import { DateSpotReviewAndUserResponseData } from 'types/dateSpotReviews/response';
import { DateSpotReviewForm } from 'components/molecules/form/dateSpotReview/DateSpotReviewForm';
import { ReviewCard } from 'components/organisms/card/reviews/ReviewCard';
import { UserImage } from 'components/atoms/imageLayouts/users/UserImage';
import { Link } from 'react-router-dom';
import { RootState } from 'reducers';
import { User } from 'types/users/session';

type Props = {
  dateSpotId: number,
  dateSpotReviews: DateSpotReviewAndUserResponseData[],
  setDateSpotReviews: React.Dispatch<React.SetStateAction<never[]>>,
  setDateSpotAverageRate: React.Dispatch<React.SetStateAction<number>>
};

export const DateSpotReviewArea: FC<Props> = memo((props) => {
  const { dateSpotId, dateSpotReviews, setDateSpotReviews, setDateSpotAverageRate } = props;
  const getCurrentUser = useSelector<RootState, User>(state => state.session.currentUser);
  const getLoginStatus = useSelector<RootState, boolean>(state => state.session.loginStatus);

  return(
    <>
      {
        getLoginStatus
        &&
        <DateSpotReviewForm
          dateSpotId={dateSpotId}
          dateSpotReviews={dateSpotReviews}
          setDateSpotReviews={setDateSpotReviews}
          setDateSpotAverageRate={setDateSpotAverageRate}
        />
      }
      <div className='sm:text-2xl lg:text-4xl text-center font-bold my-5'>
        レビュー
      </div>
      <div className='w-full my-2 overflow-y-scroll h-96 border-2 border-red-300 rounded-xl p-1'>
      {
        dateSpotReviews.length === 0?
        <h1 className='text-red-400 my-5 text-3xl'>このデートスポットにはレビューが投稿されていません</h1>
        :
        dateSpotReviews.map((dateSpotReview: DateSpotReviewAndUserResponseData) => {
          if(dateSpotReview.userId !== getCurrentUser.id){
            return (
              <ReviewCard
                key={dateSpotReview.id}
                ImageDiv={
                  <UserImage
                    image={dateSpotReview.userImage}
                    userId={dateSpotReview.userId}
                    gender={dateSpotReview.userGender}
                    addClassName='lg:w-48 lg:h-48 sm:w-32 sm:h-32 w-20 h-20'
                  />
                }
                name={<Link to={`/users/${dateSpotReview.userId}`}>{dateSpotReview.userName}</Link>}
                rate={dateSpotReview.rate}
                content={dateSpotReview.content}
              />
            );
          }else {
            return(<div key={dateSpotReview.id}></div>);
          };
        })
      }
      </div>
    </>
  );
});