import { BaseButton } from "components/atoms/button/BaseButton";
import { UserImage } from "components/atoms/layouts/UserImage";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "store/session";
import tw from "tailwind-styled-components";

const Div = tw.div`w-full flex`
const TextArea = tw.textarea`border-2 rounded-xl p-1 w-3/4 h-full`


type Props = {
  dateSpotId: number
};

export const DateSpotReviewArea: VFC<Props> = memo((props) => {
  const { dateSpotId } = props;
  const getCurrentUser = useRecoilValue(currentUserState);
  const [content, setContent] = useState<string>('');
  const onChangeContent: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => setContent(e.target.value), []);

  return(
    <Div>
      <UserImage user={getCurrentUser.user} addClassName='h-40 w-40' />
      {/* 星による評価 */}
      <div className="w-2/3 h-40 pt-5 px-5 flex flex-col">
        <div>{getCurrentUser.user.name}</div>
        <div className='flex my-2'>
          <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
          <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
          <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
          <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
          <img src={`${process.env.PUBLIC_URL}/dateSpotReviewImages/star-on.png`} alt='star' />
        </div>
        <div className='flex w-full'>
          <TextArea placeholder='コメントを入力' value={content} onChange={onChangeContent} />
          <div className='text-center mt-4 w-1/4 pt-2 px-1'>
            <BaseButton>投稿</BaseButton>
          </div>
        </div>
      </div>
    </Div>
  );
});