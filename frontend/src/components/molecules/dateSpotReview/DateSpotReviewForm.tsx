import { memo, VFC, useState, useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

import { client } from "lib/api/client";
import { currentUserState } from "store/session";
import { BaseButton } from "components/atoms/button/BaseButton";
import { UserImage } from "components/atoms/layouts/UserImage";
import { DateSpotReviewAndUserResponseData } from "types/dateSpotReviews/response";
import { DangerButton } from "components/atoms/button/DangerButton";
import { SecondaryButton } from "components/atoms/button/SecondaryButton";

const Div = tw.div`w-full flex`
const TextArea = tw.textarea`border-2 p-1 w-full h-full rounded-xl`
const UserInfoDiv = tw.div`w-2/3 h-52 pt-5 px-2 flex flex-col`
const ButtonParentDiv = tw.div`mx-2`

type DateSpotRreviewParam = {
  rate: number,
  content: string,
  userId: number,
  dateSpotId: number,
};

type Props= {
  dateSpotId: number,
  dateSpotReviews: Array<DateSpotReviewAndUserResponseData>,
  setDateSpotReviews: React.Dispatch<React.SetStateAction<never[]>>
};

export const DateSpotReviewForm: VFC<Props> = memo((props) => {
  const { dateSpotId, dateSpotReviews, setDateSpotReviews } = props;
  const getCurrentUser = useRecoilValue(currentUserState);
  const [content, setContent] = useState<string>('');
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [errorUserIdMessages, setErrorUserIdMessages] = useState([]);
  const [errorContentMessages, setErrorContentMessages] = useState([]);
  const [currentDateSpotReview, setCurrentDateSpotReview] = useState<DateSpotReviewAndUserResponseData | undefined>();
  const onChangeContent: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => setContent(e.target.value), []);
  const onChangeOpen: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    setEditOpen(!editOpen);
    currentDateSpotReview && setContent(currentDateSpotReview.content);
  }, [editOpen, currentDateSpotReview]);
  const navigate = useNavigate();

  const onClickDateSpotReviewCreateAction: React.MouseEventHandler<HTMLButtonElement>  = () => {
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

  const onClickDateSpotReviewUpdateAction: React.MouseEventHandler<HTMLButtonElement>  = () => {
    currentDateSpotReview
    &&
    client.put(`date_spot_reviews/${currentDateSpotReview.id}`, dateSpotReview).then(response => {
      response.data.status === 'updated' && setDateSpotReviews(response.data.dateSpotReviews);
      response.data.status === 'updated' && setContent('');
      response.data.status === 'updated' && navigate(`./`, {state: {message: 'コメントを更新しました', type: 'success-message', condition: true}});
      response.data.status === 'updated' && setEditOpen(false);
    });
  };


  const onClickDateSpotReviewDeleteAction: React.MouseEventHandler<HTMLButtonElement> = () => {
    currentDateSpotReview
    &&
    client.delete(`date_spot_reviews/${currentDateSpotReview.id}`).then(response => {
      response.data.status === 'deleted' && setDateSpotReviews(response.data.dateSpotReviews);
      response.data.status === 'deleted' && navigate(`./`, {state: {message: 'コメントを削除しました', type: 'success-message', condition: true}});
      response.data.status === 'deleted' && setContent('');
      response.data.status === 'deleted' && setCurrentDateSpotReview(undefined);
      response.data.status === 'deleted' && setEditOpen(false);
    });
  };

  const dateSpotReview: DateSpotRreviewParam = {
    rate: 0, // まだ実装しない
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
          <div className='flex my-2'>
            <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
            <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
            <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
            <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
            <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
          </div>
            {
              editOpen?
              (
                <>
                  <TextArea placeholder='コメントを入力' value={content} onChange={onChangeContent} />
                  <div className='ml-auto pt-2 flex'>
                    <ButtonParentDiv>
                      <BaseButton onClickEvent={onChangeOpen}>編集を解除</BaseButton>
                    </ButtonParentDiv>
                    <ButtonParentDiv>
                      <SecondaryButton onClickEvent={onClickDateSpotReviewUpdateAction}>更新</SecondaryButton>
                    </ButtonParentDiv>
                    <ButtonParentDiv>
                      <DangerButton onClickEvent={onClickDateSpotReviewDeleteAction}>削除</DangerButton>
                    </ButtonParentDiv>
                  </div>
                </>
              ):(
                <>
                  <div className=' p-1 w-full h-full'>{currentDateSpotReview.content}</div>
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
            <BaseButton onClickEvent={onClickDateSpotReviewCreateAction}>投稿</BaseButton>
          </div>
        </UserInfoDiv>
      </Div>
    );
  };
});