import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";

import { currentUserState, loginStatusState } from "store/session";
import { UserImage } from "components/atoms/layouts/users/UserImage";
import { DateSpotReviewAndUserResponseData } from "types/dateSpotReviews/response";
import { DateSpotReviewForm } from "components/molecules/form/dateSpotReview/DateSpotReviewForm";
import { StarRateText } from "components/atoms/layouts/StarRateText";

type Props = {
  dateSpotId: number,
  dateSpotReviews: Array<DateSpotReviewAndUserResponseData>,
  setDateSpotReviews: React.Dispatch<React.SetStateAction<never[]>>,
  setDateSpotAverageRate: React.Dispatch<React.SetStateAction<number>>
};

export const DateSpotReviewArea: VFC<Props> = memo((props) => {
  const { dateSpotId, dateSpotReviews, setDateSpotReviews, setDateSpotAverageRate } = props;
  const getCurrentUser = useRecoilValue(currentUserState);
  const getLoginStatus = useRecoilValue(loginStatusState);

  return(
    <>
      {
        getLoginStatus.status === true
        &&
        <DateSpotReviewForm
          dateSpotId={dateSpotId}
          dateSpotReviews={dateSpotReviews}
          setDateSpotReviews={setDateSpotReviews}
          setDateSpotAverageRate={setDateSpotAverageRate}
        />}
      <div className='text-center font-bold'>
        コメント一覧
      </div>
      <ul className='w-full my-2 overflow-y-scroll h-96 border-2 border-red-300 rounded-xl p-1'>
      {
        dateSpotReviews.length === 0?
        <h1 className='text-red-400 my-5 text-3xl'>このデートスポットにはレビューが投稿されていません</h1>
        :
        dateSpotReviews.map((dateSpotReview: DateSpotReviewAndUserResponseData) => {
          if(dateSpotReview.userId !== getCurrentUser.user.id){
            return (
              <li className='my-5 p-2 flex' key={dateSpotReview.id}>
                <UserImage image={dateSpotReview.userImage} userId={dateSpotReview.userId} gender={dateSpotReview.userGender} addClassName='h-32 w-32' />
                <div className='px-5'>
                  <div>{dateSpotReview.userName}</div>
                  <StarRateText rate={dateSpotReview.rate} size={20} />
                  <div className='p-1 max-h-20 overflow-y-scroll w-full h-full whitespace-pre-line'>{dateSpotReview.content}</div>
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