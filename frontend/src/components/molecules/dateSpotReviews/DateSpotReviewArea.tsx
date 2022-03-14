import { memo, useCallback, useState, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";

import { BaseButton } from "components/atoms/button/BaseButton";
import { UserImage } from "components/atoms/layouts/UserImage";
import { client } from "lib/api/client";
import { currentUserState } from "store/session";
import { DateSpotReviewAndUserResponseData } from "types/dateSpotReviews/response";

const Div = tw.div`w-full flex`
const TextArea = tw.textarea`border-2 p-1 w-full h-full`
const UserInfoDiv = tw.div`w-2/3 h-52 pt-5 px-2 flex flex-col`

type Props = {
  dateSpotId: number,
  dateSpotReviews: never[],
  setDateSpotReviews: React.Dispatch<React.SetStateAction<never[]>>
};

type DateSpotRreviewParam = {
  rate: number,
  content: string,
  userId: number,
  dateSpotId: number,
};

export const DateSpotReviewArea: VFC<Props> = memo((props) => {
  const { dateSpotId, dateSpotReviews, setDateSpotReviews } = props;
  const getCurrentUser = useRecoilValue(currentUserState);
  const [content, setContent] = useState<string>('');
  const onChangeContent: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => setContent(e.target.value), []);
  const [errorUserIdMessages, setErrorUserIdMessages] = useState([]);
  const [errorContentMessages, setErrorContentMessages] = useState([]);
  const navigate = useNavigate();

  const dateSpotReview: DateSpotRreviewParam = {
    rate: 0, // まだ実装しない
    content: content,
    userId: getCurrentUser.user.id,
    dateSpotId: dateSpotId,
  };

  const onClickDateSpotCreateAction: React.MouseEventHandler<HTMLButtonElement>  = () => {
    client.post('date_spot_reviews', dateSpotReview).then(response => {
      response.data.status === 'created' && setDateSpotReviews(response.data.dateSpotReviews);
      response.data.status === 'created' && setContent('');
      response.data.status === 'created' && navigate(`./`, {state: {message: 'コメントを投稿しました', type: 'success-message', condition: true}});

      if(response.data.status === 500){
        const {userId, content} = response.data.errorMessages;
        userId !== undefined && setErrorUserIdMessages(userId);
        content !== undefined && setErrorContentMessages(content);
        navigate(`./`, {state: {message: '登録に失敗しました。', type: 'error-message', condition: true}});
      };
    });
  };

  return(
    <>
      <Div>
        <UserImage userId={getCurrentUser.user.id} image={getCurrentUser.user.image} gender={getCurrentUser.user.gender} addClassName='h-40 w-40' />
        {/* 星による評価 */}
        <UserInfoDiv>
          <div>{getCurrentUser.user.name}</div>
          <div className='flex my-2'>
            <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
            <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
            <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
            <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
            <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
          </div>
            <ul className="mt-1">
            {errorUserIdMessages !== [] && errorUserIdMessages.map((message)=><li className="text-red-500">{message}</li>)}
          </ul>
          <ul>
            {errorContentMessages !== [] && errorContentMessages.map((message)=><li className="text-red-500">コメントは{message}</li>)}
          </ul>

          <TextArea placeholder='コメントを入力' value={content} onChange={onChangeContent} />
          <div className='ml-auto pt-2'>
            <BaseButton onClickEvent={onClickDateSpotCreateAction}>投稿</BaseButton>
          </div>
        </UserInfoDiv>
      </Div>
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
            return(<></>);
          };
        })
      }
      </ul>
    </>
  );
});