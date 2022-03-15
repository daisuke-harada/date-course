import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";

import { currentUserState } from "store/session";
import { UserImage } from "components/atoms/layouts/UserImage";
import { DateSpotReviewAndUserResponseData } from "types/dateSpotReviews/response";
import { DateSpotReviewForm } from "components/molecules/dateSpotReview/DateSpotReviewForm";

type Props = {
  dateSpotId: number,
  dateSpotReviews: Array<DateSpotReviewAndUserResponseData>,
  setDateSpotReviews: React.Dispatch<React.SetStateAction<never[]>>
};

export const DateSpotReviewArea: VFC<Props> = memo((props) => {
  const { dateSpotId, dateSpotReviews, setDateSpotReviews } = props;
  const getCurrentUser = useRecoilValue(currentUserState);

  return(
    <>
      <DateSpotReviewForm dateSpotId={dateSpotId} dateSpotReviews={dateSpotReviews} setDateSpotReviews={setDateSpotReviews} />
      <ul className='w-full my-2'>
      {
        dateSpotReviews !== []
        &&
        dateSpotReviews.map((dateSpotReview: DateSpotReviewAndUserResponseData) => {
          if(dateSpotReview.userId !== getCurrentUser.user.id){
            return (
              <li className='my-5 p-2 flex' key={dateSpotReview.id}>
                <UserImage image={dateSpotReview.image} userId={dateSpotReview.userId} gender={dateSpotReview.userGender} addClassName='h-32 w-32' />
                <div className='p-5'>
                  <div>{dateSpotReview.userName}</div>
                  <div className='flex my-1'>
                    <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
                    <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
                    <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
                    <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
                    <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
                  </div>
                  <div>
                    {dateSpotReview.content}
                  </div>
                </div>
              </li>
            );
          }else {
            return(<div key={dateSpotReview.id}></div>);
          };
        })
      }
      </ul>
    </>
  );
});