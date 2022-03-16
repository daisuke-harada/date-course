import { memo, VFC, useState, useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

import { client } from "lib/api/client";
import { currentUserState } from "store/session";
import { BaseButton } from "components/atoms/button/BaseButton";
import { UserImage } from "components/atoms/layouts/users/UserImage";
import { DateSpotReviewAndUserResponseData } from "types/dateSpotReviews/response";
import { DangerButton } from "components/atoms/button/DangerButton";
import { SecondaryButton } from "components/atoms/button/SecondaryButton";
import { StarRateForm } from "components/atoms/form/StarRateForm";
import { StarRateText } from "components/atoms/layouts/StarRateText";

const Div = tw.div`w-full flex`
const TextArea = tw.textarea`border-2 p-1 w-full h-full rounded-xl`
const UserInfoDiv = tw.div`w-2/3 h-52 pt-5 px-2 flex flex-col`
const ButtonParentDiv = tw.div`mx-2`
const ButtonArea = tw.div`ml-auto pt-2 flex`

type DateSpotRreviewParam = {
  rate: number,
  content: string,
  userId: number,
  dateSpotId: number,
};

type Props= {
  dateSpotId: number,
  dateSpotReviews: Array<DateSpotReviewAndUserResponseData>,
  setDateSpotReviews: React.Dispatch<React.SetStateAction<never[]>>,
  setDateSpotAverageRate: React.Dispatch<React.SetStateAction<number>>
};

export const DateSpotReviewForm: VFC<Props> = memo((props) => {
  const { dateSpotId, dateSpotReviews, setDateSpotReviews, setDateSpotAverageRate } = props;
  const getCurrentUser = useRecoilValue(currentUserState);
  const [content, setContent] = useState<string>('');
  const [rate, setRate] = useState<number>(0);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [errorUserIdMessages, setErrorUserIdMessages] = useState([]);
  const [errorContentMessages, setErrorContentMessages] = useState([]);
  const [currentDateSpotReview, setCurrentDateSpotReview] = useState<DateSpotReviewAndUserResponseData | undefined>();
  const onChangeContent: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => setContent(e.target.value), []);
  const onChangeRate: (new_rating: number) => void = useCallback((new_rating) => setRate(new_rating), []);
  const onChangeOpen: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    setEditOpen(!editOpen);
    currentDateSpotReview && setContent(currentDateSpotReview.content);
    currentDateSpotReview && setRate(currentDateSpotReview.rate);
  }, [editOpen, currentDateSpotReview]);
  const navigate = useNavigate();

  const onClickDateSpotReviewCreateAction: React.MouseEventHandler<HTMLButtonElement>  = () => {
    client.post('date_spot_reviews', dateSpotReview).then(response => {
      response.data.status === 'created' && setDateSpotReviews(response.data.dateSpotReviews);
      response.data.status === 'created' && setContent('');
      response.data.status === 'created' && setRate(0);
      response.data.status === 'created' && setDateSpotAverageRate(response.data.reviewAverageRate);
      response.data.status === 'created' && setErrorUserIdMessages([]);
      response.data.status === 'created' && setErrorContentMessages([]);
      response.data.status === 'created' && navigate(`./`, {state: {message: 'コメントを投稿しました', type: 'success-message', condition: true}});

      if(response.data.status === 500){
        const {userId, content} = response.data.errorMessages;
        userId !== undefined && setErrorUserIdMessages(userId);
        content !== undefined && setErrorContentMessages(content);
        navigate(`./`, {state: {message: '登録に失敗しました。', type: 'error-message', condition: true}});
      };
    });
  };

  const onClickDateSpotReviewUpdateAction: React.MouseEventHandler<HTMLButtonElement>  = () => {
    currentDateSpotReview
    &&
    client.put(`date_spot_reviews/${currentDateSpotReview.id}`, dateSpotReview).then(response => {
      response.data.status === 'updated' && setDateSpotReviews(response.data.dateSpotReviews);
      response.data.status === 'updated' && setContent('');
      response.data.status === 'updated' && setRate(0);
      response.data.status === 'updated' && setDateSpotAverageRate(response.data.reviewAverageRate);
      response.data.status === 'updated' &&setErrorUserIdMessages([]);
      response.data.status === 'updated' &&setErrorContentMessages([]);
      response.data.status === 'updated' && navigate(`./`, {state: {message: 'コメントを更新しました', type: 'success-message', condition: true}});
      response.data.status === 'updated' && setEditOpen(false);
      if(response.data.status === 500){
        const {userId, content} = response.data.errorMessages;
        userId !== undefined && setErrorUserIdMessages(userId);
        content !== undefined && setErrorContentMessages(content);
        navigate(`./`, {state: {message: '登録に失敗しました。', type: 'error-message', condition: true}});
      };
    });
  };


  const onClickDateSpotReviewDeleteAction: React.MouseEventHandler<HTMLButtonElement> = () => {
    currentDateSpotReview
    &&
    client.delete(`date_spot_reviews/${currentDateSpotReview.id}`).then(response => {
      response.data.status === 'deleted' && setDateSpotReviews(response.data.dateSpotReviews);
      response.data.status === 'deleted' && navigate(`./`, {state: {message: 'コメントを削除しました', type: 'success-message', condition: true}});
      response.data.status === 'deleted' && setContent('');
      response.data.status === 'deleted' && setRate(0);
      response.data.status === 'deleted' && setDateSpotAverageRate(response.data.reviewAverageRate);
      response.data.status === 'deleted' &&setErrorUserIdMessages([]);
      response.data.status === 'deleted' &&setErrorContentMessages([]);
      response.data.status === 'deleted' && setCurrentDateSpotReview(undefined);
      response.data.status === 'deleted' && setEditOpen(false);
    });
  };

  const dateSpotReview: DateSpotRreviewParam = {
    rate: rate,
    content: content,
    userId: getCurrentUser.user.id,
    dateSpotId: dateSpotId,
  };

  useEffect(()=> {
    if(dateSpotReviews.map(dateSpotReview => dateSpotReview.userId).includes(getCurrentUser.user.id)){
      setCurrentDateSpotReview(dateSpotReviews.find(dateSpotReview => dateSpotReview.userId === getCurrentUser.user.id));
    };
  }, [dateSpotReviews, getCurrentUser]);

  if(currentDateSpotReview){
    return(
      <Div>
        <UserImage userId={getCurrentUser.user.id} image={getCurrentUser.user.image} gender={getCurrentUser.user.gender} addClassName='h-40 w-40' />
        {/* 星による評価 */}
        <UserInfoDiv>
          <div>{getCurrentUser.user.name}</div>
            {
              editOpen?
              (
                <>
                  <StarRateForm rate={rate} size={30} onChangeRate={onChangeRate} edit={true} />
                  <ul className="mt-1">
                    {errorUserIdMessages !== [] && errorUserIdMessages.map((message)=><li className="text-red-500">{message}</li>)}
                  </ul>
                  <ul>
                    {errorContentMessages !== [] && errorContentMessages.map((message)=><li className="text-red-500">コメントは{message}</li>)}
                  </ul>
                  <TextArea placeholder='コメントを入力' value={content} onChange={onChangeContent} />
                  <ButtonArea>
                    <ButtonParentDiv>
                      <BaseButton onClickEvent={onChangeOpen}>編集を解除</BaseButton>
                    </ButtonParentDiv>
                    <ButtonParentDiv>
                      <SecondaryButton onClickEvent={onClickDateSpotReviewUpdateAction}>更新</SecondaryButton>
                    </ButtonParentDiv>
                    <ButtonParentDiv>
                      <DangerButton onClickEvent={onClickDateSpotReviewDeleteAction}>削除</DangerButton>
                    </ButtonParentDiv>
                  </ButtonArea>
                </>
              ):(
                <>
                  <StarRateText size={30} rate={currentDateSpotReview.rate} />
                  <div className='p-1 max-h-20 overflow-y-scroll w-full h-full whitespace-pre-line'>{currentDateSpotReview.content}</div>
                  <div className='ml-auto pt-2 flex'>
                    <ButtonParentDiv>
                      <BaseButton onClickEvent={onChangeOpen}>編集</BaseButton>
                    </ButtonParentDiv>
                  </div>
                </>
              )
            }
        </UserInfoDiv>
      </Div>
    );
  }else{
    return(
      <Div>
        <UserImage userId={getCurrentUser.user.id} image={getCurrentUser.user.image} gender={getCurrentUser.user.gender} addClassName='h-40 w-40' />
        {/* 星による評価 */}
        <UserInfoDiv>
          <div>{getCurrentUser.user.name}</div>
          <StarRateForm rate={rate} size={30} onChangeRate={onChangeRate} edit={true} />
          <ul className="mt-1">
            {errorUserIdMessages !== [] && errorUserIdMessages.map((message)=><li className="text-red-500">{message}</li>)}
          </ul>
          <ul>
            {errorContentMessages !== [] && errorContentMessages.map((message)=><li className="text-red-500">コメントは{message}</li>)}
          </ul>
          <TextArea placeholder='コメントを入力' value={content} onChange={onChangeContent} />
          <div className='ml-auto pt-2'>
            <BaseButton onClickEvent={onClickDateSpotReviewCreateAction}>投稿</BaseButton>
          </div>
        </UserInfoDiv>
      </Div>
    );
  };
});